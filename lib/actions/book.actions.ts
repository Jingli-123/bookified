"use server";

import { CreateBook, TextSegment } from "@/types";
import { connectToDatabase } from "@/database/mongoose";
import { escapeRegex, generateSlug, serializeData } from "@/lib/utils";
import Book from "@/database/models/book.model";
import BookSegment from "@/database/models/book-segment.model";
import mongoose from "mongoose";
import { getErrorMessage } from "../utils";
import { auth } from "@clerk/nextjs/server";
import { getUserPlan } from "@/lib/subscription.server";
import { success } from "zod";
const { PLAN_LIMITS } = await import("@/lib/subscription-constants");

export const getAllBooks = async (userId: string, search?: string) => {
  try {
    console.log("getAllBooks query:", { clerkId: userId });
    if (!userId) {
      return {
        success: false,
      };
    }
    await connectToDatabase();

    let query = {};

    if (search) {
      const escapedSearch = escapeRegex(search);
      const regex = new RegExp(escapedSearch, "i");
      query = {
        clerkId: userId,
        $or: [{ title: { $regex: regex } }, { author: { $regex: regex } }],
      };
    } else {
      query = {
        clerkId: userId,
      };
    }

    const books = await Book.find(query).sort({ createdAt: -1 }).lean();

    return {
      success: true,
      data: serializeData(books),
    };
  } catch (e) {
    console.error("Error connecting to database", e);
    return {
      success: false,
      error: getErrorMessage(e, "Something went wrong"),
    };
  }
};

export const checkBookExists = async (title: string, userId?: string) => {
  try {
    await connectToDatabase();

    const slug = generateSlug(title);
    if (userId) {
      const existingBook = await Book.findOne({ slug, clerkId: userId }).lean();

      if (existingBook) {
        return {
          exists: true,
          book: serializeData(existingBook),
        };
      }
    }

    return {
      exists: false,
    };
  } catch (e) {
    console.error("Error checking book exists");
    return {
      exists: false,
      error: getErrorMessage(e, "Something went wrong"),
    };
  }
};

export const getBookDetails = async (userId: string, bookId: string) => {
  if (!userId) return;
  await connectToDatabase();
  try {
    const data = await Book.findOne({ clerkId: userId, _id: bookId });
    console.log("action", data)
    if (data.title) {
      return {
        success: true,
        book: data.title,
      };
    } else {
      return {
        success: false,
        book: "Book not found.",
      };
    }
  } catch (e) {
    return {
      success: false,
      error: e,
      book: "Book not found.",
    };
  }
};

export const deleteBook = async (userId: string, bookTitle: string) => {
  console.log("deleteBook", bookTitle);
  const data = await checkBookExists(bookTitle, userId);
  if (data.book) {
    const id = serializeData(data).book._id;
    try {
      if (!userId) return;
      await connectToDatabase();
      const res = await Book.deleteOne({ clerkId: userId, title: bookTitle });
      const result = await BookSegment.deleteMany({
        clerkId: userId,
        bookId: Object(id),
      });
      console.log("Deleted", res);
      return {
        success: true,
        error: `You have been deleted book successfully.`,
        isDeleted: true,
      };
    } catch (e) {
      return {
        success: false,
        error: `The book deleted unsuccessfully.`,
        isDeleted: false,
      };
    }
  } else {
    return {
      success: false,
      error: `Not book found.`,
    };
  }

  // return {
  //   data: id,
  // };
};

export const createBook = async (data: CreateBook, userId: string) => {
  try {
    await connectToDatabase();

    const slug = generateSlug(data.title);

    const existingBook = await checkBookExists(data.title, userId);

    if (existingBook.exists) {
      return {
        success: true,
        data: { ...serializeData(existingBook), slug },
        alreadyExists: true,
      };
    }

    // Todo: Check subscription limits before creating a book

    if (!userId || userId !== data.clerkId) {
      return { success: false, error: "Unauthorized" };
    }

    // const plan = await getUserPlan();
    // const limits = PLAN_LIMITS[plan];

    const bookCount = await Book.countDocuments({ clerkId: userId });

    if (bookCount >= 2) {
      const { revalidatePath } = await import("next/cache");
      revalidatePath("/");

      return {
        success: false,
        error: `You have reached the maximum number of books. Please wait for the new version release.`,
        isBillingError: true,
      };
    }

    // if (bookCount >= limits.maxBooks) {
    //   const { revalidatePath } = await import("next/cache");
    //   revalidatePath("/");

    //   return {
    //     success: false,
    //     error: `You have reached the maximum number of books allowed for your ${plan} plan (${limits.maxBooks}). Please upgrade to add more books.`,
    //     isBillingError: true,
    //   };
    // }

    const book = await Book.create({
      ...data,
      clerkId: userId,
      slug,
      totalSegments: 0,
    });

    return {
      success: true,
      data: serializeData(book),
    };
  } catch (e) {
    console.error("Error creating a book");

    return {
      success: false,
      error: getErrorMessage(e, "Something went wrong"),
    };
  }
};

export const createEmbeddding = async (clerkId: string, bookId: string) => {
  if (!clerkId) return;
  const url = `${process.env.NEXT_PUBLIC_BASE_EMB_URL}/booksegments/embedding/${bookId}`;
  const { getToken } = await auth();

  try {
    const token = await getToken();
    console.log("token", token);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        clerkId: clerkId,
      }),
    });
    console.log("createEmbeddding", res);
    const data = await res.json();
    return {
      success: true,
      data,
    };
  } catch (e) {
    console.error("Error creating a book");

    return {
      success: false,
      error: getErrorMessage(e, "Something went wrong"),
    };
  }
};

export const getBookBySlug = async (slug: string, userId: string) => {
  try {
    await connectToDatabase();

    const book = await Book.findOne({ slug, clerkId: userId }).lean();

    if (!book) {
      return { success: false, error: "Book not found" };
    }

    return {
      success: true,
      data: serializeData(book),
    };
  } catch (e) {
    console.error("Error fetching book by slug", e);
    return {
      success: false,
      error: getErrorMessage(e, "Something went wrong"),
    };
  }
};

export const getBookByBookId = async (bookId: string, userId: string) => {
  try {
    await connectToDatabase();

    const book = await Book.findOne({ _id: bookId, clerkId: userId }).lean();

    if (!book) {
      return { success: false, error: "Book not found" };
    }

    return {
      success: true,
      data: serializeData(book),
    };
  } catch (e) {
    console.error("Error fetching book by slug", e);
    return {
      success: false,
      error: getErrorMessage(e, "Something went wrong"),
    };
  }
};

export const saveBookSegments = async (
  bookId: string,
  clerkId: string,
  segments: TextSegment[],
) => {
  try {
    await connectToDatabase();

    const segmentsToInsert = segments.map(
      ({ text, segmentIndex, pageNumber, wordCount }) => ({
        clerkId,
        bookId,
        content: text,
        segmentIndex,
        pageNumber,
        wordCount,
      }),
    );

    await BookSegment.insertMany(segmentsToInsert);

    await Book.findByIdAndUpdate(bookId, { totalSegments: segments.length });

    console.log("Book segments saved successfully.");

    return {
      success: true,
      data: { segmentsCreated: segments.length },
    };
  } catch (e) {
    console.error("Error saving book segments", e);
    await BookSegment.deleteMany({ bookId });
    await Book.findByIdAndDelete(bookId);
    console.log(
      "Deleted book segments and book due to failure to save segments.",
    );
    return {
      success: false,
      error: getErrorMessage(e, "Something went wrong"),
    };
  }
};

// Searches book segments using MongoDB text search with regex fallback
export const searchBookSegments = async (
  bookId: string,
  query: string,
  limit: number = 5,
) => {
  try {
    await connectToDatabase();

    console.log(`Searching for: "${query}" in book ${bookId}`);

    const bookObjectId = new mongoose.Types.ObjectId(bookId);

    // Try MongoDB text search first (requires text index)
    let segments: Record<string, unknown>[] = [];
    try {
      segments = await BookSegment.find({
        bookId: bookObjectId,
        $text: { $search: query },
      })
        .select("_id bookId content segmentIndex pageNumber wordCount")
        .sort({ score: { $meta: "textScore" } })
        .limit(limit)
        .lean();
    } catch {
      // Text index may not exist — fall through to regex fallback
      segments = [];
    }

    // Fallback: regex search matching ANY keyword
    if (segments.length === 0) {
      const keywords = query.split(/\s+/).filter((k) => k.length > 2);
      const pattern = keywords.map(escapeRegex).join("|");

      segments = await BookSegment.find({
        bookId: bookObjectId,
        content: { $regex: pattern, $options: "i" },
      })
        .select("_id bookId content segmentIndex pageNumber wordCount")
        .sort({ segmentIndex: 1 })
        .limit(limit)
        .lean();
    }

    console.log(`Search complete. Found ${segments.length} results`);

    return {
      success: true,
      data: serializeData(segments),
    };
  } catch (error) {
    console.error("Error searching segments:", error);
    return {
      success: false,
      error: (error as Error).message,
      data: [],
    };
  }
};

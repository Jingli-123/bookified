// "use client";

// import { useCallback, useState } from "react";
// import { connectToDatabase } from "@/database/mongoose";
// import {
//   escapeRegex,
//   generateSlug,
//   serializeData,
//   getErrorMessage,
// } from "@/lib/utils";
// import Book from "@/database/models/book.model";
// // import BookSegment from "@/database/models/book-segment.model";
// // import mongoose from "mongoose";
// // import { auth } from "@clerk/nextjs/server";
// // import { getUserPlan } from "@/lib/subscription.server";
// // import { success } from "zod";

// export default function useBooks() {
//   const [books, setBooks] = useState();
//   const getAllBooks = useCallback(async (userId: string, search?: string) => {
//     try {
//       console.log("getAllBooks query:", { clerkId: userId });
//       if (!userId) {
//         return {
//           success: false,
//         };
//       }
//       await connectToDatabase();

//       let query = {};

//       if (search) {
//         const escapedSearch = escapeRegex(search);
//         const regex = new RegExp(escapedSearch, "i");
//         query = {
//           clerkId: userId,
//           $or: [{ title: { $regex: regex } }, { author: { $regex: regex } }],
//         };
//       } else {
//         query = {
//           clerkId: userId,
//         };
//       }

//       const books = await Book.find(query).sort({ createdAt: -1 }).lean();
//       console.log("getAllBooks", books);
//       return {
//         success: true,
//         data: serializeData(books),
//       };
//     } catch (e) {
//       console.error("Error connecting to database", e);
//       return {
//         success: false,
//         error: getErrorMessage(e, "Something went wrong"),
//       };
//     }
//   }, []);

//   return {
//     books,
//     getAllBooks,
//   };
// }

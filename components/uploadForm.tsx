"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, ImageIcon } from "lucide-react";
import { UploadSchema } from "@/lib/zod";
import { BookUploadFormValues } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ACCEPTED_PDF_TYPES,
  ACCEPTED_IMAGE_TYPES,
  DEFAULT_VOICE,
} from "@/lib/constants";
import FileUploader from "./FileUploader";
import VoiceSelector from "./VoiceSelector";
import LoadingOverlay from "./LoadingOverlay";
import { useAuth, useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  checkBookExists,
  createBook,
  saveBookSegments,
  createEmbeddding,
} from "@/lib/actions/book.actions";
import { useRouter } from "next/navigation";
import { parsePDFFile } from "@/lib/utils";
import { upload } from "@vercel/blob/client";
import { getAllBooks } from "@/lib/actions/book.actions";

const UploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isMounted, setIsMounted] = useState(false);
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     if (!userId) return;

  //     const books = await getAllBooks(userId);

  //     console.log("book-book", books);
  //   };

  //   fetchBooks();
  // }, [userId]);

  const form = useForm<BookUploadFormValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      title: "",
      author: "",
      persona: "",
      pdfFile: undefined,
      coverImage: undefined,
    },
  });

  if (!isLoaded) {
    return null;
  }

  if (!userId) {
    return null;
  }

  const onSubmit = async (data: BookUploadFormValues) => {
    if (!userId) {
      return toast.error("Please login to upload books");
    }

    const books = await getAllBooks(userId);
    if (books.data && books.data?.length >= 2) {
      toast.info("Free users can only upload one book. Please upgrade.");
      router.push("/subscriptions");
      return;
    }

    setIsSubmitting(true);

    // PostHog -> Track Book Uploads...

    try {
      const existsCheck = await checkBookExists(data.title, userId);

      if (existsCheck.exists && existsCheck.book) {
        toast.info("Book with same title already exists.");
        form.reset();
        router.push(`/books/${existsCheck.book.slug}`);
        return;
      }

      const fileTitle = data.title.replace(/\s+/g, "-").toLowerCase();
      const pdfFile = data.pdfFile;

      const MAX_FILE_SIZE = 10 * 1024 * 1024;

      if (pdfFile.size > MAX_FILE_SIZE) {
        toast.error("PDF file must be smaller than 10MB.");
        return;
      }

      if (pdfFile.type !== "application/pdf") {
        toast.error("Only PDF files are allowed.");
        return;
      }

      const parsedPDF = await parsePDFFile(pdfFile);

      if (parsedPDF.content.length === 0) {
        toast.error(
          "Failed to parse PDF. Please try again with a different file.",
        );
        return;
      }

      const uploadedPdfBlob = await upload(`${fileTitle}.pdf`, pdfFile, {
        access: "public",
        handleUploadUrl: "/api/upload",
        // contentType: "application/pdf",
      });

      let coverUrl: string;
      const safeTitle = fileTitle
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .toLowerCase();

      if (data.coverImage) {
        const coverFile = data.coverImage;
        const extension = coverFile.name.split(".").pop() || "png";
        const uploadedCoverBlob = await upload(
          `${safeTitle}_cover.${extension}`,
          coverFile,
          {
            access: "public",
            handleUploadUrl: "/api/upload",
            // contentType: coverFile.type,
          },
        );
        coverUrl = uploadedCoverBlob.url;
      } else {
        const response = await fetch(parsedPDF.cover);
        const blob = await response.blob();

        const uploadedCoverBlob = await upload(`${safeTitle}_cover.png`, blob, {
          access: "public",
          handleUploadUrl: "/api/upload",
          //   contentType: "image/png",
        });
        coverUrl = uploadedCoverBlob.url;
      }

      const book = await createBook(
        {
          clerkId: userId,
          title: data.title,
          author: data.author,
          persona: data.persona,
          fileURL: uploadedPdfBlob.url,
          fileBlobKey: uploadedPdfBlob.pathname,
          coverURL: coverUrl,
          fileSize: pdfFile.size,
        },
        userId,
      );

      if (!book.success) {
        toast.error((book.error as string) || "Failed to create book");
        if (book.isBillingError) {
          router.push("/subscriptions");
        }
        return;
      }

      if (book.alreadyExists) {
        toast.info("Book with same title already exists.");
        form.reset();
        router.push(`/books/${book.data.slug}`);
        return;
      }

      const segments = await saveBookSegments(
        book.data._id,
        userId,
        parsedPDF.content,
      );

      if (!segments.success) {
        toast.error("Failed to save book segments");
        throw new Error("Failed to save book segments");
      }

      const res = await createEmbeddding(userId, book.data._id);

      console.log("create embedding", res);

      form.reset();
      router.push("/");
    } catch (error) {
      console.error(error);

      toast.error("Failed to upload book. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // if (!isMounted) return null;
  if (!isLoaded) return null;

  return (
    <>
      {isSubmitting && <LoadingOverlay />}

      <div className="new-book-wrapper">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* 1. PDF File Upload */}
            <FormField
              control={form.control}
              name="pdfFile"
              render={({ field }) => (
                <FileUploader
                  field={field}
                  label="Book PDF File"
                  acceptTypes={ACCEPTED_PDF_TYPES}
                  icon={Upload}
                  placeholder="Click to upload PDF"
                  hint="PDF file (max 50MB)"
                  disabled={isSubmitting}
                />
              )}
            />

            {/* 2. Cover Image Upload */}
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FileUploader
                  field={field}
                  label="Cover Image (Optional)"
                  acceptTypes={ACCEPTED_IMAGE_TYPES}
                  icon={ImageIcon}
                  placeholder="Click to upload cover image"
                  hint="Leave empty to auto-generate from PDF"
                  disabled={isSubmitting}
                />
              )}
            />

            {/* 3. Title Input */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Title</FormLabel>
                  <FormControl>
                    <Input
                      className="form-input"
                      placeholder="ex: Rich Dad Poor Dad"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 4. Author Input */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Author Name</FormLabel>
                  <FormControl>
                    <Input
                      className="form-input"
                      placeholder="ex: Robert Kiyosaki"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 5. Voice Selector */}
            <FormField
              control={form.control}
              name="persona"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">
                    Choose Assistant Voice
                  </FormLabel>
                  <FormControl>
                    <VoiceSelector
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 6. Submit Button */}
            <Button type="submit" className="form-btn" disabled={isSubmitting}>
              Begin Synthesis
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default UploadForm;

"use client";
import useGpt from "@/hooks/useGpt";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export default function Test() {
  const { userId, isLoaded } = useAuth();
  const { chunckBook } = useGpt();
  const bookId = "69fd6d539a4d19015931bd7e";
  const bookTitle = "A Simple Guide to Retrieval Augmented Generation";
  const blobUrl =
    "https://7apzfjatzrqew6fr.public.blob.vercel-storage.com/a-simple-guide-to-retrieval-augmented-generation-YXZmBDR7CouHq3yDhgEVwE8AHqnaZd.pdf";
  useEffect(() => {
    console.log(userId);
    if (!userId) return;
    const run = async () => {
      const res = await chunckBook(blobUrl, bookId, bookTitle, userId);
      console.log("chunk book", res);
    };

    run();
  }, [userId]);
  return (
    <div>
      <h1 className="text-4xl">Welcome</h1>
    </div>
  );
}

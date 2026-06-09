"use client";
import HeroSection from "@/components/HeroSection";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import BookCard from "@/components/BookCard";
import { IBook } from "@/types";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Book } from "lucide-react";

interface BookLibriaryProps {
  books: IBook[];
}
export default function BookLibriary({ books }: BookLibriaryProps) {
  const { userId } = useAuth();
  const router = useRouter();
  const [bookIdArr, setBookIdArr] = useState<string[]>([]);

  // console.log("Book library", books);
  useEffect(() => {
    console.log("Book array", bookIdArr);
  }, [bookIdArr]);

  return (
    <main className="wrapper container">
      <div>
        <HeroSection />
        <div className="library-books-grid">
          {books &&
            books?.length > 0 &&
            books?.map((book) => {
              const id = book._id;
              return (
                <BookCard
                  key={book._id}
                  title={book.title}
                  author={book.author}
                  coverURL={book.coverURL}
                  slug={book.slug}
                  bookId={book._id}
                  onSelect={(id) =>
                    setBookIdArr((prev) =>
                      prev.includes(id)
                        ? prev.filter((x) => x !== id)
                        : [...prev, id],
                    )
                  }
                />
              );
            })}
        </div>
        <div className="mt-4">
          <Button
            variant="contained"
            onClick={() => {
              console.log("clicked");
              router.push(`/books/multiple-books?ids=${bookIdArr.join(",")}`);
            }}
          >
            Import
          </Button>
        </div>
      </div>
    </main>
  );
}

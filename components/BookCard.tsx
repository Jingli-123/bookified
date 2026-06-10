"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { BookCardProps } from "@/types";
import Image from "next/image";
import OptionButton from "./ui/option-button";
import { deleteBook } from "@/lib/actions/book.actions";
import { useAuth } from "@clerk/nextjs";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const BookCard = ({
  title,
  author,
  coverURL,
  slug,
  bookId,
  booksNum,
  onSelect,
}: BookCardProps) => {
  const { userId } = useAuth();

  const [openOption, setOpenOption] = useState<boolean>(false);

  const handleDel = async () => {
    console.log("userId", title);
    if (userId) {
      deleteBook(userId, title);
      const result = await deleteBook(userId, title);
      console.log("result", result);
    }
  };

  return (
    <div>
      <article className="">
        <div className="relative flex flex-col w-full items-end justify-end">
          {openOption && (
            <div className="absolute bottom-full right-0 mt-1 w-[100px] bg-white rounded-sm border shadow-lg z-50">
              <button
                onClick={() => handleDel()}
                className="w-full cursor-pointer hover:text-blue-500"
              >
                Delete
              </button>
            </div>
          )}
          <OptionButton onOpen={() => setOpenOption((prev) => !prev)} />
        </div>
        <Link href={`/books/${slug}`}>
          <figure className="flex flex-col">
            <div className="flex flex-col bg-white pl-8 pb-8 pt-0 rounded-xl !m-0">
              <Image
                src={coverURL}
                alt={title}
                width={133}
                height={200}
                className="w-auto h-[170px] md:h-[200px] object-cover rounded-lg  mt-8 mr-8"
              />
            </div>
          </figure>
        </Link>
      </article>

      <figcaption>
        {booksNum > 1 && (
          <FormControlLabel
            control={
              <Checkbox name="select" onClick={() => onSelect(bookId)} />
            }
            label="Select"
          />
        )}

        <h3 className="book-card-title">{title}</h3>
        <p className="book-card-author">{author}</p>
        <p className="book-card-author">{bookId}</p>
      </figcaption>
    </div>
  );
};
export default BookCard;

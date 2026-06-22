"use client";

import { IBook } from "@/types";
import Image from "next/image";
// import ControlFeild from "@/components/ControlFeild";
import { useRouter } from "next/navigation";
import MultipleControlFeild from "./MultipleControlFeild";

export default function MultipleChatBox({
  books,
  bookIds,
}: {
  books: IBook[];
  bookIds: string[];
}) {
  const router = useRouter();

  return (
    <>
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Header Card */}
        <div className="vapi-header-card">
          <div className="vapi-cover-wrapper flex gap-2">
            {books &&
              books.map((book) => {
                return (
                  <div className="flex flex-col" key={book._id}>
                    <Image
                      src={book.coverURL || "/images/book-placeholder.png"}
                      alt={book.title}
                      width={120}
                      height={180}
                      className="vapi-cover-image !w-[120px] !h-auto"
                      priority
                    />
                    <p className="text-[#3d485e] text-sm w-[120px] break-words">
                      {book.title}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex">
          <MultipleControlFeild bookIds={bookIds} />
        </div>
      </div>
    </>
  );
}

"use client";

import { IBook } from "@/types";
import Image from "next/image";
import ControlFeild from "@/components/ControlFeild";
import { useRouter } from "next/navigation";
import MultipleControlFeild from "./MultipleControlFeild"

export default function MultipleChatBox  ({ book, bookIds }: { book: IBook; bookIds:string[] }) {

  const router = useRouter();

  return (
    <>
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Header Card */}
        <div className="vapi-header-card">
          <div className="vapi-cover-wrapper">
            <Image
              src={book.coverURL || "/images/book-placeholder.png"}
              alt={book.title}
              width={120}
              height={180}
              className="vapi-cover-image !w-[120px] !h-auto"
              priority
            />

          </div>

          <div className="flex flex-col gap-4 flex-1">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#212a3b] mb-1">
                {book.title}
              </h1>
              <p className="text-[#3d485e] font-medium">by {book.author}</p>
            </div>
          </div>
        </div>
        <div className="flex">
          <MultipleControlFeild bookIds={bookIds} />
        </div>
      </div>
    </>
  );
};


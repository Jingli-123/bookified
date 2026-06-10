import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBookByBookId } from "@/lib/actions/book.actions";
import MultipleChatBox from "./MultipleChatBox";
import { IBook } from "@/types";

interface Props {
  bookIds: string[];
}

export default async function MultipleBooks({ bookIds }: Props) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const results = await Promise.all(
    bookIds.map(id => getBookByBookId(id, userId))
  );

  const books: IBook[] = results
    .filter(result => result.success)
    .map(result => result.data);

  return (
    <div className="book-page-container">
      <Link href="/" className="back-btn-floating">
        <ArrowLeft className="size-6 text-[#212a3b]" />
      </Link>

      <MultipleChatBox
        books={books}
        bookIds={bookIds}
      />
    </div>
  );
}
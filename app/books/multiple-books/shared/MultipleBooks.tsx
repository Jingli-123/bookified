import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MicOff, Mic } from "lucide-react";
import { getBookByBookId } from "@/lib/actions/book.actions";
import MultipleChatBox from "./MultipleChatBox";

interface Props {
  bookIds: string[];
}

export default async function MultipleBooks({ bookIds }: Props) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const result = await getBookByBookId(bookIds[0], userId);

  if (!result.success || !result.data) {
    redirect("/");
  }

  const book = result.data;
  console.log("book multiple", bookIds);

  return (
    <div className="book-page-container">
      <Link href="/" className="back-btn-floating">
        <ArrowLeft className="size-6 text-[#212a3b]" />
      </Link>
      <MultipleChatBox book={book} bookIds={bookIds} />
    </div>
  );
}

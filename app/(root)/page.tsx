import HomePage from "./shared/HomePage";
import { auth } from "@clerk/nextjs/server";
import { getAllBooks } from "@/lib/actions/book.actions";
import { IBook } from "@/types";

export default async function Page() {
  const { userId } = await auth();

  const result = await getAllBooks(userId!);

  // const books: IBook[] = result.success ? (result.data ?? []) : [];
  return (
    <main className="wrapper container flex flex-col items-center gap-2 w-full !px-0">
      <HomePage />
    </main>
  );
}

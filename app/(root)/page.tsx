import HeroSection from "@/components/HeroSection";
// import { sampleBooks } from "@/lib/constants";
import { auth } from "@clerk/nextjs/server";
import BookCard from "@/components/BookCard";
import { getAllBooks } from "@/lib/actions/book.actions";

const page = async () => {
  const { userId } = await auth();
  // const client = await clerkClient();
  // const user = await client.users.getUser(userId as string);

  const bookResults = await getAllBooks(userId as string);

  const books = bookResults.success ? bookResults.data : [];

  return (
    <main className="wrapper container">
      <div>
        <HeroSection />
        <div className="library-books-grid">
          {books &&
            books?.length > 0 &&
            books?.map((book) => {
              return (
                <BookCard
                  key={book._id}
                  title={book.title}
                  author={book.author}
                  coverURL={book.coverURL}
                  slug={book.slug}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
};

export default page;


import HeroSection from "@/components/HeroSection";
import { sampleBooks } from "@/lib/constants";
import BookCard from "@/components/BookCard";

const page = () => {
  return (
    <main className="wrapper container">
      <div>
        <HeroSection />
        <div className="library-books-grid">
          {sampleBooks.map((book) => {
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

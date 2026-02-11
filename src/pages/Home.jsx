import BookCard from "../components/BookCard";
import { books } from "../data/books";
export default function Home() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-screen-2xl">
      <h1 className="text-4xl font-bold mb-10 text-center text-amber-300">
        Popular Books
        </h1>   
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">   
         {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
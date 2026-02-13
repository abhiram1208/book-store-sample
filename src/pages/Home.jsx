import { useState } from "react";
import BookCard from "../components/BookCard";
import { books } from "../data/books";

export default function Home() {
  const [searchItem, setSearchItem] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchItem.toLowerCase()) ||
      book.author.toLowerCase().includes(searchItem.toLowerCase()),
  );
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-screen-2xl">
      <h1 className="text-4xl font-bold mb-10 text-center text-amber-300">
        Popular Books
      </h1>
      {/* search bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <input
          type="text"
          placeholder="search books"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="w-full px-5 py-4 text-lg-border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
        />
      </div>

      {filteredBooks.length === 0 && searchItem && (
        <p className="text-center text-gray-500">
          No books found for "{searchItem}". Try another one.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

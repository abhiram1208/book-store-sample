import { useParams, Link } from "react-router-dom";
import { books } from "../data/books";
import { useCart } from "../context/CartContext";
export default function BookDetail() {
  const { id } = useParams();
  const book = books.find(b => b.id === Number(id));
  const { addToCart } = useCart();
  if (!book) {
    return <div className="text-center py-20">Book not found</div>;
  }
  return (
        <div className="max-w-4xl lg:max-w-6xl mx-auto px-4 py-12">
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back to Home
      </Link>
      <div className="grid md:grid-cols-2 gap-12 mt-8">
        <img src={book.cover} className="rounded-lg shadow" />
        <div>
          <h1 className="text-4xl font-bold">{book.title}</h1>
          <p className="text-xl text-gray-600 mt-2">{book.author}</p>
          <p className="text-3xl font-bold text-blue-600 mt-6">
            ₹{book.price}
          </p>
          <p className="mt-6 text-gray-700">{book.description}</p>
          <button
            onClick={() => addToCart(book)}
            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
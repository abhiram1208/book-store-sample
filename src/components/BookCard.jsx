import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
export default function BookCard({ book }) {
  const { addToCart } = useCart();
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition">
      <Link to={`/book/${book.id}`}>
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-64 object-cover rounded-t-lg"
        />
      </Link>
      <div className="p-5">
        <h3 className="font-bold text-lg">{book.title}</h3>
        <p className="text-gray-600">{book.author}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-blue-600">
            ₹{book.price}
          </span>
          <button
            onClick={() => addToCart(book)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
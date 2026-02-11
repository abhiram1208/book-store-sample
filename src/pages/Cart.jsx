import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  if (cart.length === 0) {
    return (
          <div className="max-w-4xl lg:max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Cart is empty</h2>
        <Link to="/" className="text-blue-600 underline">
          Browse Books
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      {cart.map(item => (
        <div key={item.id} className="flex gap-6 bg-white p-6 mb-6 rounded shadow">
          <img src={item.cover} className="w-28 h-40 object-cover rounded" />
          <div className="flex-1">
            <h3 className="font-bold text-xl">{item.title}</h3>
            <p className="text-blue-600 font-bold mt-2">
              ₹{item.price}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-auto text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
      <h2 className="text-2xl font-bold text-right mt-8">
        Total: ₹{total}
      </h2>
    </div>
  );
}
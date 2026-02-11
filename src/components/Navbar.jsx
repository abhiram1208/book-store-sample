import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";   // ← NEW import

export default function Navbar() {
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();   // ← NEW line

  return (
    <nav className="bg-gray-900 text-white">
      <div className="w-full px-6 h-16 flex items-center justify-between">
        
        <Link to="/" className="text-xl font-bold">
          Book Haven
        </Link>

        <div className="flex items-center gap-6">   {/* ← wrap right side items */}
          
          <Link to="/cart" className="relative">
            Cart ({cartCount})
          </Link>

          {/* ← PASTE THE NEW AUTH CODE HERE */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-300">Hi, {user.name}</span>
              <button
                onClick={logout}
                className="text-red-400 hover:text-red-300 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-300 transition">
              Login
            </Link>
          )}

        </div>

      </div>
    </nav>
  );
}
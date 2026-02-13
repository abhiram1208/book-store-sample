import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";   // ← NEW import
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const { cartCount,total } = useCart();
  const { isAuthenticated, user, logout } = useAuth();   // ← NEW line

  return (
    <nav className="bg-gray-900 text-white">
      <div className="w-full px-6 h-16 flex items-center justify-between">
        
        <Link to="/" className="text-xl font-bold">
          Book Haven
        </Link>

        <div className="flex items-center gap-6">   {/* ← wrap right side items */}
          
          <Link to="/cart" className="flex flex-col items-end hover:text-blue-300 transition">
          <span>
            Cart ({cartCount})
            </span>

            {cartCount>0 &&(
              <span className="text-xs text-green-400">
                ${total.toFixed(0)}
              </span> 
            )}

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
          {/* External icons */}

          <a href="https://instagram.com/bookhaven"
           target="_blank"
           rel="noopener noreferrer"
           className="text-xl  hover:text-pink-700 transition"
           title="follow us on instagram">
            <FaInstagram className="text-pink-600 hover:text-pink-900" />
           </a>
           <a href="https://wa.me/+917994424703"
           target="_blank"
           rel="noopener noreferrer"
           className="text-xl hover:text-green-700 transition"
           title="Whatsapp">
            <FaWhatsapp className="text-green-400 hover:text-green-900" />
           </a>
           <a href="https://facebook.com/bookhaven"
           target="_blank"
           rel="noopener noreferrer"
           className="text-xl hover:text-blue-700 transition"
           title="Facebook ">
            <FaFacebook className="text-blue-400 hover:text-blue-900" />
           </a>

        </div>

      </div>
    </nav>
  );
}
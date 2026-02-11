import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import BookDetail from "./pages/BookDetails";
import { CartProvider } from "./context/CartContext";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        
        {/* HEADER */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/login" element={<Login />} />  
            <Route path="/register" element={<Register />} /> 
          </Routes>
        </main>

        {/* FOOTER */}
        <Footer />
      </div>
    </CartProvider>
  );
}

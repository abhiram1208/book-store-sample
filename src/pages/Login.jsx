import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import emailjs from "@emailjs/browser";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [useOtp, setUseOtp] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  // PASSWORD LOGIN
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (login(email, password)) {
      navigate("/");
    } else {
      setError("Please enter valid email and password");
    }
  };

  // SEND OTP
  const sendOtp = () => {

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    emailjs.send(
      "service_keeet88",
      "template_vd7et1s",
      {
        email: email,
        otp: newOtp
      },
      "xUkFtKo27CsUYXh-B"
    )
    .then(() => {
      alert("OTP sent to email");
    })
    .catch((error) => {
      console.log(error);
      alert("Failed to send OTP");
    });
  };

  // VERIFY OTP
  const verifyOtp = () => {

    if (otp === generatedOtp) {
      login(email, "otp-user"); // dummy password
      navigate("/");
    } else {
      setError("Invalid OTP");
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Sign in to Book Haven
          </h2>
        </div>

        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4">
          <button
            className={`px-4 py-2 rounded ${!useOtp ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setUseOtp(false)}
          >
            Password
          </button>

          <button
            className={`px-4 py-2 rounded ${useOtp ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setUseOtp(true)}
          >
            OTP
          </button>
        </div>

        {/* PASSWORD LOGIN */}
        {!useOtp && (

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="relative">

              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md"
              />

              <span
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
                onClick={()=>setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash/> : <FaEye/>}
              </span>

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Sign In
            </button>

          </form>

        )}

        {/* OTP LOGIN */}
        {useOtp && (

          <div className="space-y-4">

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />

            <button
              onClick={sendOtp}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              Send OTP
            </button>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />

            <button
              onClick={verifyOtp}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Verify OTP
            </button>

          </div>

        )}

        <div className="text-center mt-4">
          <Link to="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>

      </div>

    </div>
  );
}
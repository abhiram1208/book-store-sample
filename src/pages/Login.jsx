import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import emailjs from "@emailjs/browser";

export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);

  const [otp,setOtp] = useState("");
  const [generatedOtp,setGeneratedOtp] = useState("");

  const [step,setStep] = useState(1);
  const [error,setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
    setError("");

    if(login(email,password)){

      const newOtp = Math.floor(100000 + Math.random()*900000).toString();
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
      .then(()=>{
        alert("OTP sent to your email");
        setStep(2);
      });

    }else{
      setError("Invalid email or password");
    }
  };

  const verifyOtp = ()=>{

    if(otp === generatedOtp){

      alert("Login successful");
      navigate("/");

    }else{
      setError("Invalid OTP");
    }

  };

  return(

<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">

<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">

<h2 className="text-3xl font-bold text-center">Sign in to Book Haven</h2>

{error && <p className="text-red-600 text-center">{error}</p>}

{/* STEP 1 LOGIN */}

{step===1 &&(

<form onSubmit={handleSubmit} className="space-y-6">

<div>
<label>Email</label>
<input
type="email"
required
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full border px-3 py-2 rounded"
/>
</div>

<div className="relative">

<label>Password</label>

<input
type={showPassword?"text":"password"}
required
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full border px-3 py-2 rounded"
/>

<span
className="absolute right-3 top-9 cursor-pointer"
onClick={()=>setShowPassword(!showPassword)}
>
{showPassword ? <FaEyeSlash/> : <FaEye/>}
</span>

</div>

<button
type="submit"
className="w-full bg-blue-600 text-white py-2 rounded"
>
Sign In
</button>

</form>

)}

{/* STEP 2 OTP */}

{step===2 &&(

<div className="space-y-4">

<p className="text-center">
Enter OTP sent to your email
</p>

<input
type="text"
placeholder="Enter OTP"
value={otp}
onChange={(e)=>setOtp(e.target.value)}
className="w-full border px-3 py-2 rounded"
/>

<button
onClick={verifyOtp}
className="w-full bg-green-600 text-white py-2 rounded"
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
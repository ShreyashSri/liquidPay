"use client";

import { useState } from "react";
import axios from "axios";

export default function VerifyEmailPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/verify-otp",
        {
          email,
          otp,
        }
      );
      setMessage(res.data.msg || "Email verified!");
    } catch (err: any) {
      setMessage(err.response?.data?.msg || "Invalid OTP or email");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
      <input
        type="email"
        placeholder="Enter your email"
        className="p-2 border mb-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter OTP"
        className="p-2 border mb-2 rounded"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleVerify}
      >
        Verify
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

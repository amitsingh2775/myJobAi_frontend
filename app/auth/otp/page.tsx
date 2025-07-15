"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast'

function OTPPage() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (!storedEmail) {
          router.replace("/auth/login"); 
    } else {
      setEmail(storedEmail);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) setOtp(value);
  };

  const handleResendOTP = async () => {
  if (!email) {
    setError("Email missing. Please register again.");
    return;
  }

  setLoading(true);
  setError("");
  try {
    const res = await api.post("/api/auth/resend-otp", { email });
    if (res.status === 200) {
      toast.success("OTP Resend successfully!")

    }
  } catch (error: any) {
    
    setError(error.response?.data?.message || "Failed to resend OTP");
  } finally {
    setLoading(false);
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email missing. Please register again.");
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const res = await api.post("/api/auth/verify", { email, otp });
      if (res.status === 200) {
        // if(email){
        //   sessionStorage.clear()
        // }
        setSuccess(true);
        router.push("/dashboard")
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      setError(error.response?.data?.message || "Verification Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-sm space-y-6">
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Enter OTP
        </h2>

        {success && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded text-center text-sm font-medium">
            ✅ Login Successful!
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded text-center text-sm font-medium">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={handleChange}
            placeholder="Enter 6-digit OTP"
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-center text-lg tracking-widest outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={otp.length !== 6 || loading}
            className="w-full bg-gray-900 text-white py-2 rounded-md font-semibold hover:bg-gray-700 transition disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Submit"
            )}
          </button>
        </form>

<p className="text-sm text-center text-gray-500">
  Didn’t get the code?{" "}
  <button
    type="button"
    onClick={handleResendOTP}
    disabled={loading}
    className="text-gray-900 font-bold text-sm hover:underline"
  >
    Resend
  </button>
</p>

      </div>
    </div>
  );
}

export default OTPPage;

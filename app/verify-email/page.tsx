"use client";

import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, AlertCircle, Check } from "lucide-react";

export default function VerifyEmailPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/auth/verify-otp",
        {
          email,
          otp,
        }
      );
      setIsSuccess(true);
      setMessage(res.data.msg || "Email verified successfully!");
    } catch (err: any) {
      setIsSuccess(false);
      setMessage(err.response?.data?.msg || "Invalid OTP or email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-20">
      <div className="container px-4 mx-auto">
        <Card className="max-w-md mx-auto bg-gray-900/80 backdrop-blur-md border-gray-800 shadow-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 to-yellow-400"></div>
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Mail className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Verify Your Email
            </CardTitle>
            <CardDescription className="text-gray-400">
              Enter your email and OTP code to verify your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {message && (
              <Alert
                className={`mb-4 ${
                  isSuccess
                    ? "bg-green-900/30 border-green-800 text-green-300"
                    : "bg-red-900/30 border-red-800 text-red-300"
                }`}
              >
                {isSuccess ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Mail className="h-4 w-4" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white pl-10 focus-visible:ring-yellow-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-gray-300">
                  OTP Code
                </Label>
                <Input
                  id="otp"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white focus-visible:ring-yellow-500"
                />
              </div>
              <Button
                onClick={handleVerify}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verifying...
                  </div>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-800 pt-6">
            <p className="text-gray-400 text-sm">
              Didn't receive code?{" "}
              <button className="text-yellow-500 hover:text-yellow-400 font-medium transition-colors">
                Resend OTP
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    if (!otp) {
      setMessage("Please enter the OTP");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8188/api/auth/verifyEmail",
        { verificationToken: otp },
        { withCredentials: true }
      );

      if (response.data.msg === "Email verified and welcome email sent") {
        setIsSuccess(true);
        setMessage("Email verified successfully!");
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setIsSuccess(false);
        setMessage(response.data.msg || "Verification failed");
      }
    } catch (error: any) {
      setIsSuccess(false);
      setMessage(error.response?.data?.msg || "An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.1),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(192,192,192,0.1),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[100px]"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <Card className="max-w-md mx-auto bg-gray-900/80 backdrop-blur-md border-gray-800 shadow-xl animate-in fade-in-50 duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 to-yellow-400"></div>
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6 text-yellow-500"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v1" />
                  <path d="M12 21v1" />
                  <path d="M4.93 4.93l.7.7" />
                  <path d="M18.36 18.36l.7.7" />
                  <path d="M2 12h1" />
                  <path d="M21 12h1" />
                  <path d="M4.93 19.07l.7-.7" />
                  <path d="M18.36 5.64l.7-.7" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Verify Your Email
            </CardTitle>
            <CardDescription className="text-gray-400">
              Enter the OTP sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            {message && (
              <Alert
                variant={isSuccess ? "default" : "destructive"}
                className={`mb-4 ${
                  isSuccess
                    ? "bg-green-900/30 border-green-800 text-green-300"
                    : "bg-red-900/30 border-red-800 text-red-300"
                }`}
              >
                {isSuccess ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white"
                />
              </div>
              <Button
                onClick={handleVerify}
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black"
                disabled={isLoading}
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
        </Card>
      </div>
    </div>
  );
}

"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.1),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(192,192,192,0.1),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[100px]"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <Card className="max-w-md mx-auto bg-gray-900/80 backdrop-blur-md border-gray-800 shadow-xl animate-in fade-in-50 duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 to-yellow-400"></div>

          <CardHeader className="space-y-1">
            <Link
              href="/login"
              className="flex items-center text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to login
            </Link>

            {!isSubmitted ? (
              <>
                <CardTitle className="text-2xl font-bold text-white">
                  Forgot password
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Enter your email address and we'll send you a link to reset
                  your password
                </CardDescription>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-white text-center">
                  Check your email
                </CardTitle>
                <CardDescription className="text-gray-400 text-center">
                  We've sent a password reset link to{" "}
                  <span className="text-white font-medium">{email}</span>
                </CardDescription>
              </>
            )}
          </CardHeader>

          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      required
                      className="bg-gray-800/50 border-gray-700 text-white pl-10 focus-visible:ring-yellow-500"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]"
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
                      Sending...
                    </div>
                  ) : (
                    "Send reset link"
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-400 text-sm text-center">
                  Didn't receive the email? Check your spam folder or try again
                  with a different email address.
                </p>

                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
                >
                  Try again
                </Button>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-center border-t border-gray-800 pt-6">
            <p className="text-gray-400 text-sm">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-yellow-500 hover:text-yellow-400 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

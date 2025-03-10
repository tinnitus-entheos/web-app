"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";
import useFirebaseForgotPassword from "../../hooks/use-forgotpassword";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { resetPassword, loading, error, success } =
    useFirebaseForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword(email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-teal-700">
      <div className="min-h-screen backdrop-blur-sm backdrop-filter bg-purple-900/20 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Forgot Password
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/80 backdrop-blur-lg py-8 px-4 shadow-2xl rounded-xl sm:px-10 border border-white/50">
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                Password reset email sent! Check your inbox.
                <button
                  onClick={() => router.push("/auth/login")}
                  className="ml-2 underline text-green-800"
                >
                  Return to Login
                </button>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-purple-900"
                >
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 py-3 border border-purple-200 rounded-md bg-white/90 shadow-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 sm:text-sm outline-none"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-xl text-sm font-medium text-white bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Sending Reset Email..." : "Reset Password"}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/auth/login"
                className="font-medium text-teal-700 hover:text-teal-600"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

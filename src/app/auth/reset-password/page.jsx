"use client";

import React, { useState, Suspense } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getAuth, confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";

// Loading component for Suspense fallback
const Loading = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-teal-700">
    <div className="min-h-screen backdrop-blur-sm backdrop-filter bg-purple-900/20 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="text-center text-white">
        Loading...
      </div>
    </div>
  </div>
);

// Component that uses useSearchParams
const PasswordResetForm = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const oobCode = searchParams.get('oobCode');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const auth = getAuth();
      await verifyPasswordResetCode(auth, oobCode);
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess(true);
      setTimeout(() => router.push("/auth/login"), 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  if (!oobCode) {
    return (
      <div className="text-center text-white">
        Invalid reset link. Please request a new password reset.
      </div>
    );
  }

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-white">
          Set New Password
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
              Password reset successful! Redirecting to login...
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-purple-900"
              >
                New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-purple-600" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-3 border border-purple-200 rounded-md bg-white/90 shadow-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 sm:text-sm outline-none"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength="6"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('password')}
                    className="text-purple-600 hover:text-purple-500 focus:outline-none focus:text-purple-500"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-purple-900"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-purple-600" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-3 border border-purple-200 rounded-md bg-white/90 shadow-sm focus:ring-2 focus:ring-teal-600 focus:border-teal-600 sm:text-sm outline-none"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength="6"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="text-purple-600 hover:text-purple-500 focus:outline-none focus:text-purple-500"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-xl text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || success}
              >
                {loading ? "Resetting Password..." : "Set New Password"}
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
    </>
  );
};

// Main component with Suspense boundary
const PasswordResetPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-teal-700">
      <div className="min-h-screen backdrop-blur-sm backdrop-filter bg-purple-900/20 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Suspense fallback={<Loading />}>
          <PasswordResetForm />
        </Suspense>
      </div>
    </div>
  );
};

export default PasswordResetPage;
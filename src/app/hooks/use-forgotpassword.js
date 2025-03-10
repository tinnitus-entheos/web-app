"use client";
import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const useFirebaseForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const auth = getAuth();

  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/user-not-found":
          setError("No account associated with this email.");
          break;
        case "auth/too-many-requests":
          setError("Too many reset attempts. Please try again later.");
          break;
        default:
          setError("Failed to send password reset email. Please try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error, success };
};

export default useFirebaseForgotPassword;
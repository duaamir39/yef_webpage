"use client";

import Image from 'next/image';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { signIn } from "next-auth/react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { FaGoogle } from 'react-icons/fa';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, redirectAfterAuth } = useAuth();
  const { data: session } = useSession();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session && isAuthModalOpen) {
      closeAuthModal();
      if (redirectAfterAuth) {
        window.location.href = redirectAfterAuth;
      }
    }
  }, [session, isAuthModalOpen, closeAuthModal, redirectAfterAuth]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        closeAuthModal();
        if (redirectAfterAuth) {
          window.location.href = redirectAfterAuth;
        }
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      const signInResult = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.error) {
        setError("Registration successful! Please sign in.");
        setIsLoginForm(true);
      } else {
        closeAuthModal();
        if (redirectAfterAuth) {
          window.location.href = redirectAfterAuth;
        }
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative border-2 border-[#024da1] shadow-xl">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-[#024da1] hover:text-[#013a7c]"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-white p-2 border border-gray-200">
            <Image
              src="/images/logo.JPG"
              alt="YEF Logo"
              width={64}
              height={64}
              className="rounded-full object-contain"
            />
          </div>

          <h2 className="text-2xl font-bold text-[#024da1]">
            {isLoginForm ? "Welcome Back" : "Join Us"}
          </h2>
          <p className="text-gray-600 mt-2">
            {isLoginForm
              ? "Sign in to continue"
              : "Create your account to get started"}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={isLoginForm ? handleLogin : handleRegister}
          className="space-y-4"
        >
          {!isLoginForm && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#024da1] focus:border-[#024da1]"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#024da1] focus:border-[#024da1]"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#024da1] focus:border-[#024da1]"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          {isLoginForm && (
            <div className="text-right text-sm -mt-2">
              <Link
                href="/auth/forgot-password"
                onClick={closeAuthModal}
                className="text-gray-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#024da1] text-white py-3 px-4 rounded-md hover:bg-[#013a7c] transition-colors disabled:opacity-50 font-medium"
          >
            {isLoading
              ? "Please wait..."
              : isLoginForm
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setError("");
            }}
            className="text-[#024da1] hover:text-[#013a7c] font-medium text-sm"
          >
            {isLoginForm
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
 <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-center text-sm text-gray-600 mb-4">Or continue with</h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => signIn('google')} 
                className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <FaGoogle className="h-5 w-5 mr-2" />
                Google
              </button>
            </div>
          </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}



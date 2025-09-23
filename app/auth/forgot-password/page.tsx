'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { openAuthModal } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset link.');
      }

      setMessage(data.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg border-2 border-[#024da1] bg-white p-6 shadow-xl">
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
          <h2 className="text-2xl font-bold text-[#024da1]">Forgot Password?</h2>
          <p className="text-gray-600 mt-2">Enter your email to receive a reset link.</p>
        </div>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#024da1] focus:border-[#024da1]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#024da1] text-white py-3 px-4 rounded-md hover:bg-[#013a7c] transition-colors disabled:opacity-50 font-medium"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
           <button 
            onClick={() => openAuthModal()}
            className="text-[#024da1] hover:text-[#013a7c] font-medium text-sm"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
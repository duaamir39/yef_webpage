'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
      <Card className="w-full max-w-md shadow-xl border-2 border-[#024da1] rounded-md ">
        <CardHeader className="text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200 bg-white p-2">
            <Image
              src="/images/logo.JPG"
              alt="YEF Logo"
              width={64}
              height={64}
              className="rounded-full object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-[#024da1]">Forgot Password?</CardTitle>
          <CardDescription>Enter your email to receive a reset link.</CardDescription>
        </CardHeader>

        <CardContent>
          {message && (
            <Alert className="mb-4 bg-green-100 border-green-400 text-green-700">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert className="mb-4 bg-red-100 border-red-400 text-red-700">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-4"
          >
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-[#024da1] hover:bg-[#013a7c] border-0"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <Button
            variant="link"
            onClick={() => openAuthModal()}
            className="text-[#024da1] hover:text-[#013a7c] text-sm"
          >
            Back to Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

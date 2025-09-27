'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { openAuthModal } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing password reset token.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (!token) {
      setError('Invalid token. Please request a new link.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password.');
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
      <Card className="w-full max-w-md shadow-xl border-2 border-[#024da1] rounded-md">
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
          <CardTitle className="text-2xl font-bold text-[#024da1]">Reset Password</CardTitle>
          <CardDescription>Create a new password for your account.</CardDescription>
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
              <label htmlFor="password" className="text-sm font-medium">
                New Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-[#024da1] hover:bg-[#013a7c] border-0"
              disabled={isLoading || !token}
            >
              {isLoading ? 'Updating...' : 'Set New Password'}
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

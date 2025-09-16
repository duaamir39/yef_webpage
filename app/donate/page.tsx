// app/donate/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function DonatePage() {
  const { data: session, status } = useSession();

  // Optional: Redirect if not authenticated
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect('/auth/signin?callbackUrl=/donate');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-[#024da1] mb-8">
          Support Our Cause
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Make a Donation</h2>
          <p className="text-gray-600 mb-6">
            Your support helps us continue our mission of youth empowerment and education.
          </p>
          
          {/* Add your donation form or payment integration here */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">Donation form will be implemented here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
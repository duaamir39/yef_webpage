// app/components/DonateButton.tsx
'use client';

// import { useAuth } from '@/context/AuthContext';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';

export default function DonateButton() {
  const { openAuthModal } = useAuth();
  const { data: session } = useSession();

  const handleDonateClick = () => {
    if (!session) {
      // User not logged in - open auth modal
      openAuthModal('/donate');
    } else {
      // User is logged in - go directly to donate page
      window.location.href = '/donate';
    }
  };

  return (
    <Button 
      onClick={handleDonateClick}
      className="bg-[#024da1] hover:bg-[#013a7c] rounded-lg px-6 py-3 text-white text-lg"
    >
      Donate
    </Button>
  );
}
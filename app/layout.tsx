// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import HeroSection from './components/HeroSection';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Youth Evolution Foundation',
  description: 'Empowering the youth for a better future.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Navbar />
          <main className="flex-grow">
            <HeroSection/>
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
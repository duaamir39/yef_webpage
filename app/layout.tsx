import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Youth Evolution Foundation',
  description: 'Empowering the youth for a better future.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="flex-grow">
          <HeroSection/>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
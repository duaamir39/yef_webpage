// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./context/AuthContext";
import AuthModal from "./components/AuthModal";
import Chatbot from './components/Chatbot';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Youth Evolution Foundation",
  description: "Empowering the youth for a better future.",
  icons: [{ rel: "icon", url: "/images/logo.JPG" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <AuthModal />
            <Chatbot /> 
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

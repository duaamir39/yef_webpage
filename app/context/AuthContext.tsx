// context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthModalOpen: boolean;
  openAuthModal: (redirectPath?: string) => void;
  closeAuthModal: () => void;
  redirectAfterAuth: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [redirectAfterAuth, setRedirectAfterAuth] = useState<string | null>(
    null
  );

  const openAuthModal = (redirectPath?: string) => {
    if (redirectPath) setRedirectAfterAuth(redirectPath);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setRedirectAfterAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        redirectAfterAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

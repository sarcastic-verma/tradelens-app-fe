"use client";

import { useState } from "react";
import Image from "next/image";

import { useAuthContext } from "@/state/context/auth.context";
import { AuthModal } from "@/components/auth/auth-modal";

export function Navbar() {
  const { user, loading } = useAuthContext();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">TradeLens</span>
          </div>

          <div className="flex items-center gap-4">
            {loading ? (
              <div className="h-10 w-24 bg-zinc-800 rounded-full animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-300">
                  {user.name || user.email}
                </span>
                {user.photo ? (
                  <Image
                    src={user.photo}
                    alt={user.name || "User"}
                    width={36}
                    height={36}
                    className="rounded-full border-2 border-zinc-700"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                    {(user.name || user.email || "U")[0].toUpperCase()}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-medium rounded-full transition-all duration-200 shadow-lg shadow-indigo-500/25"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </>
  );
}

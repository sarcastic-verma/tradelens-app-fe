"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "@/state/context/auth.context";

export function DashboardNavbar() {
  const { user, loading } = useAuthContext();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-4 px-4 bg-transparent pointer-events-none">
      <nav className="flex items-center justify-between h-16 px-4 bg-background/90 backdrop-blur-xl border border-border/50 rounded-full shadow-lg max-w-2xl w-full pointer-events-auto transition-all duration-300">
        <div className="flex items-center gap-2 sm:gap-3 ml-2">
          <div className="flex flex-col items-start leading-none gap-0.5">
            <Link
              href="/"
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span className="font-bold text-base sm:text-lg text-foreground leading-tight">
                TradeLens
              </span>
            </Link>
          </div>
        </div>

        {/* Placeholder for Dashboard Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link
            href="/creators"
            className="hover:text-foreground transition-colors hover:text-primary"
          >
            Creators
          </Link>
          <Link
            href="/trades"
            className="hover:text-foreground transition-colors hover:text-primary"
          >
            Trades
          </Link>
        </div>

        <div className="flex items-center gap-4 mr-1">
          {!loading && user && (
            <Link href="/profile" title="Go to Profile">
              {user.photo ? (
                <Image
                  src={user.photo}
                  alt={user.name || "User"}
                  width={36}
                  height={36}
                  className="rounded-full border border-border hover:border-primary/50 transition-colors"
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-sm font-medium shadow-glow-primary hover:shadow-glow-primary/80 transition-shadow">
                  {(user.name || user.email || "U")[0].toUpperCase()}
                </div>
              )}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

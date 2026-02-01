"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

interface LandingNavbarProps {
  onLoginClick: () => void;
}

export function LandingNavbar({ onLoginClick }: LandingNavbarProps) {
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
            <a
              href="https://launch.hypeliv.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] sm:text-[10px] font-medium bg-gradient-to-tr from-pink-500 to-violet-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              by Hypeliv ✨
            </a>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <button
            onClick={() =>
              document
                .getElementById("benefits")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-foreground transition-colors hover:text-primary"
          >
            Benefits
          </button>
          <button
            onClick={() =>
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-foreground transition-colors hover:text-primary"
          >
            How it Works
          </button>
          <button
            onClick={() =>
              document
                .getElementById("faq")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-foreground transition-colors hover:text-primary"
          >
            FAQ
          </button>
        </div>

        <div className="flex items-center gap-4 mr-1">
          <ThemeToggle />
          <Button
            onClick={onLoginClick}
            size="sm"
            className="rounded-full h-9 px-6 text-xs font-semibold shadow-glow-primary hover:shadow-glow-primary/80 transition-shadow"
          >
            Login
          </Button>
        </div>
      </nav>
    </header>
  );
}

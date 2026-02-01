"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";

interface MobileStickyBarProps {
  onLoginClick: () => void;
}

export const MobileStickyBar = ({ onLoginClick }: MobileStickyBarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (roughly 80vh)
      const heroHeight = window.innerHeight * 0.8;
      const shouldShow = window.scrollY > heroHeight && !isDismissed;
      setIsVisible(shouldShow);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card/95 backdrop-blur-xl border-t border-border/50 md:hidden animate-slide-up"
      style={{ animationDuration: "0.25s" }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            Join 100+ traders
          </p>
          <p className="text-xs text-muted-foreground truncate">
            Get access to verified traders
          </p>
        </div>

        <Button
          variant="default"
          size="sm"
          onClick={onLoginClick}
          className="flex-shrink-0"
        >
          Join Now
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>

        <button
          onClick={() => setIsDismissed(true)}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

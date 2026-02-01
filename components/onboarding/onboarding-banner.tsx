"use client";

import { useAuthContext } from "@/state/context/auth.context";
import { useRouter } from "next/navigation";
import { X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const OnboardingBanner = () => {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const [isDismissed, setIsDismissed] = useState(false);

  // Derived state - no effect needed
  const shouldShow = !loading && user && !user.name && !isDismissed;

  if (!shouldShow) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-card rounded-2xl p-4 shadow-glow-primary border-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-2xl animate-pulse-glow">
                👋
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground text-lg">
                  Complete your profile
                </p>
                <p className="text-sm text-muted-foreground">
                  Add your details to unlock full access to TradeLens features.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                onClick={() => router.push("/onboarding")}
                className="flex-1 sm:flex-none shadow-glow-primary font-semibold"
              >
                Finish Setup
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDismissed(true)}
                className="shrink-0 text-muted-foreground hover:text-foreground hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

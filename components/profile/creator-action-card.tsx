"use client";

import { useRouter } from "next/navigation";
import { Sparkles, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackendUser } from "@/types";

interface CreatorActionCardProps {
  user: BackendUser;
}

export function CreatorActionCard({ user }: CreatorActionCardProps) {
  const router = useRouter();

  if (user?.role !== "CREATOR") {
    return (
      <Card
        className="glass-card relative overflow-hidden border-primary/20 shadow-glow-primary group hover:border-primary/40 transition-colors cursor-pointer"
        onClick={() => router.push("/creator/onboarding")}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardContent className="p-6 relative z-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-white animate-pulse-glow" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-yellow-700 to-blue-400 group-hover:from-yellow-600 group-hover:to-yellow-300 transition-all">
                Become a Creator
              </h3>
              <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                Share your trades, monetize your expertise.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
          >
            <TrendingUp className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="glass-card relative overflow-hidden border-primary/20 shadow-glow-primary group hover:border-primary/40 transition-colors cursor-pointer"
      onClick={() => router.push("/creator/dashboard")}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent className="p-6 relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-400 group-hover:from-blue-600 group-hover:to-indigo-300 transition-all">
              Creator Dashboard
            </h3>
            <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
              Manage your trades and subscribers.
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
        >
          <TrendingUp className="w-5 h-5" />
        </Button>
      </CardContent>
    </Card>
  );
}

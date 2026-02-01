"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/state/context/auth.context";

export default function OnboardingPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welcome to TradeLens! 🎉
            </h1>
            <p className="text-lg text-zinc-400">
              Let&apos;s get your account set up in just a few steps.
            </p>
          </div>

          <div className="space-y-6">
            <OnboardingStep
              step={1}
              title="Complete Your Profile"
              description="Add your name and profile photo so others can identify you."
              status="current"
            />

            <OnboardingStep
              step={2}
              title="Choose Your Interests"
              description="Select the instruments and strategies you're interested in."
              status="pending"
            />

            <OnboardingStep
              step={3}
              title="Follow Creators"
              description="Discover and follow verified creators to see their trades."
              status="pending"
            />
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={() => router.push("/")}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-full transition-all duration-200 shadow-lg shadow-indigo-500/25"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function OnboardingStep({
  step,
  title,
  description,
  status,
}: {
  step: number;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
}) {
  const borderColor =
    status === "completed"
      ? "border-green-500"
      : status === "current"
        ? "border-indigo-500"
        : "border-zinc-700";

  const bgColor = status === "current" ? "bg-zinc-900/80" : "bg-zinc-900/30";

  return (
    <div
      className={`p-6 rounded-2xl border ${borderColor} ${bgColor} transition-colors`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
            status === "completed"
              ? "bg-green-500 text-white"
              : status === "current"
                ? "bg-indigo-500 text-white"
                : "bg-zinc-700 text-zinc-400"
          }`}
        >
          {status === "completed" ? "✓" : step}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-zinc-400 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

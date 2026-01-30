"use client";

import { Navbar } from "@/components/common/navbar";
import { useAuthContext } from "@/state/context/auth.context";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-20">
        {user ? <AuthenticatedContent /> : <UnauthenticatedContent />}
      </main>
    </div>
  );
}

function UnauthenticatedContent() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Make Trading{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Trustable
          </span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Follow verified creators, track their real trades, and make informed
          investment decisions. No more fake gurus — just transparent,
          verifiable performance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              const loginBtn = document.querySelector(
                "nav button",
              ) as HTMLButtonElement;
              loginBtn?.click();
            }}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-full transition-all duration-200 shadow-lg shadow-indigo-500/25 text-lg"
          >
            Get Started Free
          </button>

          <button className="px-8 py-3 border border-zinc-700 hover:border-zinc-500 text-white font-medium rounded-full transition-all duration-200 text-lg">
            Learn More
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="📊"
            title="Real Trade Tracking"
            description="See actual trades posted by verified creators in real-time"
          />
          <FeatureCard
            icon="✅"
            title="SEBI Verified"
            description="Only SEBI-registered advisors can become creators"
          />
          <FeatureCard
            icon="📈"
            title="Performance Analytics"
            description="Track hit rates, P&L, and drawdown metrics transparently"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
  );
}

function AuthenticatedContent() {
  const { user } = useAuthContext();

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Welcome back, {user?.name || "Trader"}! 👋
        </h1>

        <p className="text-lg text-zinc-400 mb-8">
          Your personalized trading dashboard will be live soon.
        </p>

        <div className="p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <p className="text-zinc-500">Dashboard coming soon...</p>
        </div>
      </div>
    </div>
  );
}

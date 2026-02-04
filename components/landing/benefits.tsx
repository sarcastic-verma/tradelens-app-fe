"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "./scroll-reveal";
import {
  Users,
  Wallet,
  ShieldCheck,
  TrendingUp,
  Eye,
  BarChart3,
  BadgeCheck,
  Lock,
  Globe,
  CreditCard,
  ImageOff,
  ChartLine,
} from "lucide-react";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const creatorBenefits: Benefit[] = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Wider Audience Reach",
    description:
      "Access thousands of members actively searching for verified creators. Your proven track record speaks for itself.",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Fixed Monthly Deductions",
    description:
      "Predictable revenue with automated billing. No chasing payments or follow-ups needed. We will handle everything for you.",
  },
  {
    icon: <ImageOff className="w-6 h-6" />,
    title: "Screenshot Prevention",
    description:
      "Your premium content always stays protected. Built-in safeguards prevent unauthorized sharing of your trade calls.",
  },
  {
    icon: <BadgeCheck className="w-6 h-6" />,
    title: "Verified Credibility",
    description:
      "Stand out with verified performance. Build trust instantly with transparent, tamper-proof results and data backed analysis.",
  },
  {
    icon: <ChartLine className="w-6 h-6" />,
    title: "Performance Analytics",
    description:
      "Detailed dashboards showing your win rate, drawdown, and subscriber growth. Know exactly how you're performing.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Tools",
    description:
      "Engage all your subscribers with built-in tools for trade alerts, updates, and scheduled announcements, built in to the platform.",
  },
];

const memberBenefits: Benefit[] = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Verified Performance",
    description:
      "No more P&L screenshots. See real, audited trade history with verified results you can trust.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "SEBI Status Clarity",
    description:
      "Know exactly who you're following. Every creator is clearly labeled as SEBI-registered or unregistered.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Deep Analytics",
    description:
      "Analyze equity curves, drawdown patterns, and risk management before subscribing to any creator.",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Full Transparency",
    description:
      "Every trade timestamped and recorded. See entry, exit, and P&L for complete accountability.",
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    title: "Fair Pricing",
    description:
      "Subscribe only to creators whose performance justifies their fees. Cancel anytime with no lock-ins.",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Secure Platform",
    description:
      "Your data stays private. Bank-grade security ensures your information is always protected.",
  },
];

export const Benefits = () => {
  const [activeTab, setActiveTab] = useState<"member" | "creator">("member");

  const benefits = activeTab === "creator" ? creatorBenefits : memberBenefits;

  return (
    <section
      className="py-16 sm:py-20 md:py-24 relative overflow-hidden"
      id="benefits"
    >
      {/* Background effects */}
      <div className="absolute inset-0 hero-glow opacity-30" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4">
              Why TradeLens?
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Benefits for{" "}
              <span className="text-gradient-primary">Everyone</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Whether you&apos;re sharing trade ideas or looking for proven
              strategies, TradeLens has you covered.
            </p>
          </div>
        </ScrollReveal>

        {/* Toggle Switch */}
        <ScrollReveal delay={100}>
          <div className="flex justify-center mb-10 sm:mb-14">
            <div className="inline-flex items-center p-1.5 rounded-full bg-card border border-border">
              <button
                onClick={() => setActiveTab("member")}
                className={`relative px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeTab === "member"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  For Members
                </span>
              </button>
              <button
                onClick={() => setActiveTab("creator")}
                className={`relative px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeTab === "creator"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  For Creators
                </span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {benefits.map((benefit, index) => (
            <ScrollReveal
              key={`${activeTab}-${index}`}
              delay={150 + index * 50}
            >
              <Card className="group relative h-full bg-card/50 border-border/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] cursor-pointer">
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[hsl(var(--success)/0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Animated corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0" />

                <CardContent className="relative z-10 p-5 sm:p-6">
                  {/* Icon container */}
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25">
                    {benefit.icon}
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {benefit.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-[hsl(var(--success))] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

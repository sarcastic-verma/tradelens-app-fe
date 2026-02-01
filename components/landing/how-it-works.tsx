"use client";

import { UserPlus, Search, TrendingUp, CheckCircle } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Sign Up",
    description:
      "Create your free account to access the platform. No waitlists, just instant access.",
  },
  {
    number: "02",
    icon: Search,
    title: "Browse Verified Creators",
    description:
      "Explore our curated list of creators with real, verified performance and SEBI credentials.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Track Real Performance",
    description:
      "See live accuracy tracking, auto-verified trades, and honest community reviews.",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Make Informed Decisions",
    description:
      "Choose creators based on facts, not hype. Subscribe with confidence.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-16 md:py-28 px-4 bg-gradient-to-b from-card/30 to-background"
    >
      <div className="container max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6 md:mb-8">
              <span className="text-xs md:text-sm text-primary font-medium">
                How It Works
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 px-2">
              Your Path to Trusted Trading
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to find legitimate trading creators and protect
              your investment journey.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="relative group">
                {/* Connection line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary/30 to-transparent" />
                )}

                <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-elevated h-full">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-10">
                    {/* Step number */}
                    <div className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-br from-primary via-primary/70 to-primary/40 bg-clip-text text-transparent drop-shadow-sm">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 md:mb-5">
                      <step.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>

                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">
                      {step.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

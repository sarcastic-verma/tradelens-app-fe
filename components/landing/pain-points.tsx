"use client";

import { AlertTriangle, X, Check } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

export const PainPoints = () => {
  return (
    <section className="w-full py-24 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 bg-danger/10 border border-danger/20 rounded-full px-4 py-2 mb-6 md:mb-8">
              <AlertTriangle className="w-3.5 h-3.5 md:w-4 md:h-4 text-danger" />
              <span className="text-xs md:text-sm text-danger font-medium">
                The Problem
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-5 px-2">
              Tired of getting trapped in fake trading groups?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Here&apos;s what most Telegram &quot;gurus&quot; don&apos;t want
              you to know.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="relative grid md:grid-cols-2 rounded-2xl overflow-hidden border border-border shadow-xl">
            {/* VS Badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex">
              <div className="w-12 h-12 rounded-full bg-background border-2 border-border shadow-lg flex items-center justify-center">
                <span className="text-xs font-bold text-muted-foreground">
                  VS
                </span>
              </div>
            </div>

            {/* The Old Way */}
            <div className="bg-danger/5 p-8 sm:p-12 border-b md:border-b-0 md:border-r border-border">
              <div className="inline-flex items-center gap-2 bg-danger/10 border border-danger/20 rounded-full px-3 py-1.5 mb-6">
                <X size={12} className="text-danger" />
                <span className="text-xs font-semibold text-danger tracking-wider">
                  Random &quot;Tips&quot; Channel
                </span>
              </div>
              <ul className="space-y-4">
                {[
                  "No proof of results",
                  "Edited screenshots",
                  "Fake testimonials",
                  "Zero accountability",
                  "Hype driven marketing",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-foreground group cursor-default"
                  >
                    <div className="bg-danger/10 p-1.5 rounded-full text-danger transition-all duration-200 group-hover:bg-danger/20 group-hover:scale-110">
                      <X size={12} />
                    </div>
                    <span className="text-sm transition-colors duration-200 group-hover:text-danger">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* TradeLens Way */}
            <div className="bg-card p-8 sm:p-12">
              <div className="inline-flex items-center gap-2 bg-success/10 border border-success/20 rounded-full px-3 py-1.5 mb-6">
                <Check size={12} className="text-success" />
                <span className="text-xs font-semibold text-success tracking-wider">
                  TradeLens
                </span>
              </div>
              <ul className="space-y-4">
                {[
                  "Verified Live Performance",
                  "SEBI Status Transparency",
                  "Validated Member Reviews",
                  "Real-time Invalidations",
                  "Data-driven Content",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-foreground font-medium group cursor-default"
                  >
                    <div className="bg-success/10 p-1.5 rounded-full text-success transition-all duration-200 group-hover:bg-success/20 group-hover:scale-110">
                      <Check size={12} />
                    </div>
                    <span className="text-sm transition-colors duration-200 group-hover:text-success">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

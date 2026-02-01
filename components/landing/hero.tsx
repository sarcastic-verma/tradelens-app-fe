"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  User,
} from "lucide-react";
import { useParallax } from "@/hooks/use-parallax";

interface HeroProps {
  onLoginClick: () => void;
}

export const Hero = ({ onLoginClick }: HeroProps) => {
  const parallaxSlow = useParallax(0.15);
  const parallaxFast = useParallax(0.25);

  return (
    <section className="relative min-h-screen pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 px-4 overflow-hidden flex items-start sm:items-center">
      {/* Floating orbs with parallax - hidden on small mobile */}
      <div
        className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow hidden sm:block"
        style={{ transform: `translateY(${parallaxSlow}px)` }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-success/10 rounded-full blur-3xl animate-pulse-glow hidden sm:block"
        style={{
          animationDelay: "1.5s",
          transform: `translateY(${parallaxFast}px)`,
        }}
      />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left side - Copy */}
          <div className="text-center lg:text-left w-full">
            <div className="inline-flex items-center gap-2 bg-success/10 border border-success/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 animate-fade-in">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] sm:text-xs text-success font-medium">
                India's First Trade Creator Verification Platform
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight animate-slide-up">
              Stop following{" "}
              <span className="text-gradient-primary">blind tips.</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Follow verified{" "}
              <span className="text-gradient-primary">Trades.</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up stagger-2">
              Discover, compare and subscribe to India's top creators — with
              real accuracy tracking, SEBI verification badges, and community
              reviews.
            </p>

            {/* Login CTA */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0 mb-4 sm:mb-6 animate-slide-up stagger-3">
              <Button
                onClick={onLoginClick}
                variant="hero"
                className="h-11 sm:h-12 px-8 text-sm sm:text-base w-full sm:w-auto"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap lg:justify-start justify-center items-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border/50 mt-4 animate-slide-up stagger-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-success" />
                <span>Verified PnL</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-success" />
                <span>No Fake Screenshots</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-success" />
                <span>Clear Risk Mgmt</span>
              </div>
            </div>
          </div>

          {/* Right side - Mobile-friendly Performance Cards */}
          <div className="mt-12 lg:mt-0 w-full relative min-w-0 animate-fade-in stagger-5">
            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10"></div>

            <div
              className="
             flex flex-nowrap overflow-x-auto pb-12 gap-6 snap-x snap-mandatory 
             -mx-4 px-4 sm:-mx-6 sm:px-6 
             lg:block lg:relative lg:h-[500px] lg:overflow-visible lg:pb-0 lg:mx-0 lg:px-0
             scrollbar-hide
           "
            >
              {/* Card 1: Creator Profile */}
              <div
                className="
                w-[85vw] sm:w-[380px] flex-shrink-0 snap-center
                lg:absolute lg:w-72 lg:h-auto lg:top-0 lg:right-10 lg:z-20 
                lg:transition-transform lg:duration-500 lg:hover:-translate-y-2
             "
              >
                <div className="bg-card/90 backdrop-blur-md rounded-xl shadow-card border border-border p-5 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <User
                      size={16}
                      className="w-12 h-12 rounded-full border-2 border-muted p-2"
                    />
                    <div>
                      <h4 className="font-bold text-foreground">Arjun V.</h4>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-success/10 text-success border border-success/20">
                        SEBI Registered
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted/50 p-2 rounded">
                      <p className="text-xs text-muted-foreground">Hit Rate</p>
                      <p className="text-lg font-mono font-bold text-foreground">
                        68%
                      </p>
                    </div>
                    <div className="bg-muted/50 p-2 rounded">
                      <p className="text-xs text-muted-foreground">
                        Net Return
                      </p>
                      <p className="text-lg font-mono font-bold text-success">
                        +24.5%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Equity Curve */}
              <div
                className="
                w-[85vw] sm:w-[380px] flex-shrink-0 snap-center
                lg:absolute lg:w-64 lg:h-auto lg:top-40 lg:left-0 lg:z-10
                lg:opacity-90 lg:scale-95
             "
              >
                <div className="bg-card rounded-xl shadow-elevated border border-border p-4 h-full">
                  <div className="flex justify-between mb-4">
                    <span className="text-xs text-muted-foreground">
                      Equity Curve (YTD)
                    </span>
                    <span className="text-xs text-success font-mono">
                      +12.4%
                    </span>
                  </div>
                  <div className="flex items-end gap-1 h-20">
                    {[40, 60, 45, 70, 65, 80, 75, 90, 100].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className="flex-1 bg-success/20 rounded-t-sm hover:bg-success transition-colors"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 2: Trade Idea Status */}
              <div
                className="
                w-[85vw] sm:w-[380px] flex-shrink-0 snap-center
                lg:absolute lg:w-80 lg:h-auto lg:bottom-10 lg:left-10 lg:z-30 
                lg:transition-transform lg:duration-500 lg:hover:translate-y-2
             "
              >
                <div className="bg-card/90 backdrop-blur-md rounded-xl shadow-card border border-border p-5 h-full">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-bold text-muted-foreground">
                      NIFTY 50 • FUT
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                      REACHED
                    </span>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <div>
                      <div className="text-xs text-muted-foreground uppercase">
                        Entry
                      </div>
                      <div className="font-mono font-medium text-foreground">
                        19,450.00
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground uppercase">
                        Objective
                      </div>
                      <div className="font-mono font-medium text-success">
                        19,600.00
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 w-full bg-muted h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-success w-full rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Dots Indicator */}
            <div className="flex lg:hidden justify-center gap-2 mt-4">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-muted"></div>
              <div className="w-2 h-2 rounded-full bg-muted"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

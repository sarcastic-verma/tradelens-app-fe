"use client";

export const Footer = () => {
  return (
    <footer className="py-16 md:py-20 px-4 border-t border-border/50">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg text-foreground">
              TradeLens
            </span>
          </div>
          <a
            href="https://launch.hypeliv.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-all hover:scale-105 mt-4 inline-block"
            style={{
              background: "linear-gradient(135deg, #ec4899, #a855f7, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
            }}
          >
            by Hypeliv ✨
          </a>
        </div>

        <div className="mt-12 pt-10 border-t border-border/50">
          <p className="text-sm text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
            TradeLens is a technology platform that helps users discover and
            evaluate independent trading creators. We do not provide investment
            advice, trading signals, or financial recommendations. Trading in
            financial markets involves substantial risk of loss and is not
            suitable for all investors. Past performance of any creator is not
            indicative of future results.
          </p>
          <p className="text-sm text-muted-foreground text-center mt-6">
            © {new Date().getFullYear()} TradeLens. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

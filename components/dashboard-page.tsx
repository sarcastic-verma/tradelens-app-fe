"use client";

import { DashboardNavbar } from "@/components/common/dashboard-navbar";
import { Card } from "@/components/ui/card";

export const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <DashboardNavbar />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10 pt-24 sm:pt-32">
        <div className="w-full max-w-6xl animate-fade-in">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dashboard Placeholder Cards */}
            <Card className="glass-card p-6 h-40 flex flex-col justify-center items-center hover:border-primary/50 transition-colors cursor-pointer group">
              <span className="text-3xl font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                --%
              </span>
              <span className="text-sm text-muted-foreground mt-2">
                Win Rate
              </span>
            </Card>
            <Card className="glass-card p-6 h-40 flex flex-col justify-center items-center hover:border-primary/50 transition-colors cursor-pointer group">
              <span className="text-3xl font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                0
              </span>
              <span className="text-sm text-muted-foreground mt-2">
                Active Trades
              </span>
            </Card>
            <Card className="glass-card p-6 h-40 flex flex-col justify-center items-center hover:border-primary/50 transition-colors cursor-pointer group">
              <span className="text-3xl font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                --
              </span>
              <span className="text-sm text-muted-foreground mt-2">
                Market Sentiment
              </span>
            </Card>
          </div>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Select a creator to view detailed analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

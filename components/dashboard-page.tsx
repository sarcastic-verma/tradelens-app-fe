"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card } from "@/components/ui/card";

export const DashboardPage = () => {
  return (
    <DashboardLayout title="Dashboard" maxWidth="6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dashboard Placeholder Cards */}
        <Card className="glass-card p-6 h-40 flex flex-col justify-center items-center hover:border-primary/50 transition-colors cursor-pointer group">
          <span className="text-3xl font-mono font-bold text-foreground group-hover:text-primary transition-colors">
            --%
          </span>
          <span className="text-sm text-muted-foreground mt-2">Win Rate</span>
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
    </DashboardLayout>
  );
};

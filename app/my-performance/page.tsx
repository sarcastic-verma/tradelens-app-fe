"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function MyPerformancePage() {
  return (
    <DashboardLayout
      title="My Performance"
      description="Track your PnL, hit rate, and drawdown across all subscriptions."
      maxWidth="6xl"
    >
      <div className="text-muted-foreground">
        {/* Performance charts and stats will go here */}
        <p>Performance tracking coming soon...</p>
      </div>
    </DashboardLayout>
  );
}

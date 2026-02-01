"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function CreatorDashboardPage() {
  return (
    <DashboardLayout
      title="Creator Dashboard"
      description="Track your hit rate, PnL, member retention, and earnings."
      maxWidth="6xl"
    >
      <div className="text-muted-foreground">
        {/* Performance metrics and charts will go here */}
        <p>Creator dashboard coming soon...</p>
      </div>
    </DashboardLayout>
  );
}

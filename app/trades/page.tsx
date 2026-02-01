"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function TradesPage() {
  return (
    <DashboardLayout
      title="Trade Feed"
      description="View trade ideas from creators you're subscribed to."
      maxWidth="4xl"
    >
      <div className="text-muted-foreground">
        {/* Trade feed will go here */}
        <p>Trade feed coming soon...</p>
      </div>
    </DashboardLayout>
  );
}

"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function CreatorTradesPage() {
  return (
    <DashboardLayout
      title="My Trade Ideas"
      description="Publish and manage your trade ideas."
      maxWidth="4xl"
    >
      <div className="text-muted-foreground">
        {/* Trade idea form and list will go here */}
        <p>Trade management coming soon...</p>
      </div>
    </DashboardLayout>
  );
}

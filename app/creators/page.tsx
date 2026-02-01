"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function CreatorsPage() {
  return (
    <DashboardLayout
      title="Discover Creators"
      description="Search and filter trading creators by performance, instruments, and more."
      maxWidth="6xl"
    >
      <div className="text-muted-foreground">
        {/* Creator discovery grid will go here */}
        <p>Creator discovery coming soon...</p>
      </div>
    </DashboardLayout>
  );
}

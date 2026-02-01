"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function AdminPage() {
  return (
    <DashboardLayout
      title="Admin Panel"
      description="Manage creators, verify SEBI registrations, and handle disputes."
      maxWidth="7xl"
    >
      <div className="text-muted-foreground">
        {/* Admin controls and tables will go here */}
        <p>Admin panel coming soon...</p>
      </div>
    </DashboardLayout>
  );
}

"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function CreatorOnboardingPage() {
  return (
    <DashboardLayout
      title="Become a Creator"
      description="Complete your KYC, link your bank account, and optionally verify SEBI registration."
      maxWidth="2xl"
    >
      <div className="text-muted-foreground">
        {/* Onboarding steps will go here */}
        <p>Creator onboarding coming soon...</p>
      </div>
    </DashboardLayout>
  );
}

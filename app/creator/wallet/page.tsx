"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function CreatorWalletPage() {
  return (
    <DashboardLayout
      title="Wallet"
      description="View your earnings, pending balance, and request withdrawals."
      maxWidth="4xl"
    >
      <div className="text-muted-foreground">
        {/* Wallet balances and payout history will go here */}
        <p>Creator wallet coming soon...</p>
      </div>
    </DashboardLayout>
  );
}

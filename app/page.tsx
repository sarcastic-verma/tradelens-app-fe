"use client";

import { useAuthContext } from "@/state/context/auth.context";
import { LandingPage } from "@/components/landing-page";
import { DashboardPage } from "@/components/dashboard-page";

export default function Home() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return null;
  }

  return user ? <DashboardPage /> : <LandingPage />;
}

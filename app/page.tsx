"use client";

import { useAuthContext } from "@/state/context/auth.context";
import { LandingPage } from "@/components/landing-page";
import { DashboardPage } from "@/components/dashboard-page";

import { Loading } from "@/components/common/loading";

export default function Home() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <Loading />;
  }

  return user ? <DashboardPage /> : <LandingPage />;
}

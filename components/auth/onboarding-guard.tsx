"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "@/state/context/auth.context";

export const OnboardingGuard = () => {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading || !user) return;

    // If user has a name, and is trying to access onboarding, redirect them to home
    if (user.name && pathname === "/onboarding") {
      router.replace("/");
      return;
    }

    // If user has NO name
    if (!user.name) {
      // Check if they are already on the onboarding page
      if (pathname === "/onboarding") {
        return;
      }

      // Check if they skipped onboarding in this session
      const skipped = sessionStorage.getItem("onboarding_skipped");
      if (!skipped) {
        router.replace("/onboarding");
      }
    }
  }, [user, loading, pathname, router]);

  return null;
};

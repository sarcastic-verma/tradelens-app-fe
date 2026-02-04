"use client";

import React from "react";

import { AuthContextProvider } from "@/state/context/auth.context";
import { LoadingContextProvider } from "@/state/context/loading.context";
import { AlertContextProvider } from "@/state/context/alert.context";
import { ThemeProvider } from "@/state/context/theme.context";
import { Alert } from "@/components/common/alert";
import { OnboardingGuard } from "@/components/auth/onboarding-guard";
import { Toaster } from "@/components/ui/toaster";

interface ProvidersProps {
  children: React.ReactNode;
  initialTheme?: "dark" | "light"; // Pass initial theme from server
}

export function Providers({ children, initialTheme = "dark" }: ProvidersProps) {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <LoadingContextProvider>
        <AlertContextProvider>
          <AuthContextProvider>
            <Alert />
            <OnboardingGuard />
            {children}
            <Toaster />
          </AuthContextProvider>
        </AlertContextProvider>
      </LoadingContextProvider>
    </ThemeProvider>
  );
}

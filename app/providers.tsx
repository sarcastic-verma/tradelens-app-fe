"use client";

import React from "react";

import { AuthContextProvider } from "@/state/context/auth.context";
import { LoadingContextProvider } from "@/state/context/loading.context";
import { AlertContextProvider } from "@/state/context/alert.context";
import { Alert } from "@/components/common/alert";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <LoadingContextProvider>
      <AlertContextProvider>
        <AuthContextProvider>
          <Alert />
          {children}
        </AuthContextProvider>
      </AlertContextProvider>
    </LoadingContextProvider>
  );
}

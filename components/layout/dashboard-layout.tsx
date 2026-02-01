"use client";

import React from "react";
import { DashboardNavbar } from "@/components/common/dashboard-navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  maxWidth?: "2xl" | "4xl" | "6xl" | "7xl" | "full";
}

export const DashboardLayout = ({
  children,
  title,
  description,
  maxWidth = "4xl",
}: DashboardLayoutProps) => {
  const maxWidthClass = {
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  }[maxWidth];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Standard Orbs - Page Specific */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-success/5 rounded-full blur-3xl pointer-events-none" />

      {/* Navbar */}
      <DashboardNavbar />

      {/* Main Content */}
      <main
        className={`container ${maxWidthClass} mx-auto pt-32 px-4 pb-20 relative z-10`}
      >
        {(title || description) && (
          <div className="mb-10 animate-fade-in">
            {title && (
              <h1 className="text-4xl font-bold mb-2 tracking-tight">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-muted-foreground text-lg">{description}</p>
            )}
          </div>
        )}

        <div className="animate-fade-in">{children}</div>
      </main>
    </div>
  );
};

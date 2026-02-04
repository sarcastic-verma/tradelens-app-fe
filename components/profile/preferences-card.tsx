"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function PreferencesCard() {
  return (
    <Card className="glass-card hover:bg-card/90 transition-colors shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Preferences</CardTitle>
        <CardDescription>Customize your experience</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/40">
          <div className="space-y-0.5">
            <div className="text-sm font-medium">Appearance</div>
            <div className="text-xs text-muted-foreground">Toggle theme</div>
          </div>
          <ThemeToggle />
        </div>
      </CardContent>
    </Card>
  );
}

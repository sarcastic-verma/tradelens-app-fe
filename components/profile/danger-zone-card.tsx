"use client";

import { LogOut } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DangerZoneCardProps {
  onLogout: () => void;
}

export function DangerZoneCard({ onLogout }: DangerZoneCardProps) {
  return (
    <Card className="glass-card border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition-colors shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
        <CardDescription>Account management</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="outline"
          className="w-full border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}

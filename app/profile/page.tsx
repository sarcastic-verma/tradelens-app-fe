"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthContext } from "@/state/context/auth.context";
import { DashboardNavbar } from "@/components/common/dashboard-navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LogOut } from "lucide-react";
import { BackendUser } from "@/types";

interface ProfileFormProps {
  user: BackendUser;
  logout: () => void;
}

function ProfileForm({ user, logout }: ProfileFormProps) {
  const router = useRouter();
  // Initialize state with user data directly - safest since component only mounts when user exists
  const [name, setName] = useState(user.name || "");

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Manage your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              {user.photo ? (
                <Image
                  src={user.photo}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-primary/20"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-2xl font-bold border-2 border-primary/20">
                  {(user.name || user.email || "U")[0].toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex-1 w-full space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Display Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="bg-background/50"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email Address
                </label>
                <Input
                  value={user.email || ""}
                  disabled
                  className="bg-muted/50 text-muted-foreground"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="default" className="w-full sm:w-auto">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preferences Card */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Customize your application experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 border border-border/50">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Appearance</div>
              <div className="text-xs text-muted-foreground">
                Toggle between light and dark themes
              </div>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="glass-card border-destructive/20 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProfilePage() {
  const { user, loading, logout } = useAuthContext();
  const router = useRouter();

  // Protect Route
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null; // Layout loading state handles this generally
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 hero-glow opacity-10 pointer-events-none" />

      <DashboardNavbar />

      <main className="container max-w-2xl mx-auto pt-24 px-4 pb-12 relative z-10">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        <ProfileForm user={user} logout={logout} />
      </main>
    </div>
  );
}

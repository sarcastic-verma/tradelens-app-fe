"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthContext } from "@/state/context/auth.context";
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
import { Loading } from "@/components/common/loading";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

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
    <div className="space-y-8 animate-fade-in">
      {/* User Profile Card */}
      <Card className="glass-card overflow-hidden shadow-elevated">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <CardHeader className="relative z-10 border-b border-border/40 pb-6">
          <CardTitle className="text-2xl font-semibold">
            Profile Information
          </CardTitle>
          <CardDescription>Manage your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="relative group shrink-0 mx-auto md:mx-0">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary to-blue-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
              {user.photo ? (
                <Image
                  src={user.photo}
                  alt="Profile"
                  width={100}
                  height={100}
                  className="relative rounded-full border-2 border-background shadow-lg"
                />
              ) : (
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-3xl font-bold border-2 border-background shadow-lg">
                  {(user.name || user.email || "U")[0].toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex-1 w-full space-y-6">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Display Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="bg-secondary/30 border-border/50 focus:border-primary/50 focus:ring-primary/20 h-11"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Email Address
                </label>
                <Input
                  value={user.email || ""}
                  disabled
                  className="bg-muted/50 text-muted-foreground border-transparent h-11"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              variant="default"
              className="w-full sm:w-auto shadow-glow-primary"
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Preferences Card */}
        <Card className="glass-card hover:bg-card/90 transition-colors shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Preferences</CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/40">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Appearance</div>
                <div className="text-xs text-muted-foreground">
                  Toggle theme
                </div>
              </div>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="glass-card border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition-colors shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-destructive">
              Danger Zone
            </CardTitle>
            <CardDescription>Account management</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
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
    return <Loading />;
  }

  return (
    <DashboardLayout
      title="Settings"
      description="Manage your account and preferences."
      maxWidth="4xl"
    >
      <ProfileForm user={user} logout={logout} />
    </DashboardLayout>
  );
}

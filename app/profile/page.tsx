"use client";

import { useEffect, useState, useRef } from "react";
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
import { LogOut, Upload, Loader2 } from "lucide-react";
import { BackendUser } from "@/types";
import { Loading } from "@/components/common/loading";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { UserRepository } from "@/repositories/users/user.repository";

interface ProfileFormProps {
  user: BackendUser;
  logout: () => void;
  setUser: (user: BackendUser | null) => void;
}

function ProfileForm({ user, logout, setUser }: ProfileFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state if user prop updates (e.g. initial load or external update)
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicFile(file);
      const objectUrl = URL.createObjectURL(file);
      setProfilePicPreview(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      let finalProfilePic = user.profilePic;

      // 1. Upload Image to S3 if selected
      if (profilePicFile) {
        const { data: presigned } = await UserRepository.getPresignedUrl(
          profilePicFile.type,
        );

        await fetch(presigned.url, {
          method: "PUT",
          body: profilePicFile,
          headers: {
            "Content-Type": profilePicFile.type,
          },
        });

        // Construct public URL using the key
        finalProfilePic = `https://tradelens-s3.s3.ap-south-1.amazonaws.com/${presigned.key}`;
      }

      // 2. Update User
      const { data: updatedUser } = await UserRepository.updateMe({
        name,
        phone,
        profilePic: finalProfilePic,
      });

      setUser(updatedUser);
      // Clean up preview
      if (profilePicPreview) {
        URL.revokeObjectURL(profilePicPreview);
        setProfilePicPreview(null);
        setProfilePicFile(null);
      }

      // Correct way to show success? Maybe a toast later.
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-8">
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
              {/* Profile Picture Section */}
              <div className="relative group shrink-0 mx-auto md:mx-0">
                <div className="absolute -inset-1 bg-gradient-to-br from-primary to-blue-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
                <div
                  className="relative w-28 h-28 rounded-full bg-secondary/30 border-2 border-dashed border-border flex items-center justify-center cursor-pointer overflow-hidden group hover:border-primary transition-all duration-300 shadow-lg"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {profilePicPreview || user.profilePic ? (
                    <Image
                      src={profilePicPreview || user.profilePic || ""}
                      alt="Profile"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-blue-600 text-white text-3xl font-bold">
                      {(user.name || user.email || "U")[0].toUpperCase()}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <Upload className="w-8 h-8 text-white drop-shadow-md" />
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
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
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9123456789"
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
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto shadow-glow-primary"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

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
  const { user, loading, logout, setUser } = useAuthContext();
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
      <ProfileForm user={user} logout={logout} setUser={setUser} />
    </DashboardLayout>
  );
}

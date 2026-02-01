"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/state/context/auth.context";
import { UserRepository } from "@/repositories/users/user.repository";
import { Upload, Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function OnboardingPage() {
  const { user, loading, setUser } = useAuthContext();
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && user) {
      if (user.name) {
        // User already has a name, redirect to home
        router.replace("/");
        return;
      }
      // Prefill if available
      if (user.phone) setPhone(user.phone);
    }
  }, [user, loading, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicFile(file);
      const objectUrl = URL.createObjectURL(file);
      setProfilePicPreview(objectUrl);
    }
  };

  const handleSkip = () => {
    sessionStorage.setItem("onboarding_skipped", "true");
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!name.trim()) return;

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

        // Construct the URL using the returned key
        // Assuming public bucket or CDN.
        finalProfilePic = `https://tradelens-s3.s3.ap-south-1.amazonaws.com/${presigned.key}`;
      }

      // 2. Update User
      const { data: updatedUser } = await UserRepository.updateMe({
        name,
        phone,
        profilePic: finalProfilePic,
      });

      setUser(updatedUser);
      router.push("/");
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Orbs matching DashboardLayout */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-float" />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 bg-success/5 rounded-full blur-3xl pointer-events-none animate-float"
        style={{ animationDelay: "2s" }}
      />

      <Card className="max-w-md w-full glass-card animate-fade-in shadow-elevated border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

        <CardHeader className="text-center relative z-10 space-y-2 pb-6">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Welcome to <span className="text-gradient-primary">TradeLens</span>
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Let&apos;s customize your profile to get started.
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center gap-4">
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
                  <Camera className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                )}

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
              <p className="text-xs font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                Tap to upload photo
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">
                  Full Name <span className="text-danger">*</span>
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="bg-secondary/30 border-border/50 focus:border-primary/50 focus:ring-primary/20 h-12 text-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="bg-secondary/30 border-border/50 focus:border-primary/50 focus:ring-primary/20 h-12 text-lg"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 space-y-3">
              <Button
                type="submit"
                disabled={isSubmitting || !name.trim()}
                className="w-full h-12 text-base font-semibold shadow-glow-primary transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  "Save & Continue"
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={handleSkip}
                className="w-full text-muted-foreground hover:text-foreground"
              >
                Skip for now
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

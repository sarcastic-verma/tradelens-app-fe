"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Upload, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BackendUser } from "@/types";
import { UserRepository } from "@/repositories/users/user.repository";

interface UserProfileCardProps {
  user: BackendUser;
  setUser: (user: BackendUser | null) => void;
}

export function UserProfileCard({ user, setUser }: UserProfileCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

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
    setIsSubmitting(true);
    try {
      let finalProfilePic = user.profilePic;

      if (profilePicFile) {
        const { data: presigned } = await UserRepository.getPresignedUrl(
          profilePicFile.type,
        );
        await fetch(presigned.url, {
          method: "PUT",
          body: profilePicFile,
          headers: { "Content-Type": profilePicFile.type },
        });
        finalProfilePic = `https://tradelens-s3.s3.ap-south-1.amazonaws.com/${presigned.key}`;
      }

      const { data: updatedUser } = await UserRepository.updateMe({
        name,
        phone,
        profilePic: finalProfilePic,
      });

      setUser(updatedUser);
      if (profilePicPreview) {
        URL.revokeObjectURL(profilePicPreview);
        setProfilePicPreview(null);
        setProfilePicFile(null);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass-card overflow-hidden shadow-elevated">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      <CardHeader className="relative z-10 border-b border-border/40 pb-6">
        <CardTitle className="text-2xl font-semibold">
          Profile Information
        </CardTitle>
        <CardDescription>Manage your personal details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 pt-8 relative z-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row items-start gap-8">
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
        </form>
      </CardContent>
    </Card>
  );
}

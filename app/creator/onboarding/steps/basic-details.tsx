"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { CreatorOnboardingData } from "@/hooks/use-creator-onboarding";
import { UserRepository } from "@/repositories/users/user.repository";

interface BasicDetailsProps {
  data: CreatorOnboardingData;
  updateData: (updates: Partial<CreatorOnboardingData>) => void;
  onNext: () => void;
}

export function BasicDetails({ data, updateData, onNext }: BasicDetailsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { data: presigned } = await UserRepository.getPresignedUrl(
        file.type,
      );

      await fetch(presigned.url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      const publicUrl = `https://tradelens-s3.s3.ap-south-1.amazonaws.com/${presigned.key}`;
      updateData({ photoUrl: publicUrl });
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  const isValid =
    data.displayName?.trim().length > 0 && data.bio?.trim().length > 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Tell us about yourself</h2>
        <p className="text-muted-foreground">
          This is how you'll appear to your followers.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="relative w-32 h-32 rounded-full border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary transition-colors overflow-hidden group"
            onClick={() => fileInputRef.current?.click()}
          >
            {data.photoUrl ? (
              <Image
                src={data.photoUrl}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Upload className="w-8 h-8" />
                <span className="text-xs">Upload Photo</span>
              </div>
            )}

            {isUploading && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Display Name <span className="text-destructive">*</span>
          </label>
          <Input
            value={data.displayName || ""}
            onChange={(e) => updateData({ displayName: e.target.value })}
            placeholder="e.g. Bullish Trader"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Bio <span className="text-destructive">*</span>
          </label>
          <Textarea
            value={data.bio || ""}
            onChange={(e) => updateData({ bio: e.target.value })}
            placeholder="Tell us about your trading style and experience..."
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={!isValid}
          className="w-full sm:w-auto"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}

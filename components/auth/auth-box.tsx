"use client";

import { useRouter } from "next/navigation";
import { SocialButton } from "@/components/auth/social-button";

export const AuthBox = ({ onSuccess }: { onSuccess?: () => void }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto py-8 px-4 text-center">
      <div className="flex flex-col items-center gap-1 mb-8">
        <h3 className="text-xl md:text-2xl font-light text-muted-foreground">
          Continue to
        </h3>
        <span
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent cursor-pointer tracking-tight"
          onClick={() => router.push("/")}
        >
          TradeLens
        </span>
      </div>

      <p className="text-base text-muted-foreground mb-8">
        Let&apos;s make trading{" "}
        <span className="text-foreground font-medium">trustable</span> again.
      </p>

      <div className="w-full space-y-4">
        <SocialButton authType="Google" onSuccess={onSuccess} />
        <SocialButton authType="Apple" onSuccess={onSuccess} />
      </div>
    </div>
  );
};

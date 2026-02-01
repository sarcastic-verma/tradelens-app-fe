"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { appleAuth, googleAuth } from "@/firebase/auth/social-auth";
import { useAuthContext } from "@/state/context/auth.context";
import { useLoading } from "@/state/context/loading.context";
import AppleLogo from "@/public/icons/apple-logo.svg";
import GoogleLogo from "@/public/icons/google-logo.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const SocialButton = ({
  authType,
  onSuccess,
}: {
  authType: "Google" | "Apple";
  onSuccess?: () => void;
}) => {
  const { setUser, firebaseUser } = useAuthContext();
  const { setLoading } = useLoading();
  const router = useRouter();

  const authFxn = authType === "Google" ? googleAuth : appleAuth;

  const authLogo = authType === "Google" ? GoogleLogo : AppleLogo;

  const handleAuth = async () => {
    const exists = await authFxn(firebaseUser, router, setUser, setLoading);

    if (onSuccess) onSuccess();

    if (!exists) {
      router.push("/onboarding");
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleAuth}
      className={cn(
        "w-full flex items-center justify-center gap-3 py-6 text-base font-medium transition-all duration-300 group",
        authType === "Apple"
          ? "border-black/20 hover:bg-muted/50 dark:bg-white/90 dark:text-black dark:hover:bg-white dark:border-transparent"
          : "border-border/60 hover:bg-muted/50",
      )}
    >
      <Image
        alt={`${authType} logo`}
        height={20}
        width={20}
        priority
        className="group-hover:scale-110 transition-transform duration-300"
        src={authLogo}
      />
      <span>Continue with {authType}</span>
    </Button>
  );
};

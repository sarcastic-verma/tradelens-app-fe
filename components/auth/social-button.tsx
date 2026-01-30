"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { appleAuth, googleAuth } from "@/firebase/auth/social-auth";
import { useAuthContext } from "@/state/context/auth.context";
import { useLoading } from "@/state/context/loading.context";
import AppleLogo from "@/public/icons/apple-logo.svg";
import GoogleLogo from "@/public/icons/google-logo.svg";

export const SocialButton = ({
  authType,
}: {
  authType: "Google" | "Apple";
}) => {
  const { setUser, firebaseUser } = useAuthContext();
  const { setLoading } = useLoading();
  const router = useRouter();

  const authFxn = authType === "Google" ? googleAuth : appleAuth;

  const authLogo = authType === "Google" ? GoogleLogo : AppleLogo;

  return (
    <button
      type="button"
      onClick={async () => {
        console.log("clicked");
        const exists = await authFxn(firebaseUser, router, setUser, setLoading);

        console.log("exists", exists);
        // router.push(exists ? "/" : "/onboarding");
      }}
      className="flex items-center justify-center w-[70%] p-2 bg-white rounded-3xl focus:outline-none hover:ring-1 hover:ring-gray-700"
    >
      <Image
        alt=""
        height={25}
        priority
        className="mr-1 sm:mr-3"
        src={authLogo}
      />
      <div className="text-black text-sm"> Continue with {authType}</div>
    </button>
  );
};

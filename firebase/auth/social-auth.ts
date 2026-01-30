import React from "react";
import { FirebaseError } from "firebase/app";
import {
  AuthProvider,
  OAuthProvider,
  signInWithCredential,
  signInWithPopup,
  User,
} from "firebase/auth";
import { setIdToken } from "@/firebase/auth/common";
import { appleProvider, firebaseAuth, googleProvider } from "@/firebase/config";
import { BackendUser } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UserRepository } from "@/repositories/users/user.repository";

const baseSocialAuth = async (
  user: User | null,
  router: AppRouterInstance,
  provider: AuthProvider,
  setLoggedInUser: React.Dispatch<React.SetStateAction<BackendUser | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const authResult = await signInWithPopup(firebaseAuth, provider);
    setLoading(true);
    const temporaryToken = await authResult.user.getIdToken();

    const response = await UserRepository.doSocialAuth(temporaryToken);

    const data = response.data;
    await setIdToken(authResult.user);

    setLoggedInUser(data.user);
    setLoading(false);

    return data.exists;
  } catch (e) {
    console.log(e);
    try {
      if (
        (e as FirebaseError)
          .toString()
          .includes("auth/credential-already-in-use")
      ) {
        const credential = OAuthProvider.credentialFromError(
          e as FirebaseError
        );

        if (credential) {
          const authResult = await signInWithCredential(
            firebaseAuth,
            credential
          );

          setLoading(true);
          const temporaryToken = await authResult.user.getIdToken();

          const response = await UserRepository.doSocialAuth(temporaryToken);

          const data = response.data;
          await setIdToken(authResult.user);

          setLoggedInUser(data.user);
          setLoading(false);

          return data.exists;
        }
      }
    } catch {
      setLoading(false);
      router.replace("/");
    }
  }
};

export const googleAuth = async (
  user: User | null,
  router: AppRouterInstance,
  setLoggedInUser: React.Dispatch<React.SetStateAction<BackendUser | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<boolean> => {
  const resp = await baseSocialAuth(
    user,
    router,
    googleProvider,
    setLoggedInUser,
    setLoading
  );
  return !!resp;
};

export const appleAuth = async (
  user: User | null,
  router: AppRouterInstance,
  setLoggedInUser: React.Dispatch<React.SetStateAction<BackendUser | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const resp = await baseSocialAuth(
    user,
    router,
    appleProvider,
    setLoggedInUser,
    setLoading
  );
  return !!resp;
};

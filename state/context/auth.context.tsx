"use client";

import React, { useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

import { Loading } from "@/components/common/loading";
import { firebaseApp } from "@/firebase/config";
import { BackendUser, Creator } from "@/types";
import { UserRepository } from "@/repositories/users/user.repository";
import { CreatorRepository } from "@/repositories/creators/creator.repository";
import { logout as firebaseLogout } from "@/firebase/auth/common";

const auth = getAuth(firebaseApp);

export const AuthContext = React.createContext<{
  firebaseUser: User | null;
  user: BackendUser | null;
  creator: Creator | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<BackendUser | null>>;
  setCreator: React.Dispatch<React.SetStateAction<Creator | null>>; // New
  logout: () => Promise<void>;
}>({
  firebaseUser: null,
  loading: false,
  user: null,
  creator: null,
  setUser: () => {},
  setCreator: () => {}, // New
  logout: async () => {}, // New
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [user, setUser] = useState<BackendUser | null>(null);
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setFirebaseUser(firebaseUser);
        try {
          const userRes = await UserRepository.getMe();
          const backendUser = userRes.data;
          setUser(backendUser);

          // Fetch Creator Profile if applicable
          if (backendUser.role === "CREATOR") {
            try {
              const creatorRes = await CreatorRepository.getMyProfile();
              setCreator(creatorRes.data);
            } catch (err) {
              console.error("Failed to fetch creator profile", err);
            }
          }
        } catch (error) {
          console.error("Failed to fetch user profile", error);
        } finally {
          setLoading(false);
        }
      } else {
        setFirebaseUser(null);
        setUser(null);
        setCreator(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    setLoading(true);
    await firebaseLogout(setUser);
    setFirebaseUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        loading,
        user,
        creator,
        setUser,
        setCreator, // New
        logout,
      }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

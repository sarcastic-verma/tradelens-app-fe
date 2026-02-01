"use client";

import React, { useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

import { Loading } from "@/components/common/loading";
import { firebaseApp } from "@/firebase/config";
import { BackendUser } from "@/types";
import { UserRepository } from "@/repositories/users/user.repository";
import { logout as firebaseLogout } from "@/firebase/auth/common";

const auth = getAuth(firebaseApp);

export const AuthContext = React.createContext<{
  firebaseUser: User | null;
  user: BackendUser | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<BackendUser | null>>;
  logout: () => Promise<void>;
}>({
  firebaseUser: null,
  loading: false,
  user: null,
  setUser: () => {},
  logout: async () => {},
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [user, setUser] = useState<BackendUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setFirebaseUser(firebaseUser);
        try {
          const user = await UserRepository.getMe();
          setUser(user.data);
        } catch (error) {
          console.error("Failed to fetch user profile", error);
        } finally {
          setLoading(false);
        }
      } else {
        setFirebaseUser(null);
        setUser(null);
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
        setUser,
        logout,
      }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

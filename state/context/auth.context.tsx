"use client";

import React, { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { Loading } from "@/components/common/loading";
import { firebaseApp } from "@/firebase/config";
import { BackendUser } from "@/types";
import { UserRepository } from "@/repositories/users/user.repository";

const auth = getAuth(firebaseApp);

export const AuthContext = React.createContext<{
  firebaseUser: User | null;
  user: BackendUser | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<BackendUser | null>>;
}>({
  firebaseUser: null,
  loading: false,
  user: null,
  setUser: () => {},
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
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      if (user === null && !!firebaseUser) {
        const user = await UserRepository.getMe();
        setUser(user.data);
      }
    })();
  }, [firebaseUser, user]);

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        loading,
        user,
        setUser,
      }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

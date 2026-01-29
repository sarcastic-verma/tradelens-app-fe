'use client';

import React, { createContext, useState } from 'react';

const LoadingContext = createContext<{
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  loading: false,
  setLoading: () => {},
});

export const LoadingContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const value = { loading, setLoading };

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
};

export const useLoading = () => React.useContext(LoadingContext);

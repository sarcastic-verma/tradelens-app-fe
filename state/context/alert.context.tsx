'use client';

import React, { createContext, useState } from 'react';

type AlertFxnType = (params: { message: string; type: 'info' | 'success' | 'warning' | 'error' | 'none' }) => void;

const AlertContext = createContext<{
  customAlert: AlertFxnType;
  message: string;
  setType: React.Dispatch<React.SetStateAction<'info' | 'success' | 'warning' | 'error' | 'none'>>;
  type: 'info' | 'success' | 'warning' | 'error' | 'none';
}>({
  message: '',
  type: 'none',
  setType: () => {},
  customAlert: () => {},
});

export const AlertContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'info' | 'success' | 'warning' | 'error' | 'none'>('none');

  const showAlert = ({
    message: incomingMessage,
    type: incomingType,
  }: {
    message: string;
    type: 'info' | 'success' | 'warning' | 'error' | 'none';
  }) => {
    setMessage(incomingMessage);
    setType(incomingType);
  };

  return (
     
    <AlertContext.Provider value={{ customAlert: showAlert, message, type, setType }}>{children}</AlertContext.Provider>
  );
};

export const useAlert = () => React.useContext(AlertContext);

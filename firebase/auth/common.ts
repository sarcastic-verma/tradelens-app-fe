import { signOut, User } from 'firebase/auth';
import { firebaseAuth } from '../config';
import { BackendUser } from '@/types';

export const logout = async (setLoggedInUser: React.Dispatch<React.SetStateAction<BackendUser | null>>) => {
  await signOut(firebaseAuth);
  setLoggedInUser(null);
  localStorage.clear();
};

export const setIdToken = async (authUser: User, refresh?: boolean) => {
  const idToken = await authUser?.getIdToken(!!refresh);
  localStorage.setItem('idToken', idToken);
  return idToken;
};

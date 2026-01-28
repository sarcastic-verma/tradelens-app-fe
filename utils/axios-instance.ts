import axios from 'axios';

import { setIdToken } from '@/firebase/auth/common';
import { firebaseAuth } from '@/firebase/config';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_HOST,
});

axiosInstance.interceptors.request.use((config) => {
  const idToken = localStorage.getItem('idToken');

  if (idToken) config.headers.Authorization = `Bearer ${idToken}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (firebaseAuth.currentUser) {
        const token = await setIdToken(firebaseAuth.currentUser, true);
        originalRequest.headers.Authorization = `Bearer ${token}`;
      }

      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);

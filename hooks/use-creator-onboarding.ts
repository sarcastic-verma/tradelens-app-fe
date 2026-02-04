"use client";

import { useState, useEffect } from "react";
import { CreateCreatorDto } from "@/repositories/creators/creator.repository";
import { SetupPayoutDto } from "@/repositories/creators/creator.repository";

// Combined type for the full onboarding flow
export interface CreatorOnboardingData extends Partial<CreateCreatorDto> {
  // Payout Details (separate DTO but collected in flow)
  payout?: SetupPayoutDto;

  // UI State
  currentStep: number;
}

const STORAGE_KEY = "tradelens_creator_onboarding";

const INITIAL_DATA: CreatorOnboardingData = {
  currentStep: 0,
  instruments: [],
  strategies: [],
};

export const useCreatorOnboarding = () => {
  const [data, setData] = useState<CreatorOnboardingData>(INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  // We use useEffect to avoid hydration mismatches between server (default) and client (stored)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);       
        setData({ ...INITIAL_DATA, ...parsed });
      } catch (e) {
        console.error("Failed to parse onboarding data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, isLoaded]);

  const updateData = (updates: Partial<CreatorOnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    setData((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  const prevStep = () => {
    setData((prev) => ({
      ...prev,
      currentStep: Math.max(0, prev.currentStep - 1),
    }));
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(INITIAL_DATA);
  };

  return {
    data,
    updateData,
    nextStep,
    prevStep,
    reset,
    isLoaded,
  };
};

"use client";

import { useCreatorOnboarding } from "@/hooks/use-creator-onboarding";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StepIndicator } from "@/components/creator/onboarding/step-indicator";
import { BasicDetails } from "./steps/basic-details";
import { TradingProfile } from "./steps/trading-profile";
import { PayoutDetails } from "./steps/payout-details";
import { Regulatory } from "./steps/regulatory";
import { Review } from "./steps/review";
import { useState, useEffect } from "react";
import { CreatorRepository } from "@/repositories/creators/creator.repository";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/common/loading";
import { useAuthContext } from "@/state/context/auth.context";
import { UserRepository } from "@/repositories/users/user.repository";
import { Card } from "@/components/ui/card";
import { AxiosError } from "axios";
import { UserRole } from "@/types";

const STEPS = ["Basic", "Profile", "Payout", "Regulation", "Review"];

export default function CreatorOnboardingPage() {
  const { data, updateData, nextStep, prevStep, reset, isLoaded } =
    useCreatorOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { setUser, user } = useAuthContext();

  // Protect Route: Redirect if already a creator
  useEffect(() => {
    if (user?.role === UserRole.CREATOR) {
      router.replace("/creator/dashboard");
    }
  }, [user, router]);

  if (!isLoaded) return <Loading />;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    let errorCount = 0;

    try {
      // 1. Create Profile (Critical Step - Must Succeed)
      try {
        await CreatorRepository.createCreator({
          displayName: data.displayName!,
          bio: data.bio,
          photoUrl: data.photoUrl,
          instruments: data.instruments!,
          strategies: data.strategies!,
          riskProfile: data.riskProfile!,
          capitalReq: data.capitalReq!,
          sebiRegNo: data.sebiRegNo,
        });

        // REFETCH USER: Update local context with new role
        const me = await UserRepository.getMe();
        setUser(me.data);
      } catch (error: unknown) {
        toast({
          title: "Profile Creation Failed",
          description:
            (error as AxiosError<{ message: string }>)?.response?.data
              ?.message ||
            "Could not create creator profile. Please try again.",
          variant: "destructive",
        });
        return; // Stop if profile creation fails
      }

      // 2. Setup Payout (Non-blocking)
      if (data.payout) {
        try {
          await CreatorRepository.setupPayout(data.payout);
        } catch (error: unknown) {
          console.error("Payout setup failed", error);
          errorCount++;
          toast({
            title: "Payout Setup Failed",
            description:
              (error as AxiosError<{ message: string }>)?.response?.data
                ?.message ||
              "Could not save bank details. You can add them later.",
            variant: "destructive",
          });
        }
      }

      // 3. Handle SEBI (No modal, just warn if pending)
      // We will handle verification in Settings page

      // Check for partial failures
      if (errorCount > 0) {
        toast({
          title: "Setup Incomplete",
          description:
            "Profile created, but payment setup failed. Please complete it in settings.",
          variant: "destructive", // Using destructive as warning replacement
        });
      } else {
        toast({
          title: "Profile Created",
          description:
            "Please complete SEBI, if applicable, verification in settings.",
        });
      }

      reset();
      router.push("/creator/dashboard");
    } catch (error: unknown) {
      // Catch-all for unexpected errors not handled above
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStep = data.currentStep;

  return (
    <DashboardLayout
      title="Become a Creator"
      description="Setup your professional profile."
      maxWidth="2xl"
    >
      <Card className="p-6 md:p-8 glass-card border-none shadow-xl min-h-[500px]">
        <StepIndicator currentStep={currentStep} steps={STEPS} />

        <div className="mt-8">
          {currentStep === 0 && (
            <BasicDetails
              data={data}
              updateData={updateData}
              onNext={nextStep}
            />
          )}
          {currentStep === 1 && (
            <TradingProfile
              data={data}
              updateData={updateData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 2 && (
            <PayoutDetails
              data={data}
              updateData={updateData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 3 && (
            <Regulatory
              data={data}
              updateData={updateData}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 4 && (
            <Review
              data={data}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              onBack={prevStep}
            />
          )}
        </div>
      </Card>
    </DashboardLayout>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/state/context/auth.context";
import { Loading } from "@/components/common/loading";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SebiVerificationModal } from "@/components/creator/onboarding/sebi-verification-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  CreatorRepository,
  SetupPayoutDto,
} from "@/repositories/creators/creator.repository";
import { useToast } from "@/components/ui/use-toast";

// Modular Components
import { UserProfileCard } from "@/components/profile/user-profile-card";
import { SebiRegistrationCard } from "@/components/profile/sebi-registration-card";
import { CreatorActionCard } from "@/components/profile/creator-action-card";
import { PreferencesCard } from "@/components/profile/preferences-card";
import { DangerZoneCard } from "@/components/profile/danger-zone-card";
import { UpdateSebiModal } from "@/components/profile/update-sebi-modal";
import { PayoutDetailsModal } from "@/components/profile/payout-details-modal";

export default function ProfilePage() {
  const { user, creator, loading, logout, setUser, setCreator } =
    useAuthContext();
  const router = useRouter();
  const { toast } = useToast();

  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [showSebiModal, setShowSebiModal] = useState(false);
  const [showUpdateSebiModal, setShowUpdateSebiModal] = useState(false);

  // Protect Route
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handlePayoutUpdate = async (payoutData: SetupPayoutDto) => {
    try {
      await CreatorRepository.setupPayout(payoutData);
      toast({ title: "Success", description: "Payout details updated!" });
      setShowPayoutModal(false);
      // Refresh creator context
      const { data: updatedCreator } = await CreatorRepository.getMyProfile();
      setCreator(updatedCreator);
    } catch {
      toast({
        title: "Error",
        description: "Failed to update payout details.",
        variant: "destructive",
      });
    }
  };

  const handleSebiSuccess = async () => {
    toast({
      title: "Verified",
      description: "SEBI details verified successfully!",
    });
    setShowSebiModal(false);

    try {
      const { data: updatedCreator } = await CreatorRepository.getMyProfile();
      setCreator(updatedCreator);
    } catch {
      toast({
        title: "Error",
        description: "Failed to refresh creator profile after verification.",
        variant: "destructive",
      });
    }
  };

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <DashboardLayout
      title="Settings"
      description="Manage your account and preferences."
      maxWidth="4xl"
    >
      <div className="space-y-8 animate-fade-in">
        <div className="space-y-8">
          {/* Creator Action Items */}
          {creator && !creator.paymentAccountId && (
            <Alert
              variant="destructive"
              className="border-destructive/50 bg-destructive/10"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Action Required</AlertTitle>
              <AlertDescription className="flex items-center justify-between">
                <span>
                  Your payout details are missing. You won&apos;t be able to
                  receive subscriptions.
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-4 border-destructive/30 hover:bg-destructive/20"
                  onClick={() => setShowPayoutModal(true)}
                  type="button"
                >
                  Setup Now
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <CreatorActionCard user={user} />

          {creator && (
            <SebiRegistrationCard
              creator={creator}
              onEdit={() => setShowUpdateSebiModal(true)}
              onVerify={() => setShowSebiModal(true)}
            />
          )}

          <UserProfileCard user={user} setUser={setUser} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <PreferencesCard />
          <DangerZoneCard onLogout={handleLogout} />
        </div>

        <Dialog open={showPayoutModal} onOpenChange={setShowPayoutModal}>
          <DialogContent className="sm:max-w-xl h-[80vh] overflow-y-auto">
            <PayoutDetailsModal
              onSuccess={handlePayoutUpdate}
              onCancel={() => setShowPayoutModal(false)}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          open={showUpdateSebiModal}
          onOpenChange={setShowUpdateSebiModal}
        >
          <DialogContent className="sm:max-w-md">
            <UpdateSebiModal
              currentRegNo={creator?.sebiRegNo || ""}
              onSuccess={(newRegNo) => {
                toast({
                  title: "Updated",
                  description: "SEBI Registration Number updated.",
                });
                setShowUpdateSebiModal(false);
                if (creator) setCreator({ ...creator, sebiRegNo: newRegNo });
              }}
              onCancel={() => setShowUpdateSebiModal(false)}
            />
          </DialogContent>
        </Dialog>

        <SebiVerificationModal
          isOpen={showSebiModal}
          onSuccess={handleSebiSuccess}
          onSkip={() => setShowSebiModal(false)}
        />
      </div>
    </DashboardLayout>
  );
}

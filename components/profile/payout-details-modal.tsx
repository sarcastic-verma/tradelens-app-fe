"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SetupPayoutDto } from "@/repositories/creators/creator.repository";
import { CreatorOnboardingData } from "@/hooks/use-creator-onboarding";
import { PayoutDetails } from "@/app/creator/onboarding/steps/payout-details";

interface PayoutDetailsModalProps {
  onSuccess: (data: SetupPayoutDto) => void;
  onCancel: () => void;
}

export function PayoutDetailsModal({
  onSuccess,
  onCancel,
}: PayoutDetailsModalProps) {
  const [data, setData] = useState<Partial<CreatorOnboardingData>>({
    payout: {
      accountHolderName: "",
      accountNumber: "",
      ifsc: "",
    },
  });

  return (
    <div className="p-1">
      <h2 className="text-xl font-bold mb-4">Setup Payout Details</h2>
      <PayoutDetails
        data={data}
        updateData={(updates) => setData({ ...data, ...updates })}
        onNext={() => onSuccess(data.payout as SetupPayoutDto)}
        onBack={onCancel}
        isModal={true}
      />
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSuccess(data.payout as SetupPayoutDto)}>
          Save Details
        </Button>
      </div>
    </div>
  );
}

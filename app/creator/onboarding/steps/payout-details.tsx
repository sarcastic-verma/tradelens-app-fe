"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreatorOnboardingData } from "@/hooks/use-creator-onboarding";

export interface PayoutDetailsProps {
  data: Partial<CreatorOnboardingData>; // relaxed type
  updateData: (updates: Partial<CreatorOnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
  isModal?: boolean; // New prop to adjust UI
}

export function PayoutDetails({
  data,
  updateData,
  onNext,
  onBack,
  isModal = false,
}: PayoutDetailsProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Only allow numeric input for account number
    if (name === "accountNumber" && !/^\d*$/.test(value)) return;

    updateData({
      payout: {
        ...(data?.payout ?? {}),
        accountHolderName: data.payout?.accountHolderName || "",
        accountNumber: data.payout?.accountNumber || "",
        ifsc: data.payout?.ifsc || "",
        [name]: value,
      },
    });
  };

  const payout = data.payout || {
    accountHolderName: "",
    accountNumber: "",
    ifsc: "",
  };

  const isValid =
    payout.accountHolderName.length > 2 &&
    payout.accountNumber.length >= 9 &&
    payout.accountNumber.length <= 18 &&
    payout.ifsc.length === 11;

  return (
    <div className="space-y-6 animate-fade-in">
      {!isModal && (
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">Payout Details</h2>
          <p className="text-muted-foreground">
            Where should we send your earnings?
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>
            Account Holder Name <span className="text-destructive">*</span>
          </Label>
          <Input
            name="accountHolderName"
            value={payout.accountHolderName}
            onChange={handleChange}
            placeholder="As per bank records"
          />
        </div>

        <div className="space-y-2">
          <Label>
            Account Number <span className="text-destructive">*</span>
          </Label>
          <Input
            name="accountNumber"
            value={payout.accountNumber}
            onChange={handleChange}
            placeholder="9-18 digits"
            maxLength={18}
          />
        </div>

        <div className="space-y-2">
          <Label>
            IFSC Code <span className="text-destructive">*</span>
          </Label>
          <Input
            name="ifsc"
            value={payout.ifsc}
            onChange={handleChange}
            placeholder="ABCD0123456"
            maxLength={11}
          />
        </div>
      </div>

      {!isModal && (
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext} disabled={!isValid}>
            Next Step
          </Button>
        </div>
      )}
    </div>
  );
}

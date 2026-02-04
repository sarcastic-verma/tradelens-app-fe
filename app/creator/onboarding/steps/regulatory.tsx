"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CreatorOnboardingData } from "@/hooks/use-creator-onboarding";

interface RegulatoryProps {
  data: CreatorOnboardingData;
  updateData: (updates: Partial<CreatorOnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Regulatory({
  data,
  updateData,
  onNext,
  onBack,
}: RegulatoryProps) {
  const hasSebi = !!data.sebiRegNo || data.sebiRegNo === "";

  const toggleSebi = (checked: boolean) => {
    if (checked) {
      updateData({ sebiRegNo: "" });
    } else {
      updateData({ sebiRegNo: undefined });
    }
  };

  const isValid = !hasSebi || (data.sebiRegNo && data.sebiRegNo.length > 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Regulatory Info</h2>
        <p className="text-muted-foreground">Are you SEBI registered?</p>
      </div>

      <div className="p-6 border rounded-lg bg-card/50 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">I am SEBI Registered</Label>
            <p className="text-xs text-muted-foreground">
              Required for certain advisory services.
            </p>
          </div>
          <Switch checked={hasSebi} onCheckedChange={toggleSebi} />
        </div>

        {hasSebi && (
          <div className="space-y-2 animate-slide-down">
            <Label>SEBI Registration Number</Label>
            <Input
              value={data.sebiRegNo || ""}
              onChange={(e) =>
                updateData({ sebiRegNo: e.target.value.toUpperCase() })
              }
              placeholder="INA000000000"
            />
            <p className="text-xs text-muted-foreground">
              We will verify this with the official SEBI database.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!isValid}>
          Review
        </Button>
      </div>
    </div>
  );
}

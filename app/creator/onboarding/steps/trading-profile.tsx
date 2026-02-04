"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CreatorOnboardingData } from "@/hooks/use-creator-onboarding";
import {
  RiskProfileEnum,
  CapitalRequiredBucketEnum,
  InstrumentEnum,
  StrategyEnum,
} from "@/types/enums";

interface TradingProfileProps {
  data: CreatorOnboardingData;
  updateData: (updates: Partial<CreatorOnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function TradingProfile({
  data,
  updateData,
  onNext,
  onBack,
}: TradingProfileProps) {
  const toggleSelection = <T extends string>(
    current: T[] | undefined,
    item: T,
    field: keyof CreatorOnboardingData,
  ) => {
    const list = current || [];
    const updated = list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
    updateData({ [field]: updated });
  };

  const isValid =
    data.riskProfile &&
    data.capitalReq &&
    (data.instruments?.length || 0) > 0 &&
    (data.strategies?.length || 0) > 0;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Your Trading Profile</h2>
        <p className="text-muted-foreground">
          Help subscribers understand your expertise.
        </p>
      </div>

      {/* Risk Profile */}
      <div className="space-y-3">
        <Label>
          Risk Profile <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={data.riskProfile}
          onValueChange={(val) =>
            updateData({ riskProfile: val as RiskProfileEnum })
          }
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {Object.values(RiskProfileEnum).map((risk) => (
            <div key={risk}>
              <RadioGroupItem
                value={risk}
                id={`risk-${risk}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`risk-${risk}`}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
              >
                {risk}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Capital Requirement */}
      <div className="space-y-3">
        <Label>
          Min. Capital Required <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={data.capitalReq}
          onValueChange={(val) =>
            updateData({ capitalReq: val as CapitalRequiredBucketEnum })
          }
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {Object.values(CapitalRequiredBucketEnum).map((cap) => (
            <div key={cap}>
              <RadioGroupItem
                value={cap}
                id={`cap-${cap}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`cap-${cap}`}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
              >
                {cap}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Instruments */}
      <div className="space-y-3">
        <Label>
          Instruments Traded <span className="text-destructive">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-4">
          {Object.values(InstrumentEnum).map((inst) => (
            <div key={inst} className="flex items-center space-x-2">
              <Checkbox
                id={`inst-${inst}`}
                checked={data.instruments?.includes(inst)}
                onCheckedChange={() =>
                  toggleSelection(data.instruments, inst, "instruments")
                }
              />
              <Label
                htmlFor={`inst-${inst}`}
                className="text-sm font-normal cursor-pointer"
              >
                {inst.replace(/_/g, " ")}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Strategies */}
      <div className="space-y-3">
        <Label>
          Strategies Used <span className="text-destructive">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-4">
          {Object.values(StrategyEnum).map((strat) => (
            <div key={strat} className="flex items-center space-x-2">
              <Checkbox
                id={`strat-${strat}`}
                checked={data.strategies?.includes(strat)}
                onCheckedChange={() =>
                  toggleSelection(data.strategies, strat, "strategies")
                }
              />
              <Label
                htmlFor={`strat-${strat}`}
                className="text-sm font-normal cursor-pointer"
              >
                {strat.replace(/_/g, " ")}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!isValid}>
          Next Step
        </Button>
      </div>
    </div>
  );
}

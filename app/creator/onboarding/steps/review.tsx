"use client";

import { Button } from "@/components/ui/button";
import { CreatorOnboardingData } from "@/hooks/use-creator-onboarding";
import { Card } from "@/components/ui/card";
import { Check, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";

interface ReviewProps {
  data: CreatorOnboardingData;
  isSubmitting: boolean;
  onSubmit: () => void;
  onBack: () => void;
}

export function Review({ data, isSubmitting, onSubmit, onBack }: ReviewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Review Application</h2>
        <p className="text-muted-foreground">
          Please check your details before submitting.
        </p>
      </div>

      <div className="space-y-4">
        <Card className="p-4 space-y-4 bg-muted/20">
          <div className="flex items-center gap-4">
            {data.photoUrl && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden border">
                <Image
                  src={data.photoUrl}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="font-bold text-lg">{data.displayName}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {data.bio}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Risk Profile:</span>
              <p className="font-medium">{data.riskProfile}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Min Capital:</span>
              <p className="font-medium">{data.capitalReq}</p>
            </div>
          </div>
        </Card>

        {data.payout && (
          <Card className="p-4 space-y-2 bg-muted/20">
            <h4 className="font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" /> Payout Details
            </h4>
            <div className="text-sm grid grid-cols-2 gap-2">
              <div>
                <span className="text-muted-foreground">Account Name:</span>
                <p>{data.payout.accountHolderName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Account No:</span>
                <p>**** {data.payout.accountNumber.slice(-4)}</p>
              </div>
            </div>
          </Card>
        )}

        {data.sebiRegNo ? (
          <div className="flex items-center gap-2 p-3 bg-green-500/10 text-green-600 rounded-md text-sm">
            <Check className="w-5 h-5" />
            <span>SEBI Registered: {data.sebiRegNo}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 p-3 bg-yellow-500/10 text-yellow-600 rounded-md text-sm">
            <AlertCircle className="w-5 h-5" />
            <span>Not SEBI Registered</span>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            "Submit Application"
          )}
        </Button>
      </div>
    </div>
  );
}

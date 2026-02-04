"use client";

import { ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Creator, SebiStatusEnum } from "@/types";

interface SebiRegistrationCardProps {
  creator: Creator;
  onEdit: () => void;
  onVerify: () => void;
}

export function SebiRegistrationCard({
  creator,
  onEdit,
  onVerify,
}: SebiRegistrationCardProps) {
  return (
    <Card className="glass-card shadow-sm border-primary/20">
      <CardHeader className="pb-3 border-b border-border/40">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            SEBI Registration
          </CardTitle>
          <Badge
            variant={
              creator.sebiStatus === SebiStatusEnum.VERIFIED
                ? "default"
                : creator.sebiStatus === SebiStatusEnum.REJECTED
                  ? "destructive"
                  : "secondary"
            }
          >
            {creator.sebiStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-medium">Registration Number</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                {creator.sebiRegNo || "Not Provided"}
              </p>
              {creator.sebiStatus !== SebiStatusEnum.VERIFIED && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  type="button"
                  onClick={onEdit}
                >
                  <span className="sr-only">Edit</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-pencil"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </Button>
              )}
            </div>
          </div>
          {creator.sebiStatus !== SebiStatusEnum.VERIFIED && (
            <Button
              variant={
                creator.sebiStatus === SebiStatusEnum.REJECTED
                  ? "destructive"
                  : "default"
              }
              onClick={onVerify}
              type="button"
            >
              {creator.sebiStatus === SebiStatusEnum.REJECTED
                ? "Retry Verification"
                : !creator.sebiRegNo
                  ? "Add details"
                  : "Verify Now"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

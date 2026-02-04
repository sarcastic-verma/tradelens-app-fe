"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { CreatorRepository } from "@/repositories/creators/creator.repository";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface SebiVerificationModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onSkip: () => void;
}

export function SebiVerificationModal({
  isOpen,
  onSuccess,
  onSkip,
}: SebiVerificationModalProps) {
  const [step, setStep] = useState<"INIT" | "OTP">("INIT");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailHint, setEmailHint] = useState("");
  const { toast } = useToast();

  const handleInitiate = async () => {
    setLoading(true);
    try {
      const { data } = await CreatorRepository.initiateSebiVerification();
      setEmailHint(data.maskedEmail);
      setStep("OTP");
      toast({ title: "OTP Sent", description: `Check ${data.maskedEmail}` });
    } catch (error: any) {
      toast({
        title: "Failed",
        description:
          error.response?.data?.message || "Could not verify SEBI Reg No.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      await CreatorRepository.verifySebiOtp(otp);
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.response?.data?.message || "Invalid OTP",
        variant: "destructive",
      });
    } finally {
      setOtp("");
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onSkip()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify SEBI Registration</DialogTitle>
          <DialogDescription>
            {step === "INIT"
              ? "We found your SEBI registration. We need to verify ownership via OTP sent to your registered email."
              : `Enter the OTP sent to ${emailHint}`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          {step === "INIT" ? (
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={onSkip}>
                Verify Later
              </Button>
              <Button onClick={handleInitiate} disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Send OTP
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <div className="flex justify-between w-full mt-4">
                <Button variant="ghost" onClick={() => setStep("INIT")}>
                  Back
                </Button>
                <Button
                  onClick={handleVerify}
                  disabled={otp.length !== 6 || loading}
                >
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Verify
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

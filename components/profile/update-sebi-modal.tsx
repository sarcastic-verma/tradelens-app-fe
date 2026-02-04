"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreatorRepository } from "@/repositories/creators/creator.repository";

interface UpdateSebiModalProps {
  currentRegNo: string;
  onSuccess: (regNo: string) => void;
  onCancel: () => void;
}

export function UpdateSebiModal({
  currentRegNo,
  onSuccess,
  onCancel,
}: UpdateSebiModalProps) {
  const [regNo, setRegNo] = useState(currentRegNo);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (regNo === currentRegNo) {
      onCancel();
      return;
    }

    setLoading(true);
    try {
      await CreatorRepository.updateProfile({ sebiRegNo: regNo });
      onSuccess(regNo);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 py-2">
      <DialogHeader>
        <DialogTitle>Update SEBI Registration Number</DialogTitle>
        <DialogDescription>
          Enter your valid SEBI registration number.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-2">
        <Input
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          placeholder="INH000000000"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!regNo || loading}>
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Update
        </Button>
      </div>
    </div>
  );
}

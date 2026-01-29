export enum PayoutStatusEnum {
  PENDING = "PENDING",
  PROCESSED = "PROCESSED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REVERSED = "REVERSED",
}

export interface RequestPayoutDto {
  amount: number;
}

export interface CreatorWallet {
  id: string;
  creatorId: string;
  availableBalance: string;
  totalEarnings: string;
  totalPaidOut: string;
  lastPayoutDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payout {
  id: string;
  creatorId: string;
  amount: string;
  status: PayoutStatusEnum;
  razorpayPayoutId?: string;
  processedAt?: string;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
}

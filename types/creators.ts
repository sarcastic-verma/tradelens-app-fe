import {
  InstrumentEnum,
  StrategyEnum,
  RiskProfileEnum,
  CapitalRequiredBucketEnum,
  SebiStatusEnum,
} from "./enums";

export interface CreateCreatorDto {
  displayName: string;
  bio?: string;
  photoUrl?: string;
  instruments: InstrumentEnum[];
  strategies: StrategyEnum[];
  riskProfile: RiskProfileEnum;
  capitalReq: CapitalRequiredBucketEnum;
  sebiRegNo?: string;
}

export interface UpdateCreatorDto extends Partial<CreateCreatorDto> {
  razorpayContactId?: string;
  paymentAccountId?: string;
  paymentProvider?: string;
  sebiStatus?: SebiStatusEnum;
  sebiEmail?: string;
}

export interface SetupPayoutDto {
  accountHolderName: string;
  accountNumber: string;
  ifsc: string;
}

export interface VerifySebiOtpDto {
  otp: string;
}

export interface SebiVerificationResponseDto {
  maskedEmail: string;
  message: string;
}

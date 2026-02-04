import { axiosInstance } from "@/utils/axios-instance";
import {
  InstrumentEnum,
  StrategyEnum,
  RiskProfileEnum,
  CapitalRequiredBucketEnum,
} from "@/types/enums";

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

export interface SetupPayoutDto {
  accountHolderName: string;
  accountNumber: string;
  ifsc: string;
}

export interface VerifySebiOtpDto {
  otp: string;
}

export class CreatorRepository {
  static createCreator(data: CreateCreatorDto) {
    return axiosInstance.post("/api/creators/onboard", data);
  }

  static setupPayout(data: SetupPayoutDto) {
    return axiosInstance.post("/api/creators/me/payout-setup", data);
  }

  static initiateSebiVerification() {
    return axiosInstance.post("/api/creators/me/sebi-verification/initiate");
  }

  static verifySebiOtp(otp: string) {
    return axiosInstance.post("/api/creators/me/sebi-verification/verify", {
      otp,
    });
  }

  static getMyProfile() {
    return axiosInstance.get("/api/creators/me");
  }

  static updateProfile(data: Partial<CreateCreatorDto>) {
    return axiosInstance.patch("/api/creators/me", data);
  }
}

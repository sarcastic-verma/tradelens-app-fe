import axios from "axios";
import { Creator } from "../../types";
import { PaginationDto } from "../../types/common";
import {
  CreateCreatorDto,
  SetupPayoutDto,
  UpdateCreatorDto,
  VerifySebiOtpDto,
} from "../../types/creators";
import { axiosInstance } from "../../utils/axios-instance";

export class CreatorRepository {
  static onboard(data: CreateCreatorDto) {
    return axiosInstance.post<Creator>("/api/creators/onboard", data);
  }

  static list(pagination?: PaginationDto) {
    return axios.get<Creator[]>("/api/creators", { params: pagination });
  }

  static getMyProfile() {
    return axiosInstance.get<Creator>("/api/creators/me");
  }

  static getProfile(id: string) {
    return axios.get<Creator>(`/api/creators/${id}`);
  }

  static updateProfile(data: UpdateCreatorDto) {
    return axiosInstance.patch<Creator>("/api/creators/me", data);
  }

  static setupPayout(data: SetupPayoutDto) {
    return axiosInstance.post<Creator>("/api/creators/me/payout-setup", data);
  }

  static initiateSebiVerification() {
    return axiosInstance.post<{ message: string; maskedEmail: string }>(
      "/api/creators/me/sebi-verification/initiate",
    );
  }

  static verifySebiOtp(data: VerifySebiOtpDto) {
    return axiosInstance.post<{ message: string }>(
      "/api/creators/me/sebi-verification/verify",
      data,
    );
  }
}

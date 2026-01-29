import { PaginationDto } from "../../types/common";
import { CreatorWallet, Payout, RequestPayoutDto } from "../../types/payouts";
import { axiosInstance } from "../../utils/axios-instance";

export class PayoutRepository {
  static getWallet() {
    return axiosInstance.get<CreatorWallet>("/api/payouts/wallet");
  }

  static requestPayout(data: RequestPayoutDto) {
    return axiosInstance.post<Payout>("/api/payouts/request", data);
  }

  static getHistory(pagination?: PaginationDto) {
    return axiosInstance.get<Payout[]>("/api/payouts/history", {
      params: pagination,
    });
  }

  static getPayout(id: string) {
    return axiosInstance.get<Payout>(`/api/payouts/${id}`);
  }
}

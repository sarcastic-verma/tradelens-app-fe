import { PaginationDto } from "../../types/common";
import { CreateTradeDto, Trade } from "../../types/trades";
import { axiosInstance } from "../../utils/axios-instance";

export class TradeRepository {
  static createTrade(data: CreateTradeDto) {
    return axiosInstance.post<Trade>("/api/trades", data);
  }

  static getMyFeed(pagination?: PaginationDto) {
    return axiosInstance.get<Trade[]>("/api/trades/my-feed", {
      params: pagination,
    });
  }

  static getCreatorTrades(creatorId: string, pagination?: PaginationDto) {
    return axiosInstance.get<Trade[]>(`/api/trades/creator/${creatorId}`, {
      params: pagination,
    });
  }

  static getTradeDetails(tradeId: string) {
    return axiosInstance.get<Trade>(`/api/trades/${tradeId}`);
  }
}

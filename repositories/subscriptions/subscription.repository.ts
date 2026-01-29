import axios from "axios";
import { PaginationDto } from "../../types/common";
import {
  CreatePlanDto,
  InitiateCheckoutDto,
  InitiateCheckoutResponse,
  Plan,
  Subscription,
} from "../../types/subscriptions";
import { axiosInstance } from "../../utils/axios-instance";

export class SubscriptionRepository {
  static createPlan(data: CreatePlanDto) {
    return axiosInstance.post<Plan>("/api/subscriptions/plans", data);
  }

  static getCreatorPlans(creatorId: string) {
    return axios.get<Plan[]>(`/api/subscriptions/creators/${creatorId}/plans`);
  }

  static initiateCheckout(data: InitiateCheckoutDto) {
    return axiosInstance.post<InitiateCheckoutResponse>(
      "/api/subscriptions/checkout",
      data,
    ); // Return type depends on checkout response (e.g. Razorpay order)
  }

  static getMySubscriptions(pagination?: PaginationDto) {
    return axiosInstance.get<Subscription[]>("/api/subscriptions/me", {
      params: pagination,
    });
  }
}

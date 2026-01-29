export interface CreatePlanDto {
  name: string;
  description: string;
  price: number;
}

export interface InitiateCheckoutDto {
  planId: string;
}

export interface InitiateCheckoutResponse {
  subscriptionId: string;
  key: string;
  planName: string;
  planDescription: string;
}

export interface Plan {
  id: string;
  creatorId: string;
  name: string;
  description: string;
  price: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  plan: Plan;
  status: "ACTIVE" | "EXPIRED" | "CANCELLED";
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

import { CapitalRequiredBucketEnum, InstrumentEnum, KycStatusEnum, RiskProfileEnum, SebiStatusEnum, StrategyEnum, UserRole } from "./enums";

export type BackendUser = {
    id: string;
    email: string;
    name: string;
    photo: string;
    role: UserRole;
    created_at: string;
    updated_at: string;
}

export type Creator = {
    id: string;
    userId: string;
    displayName: string;
    bio: string;
    photoUrl: string;
    instruments: InstrumentEnum[];
    strategies: StrategyEnum[];
    sebiStatus: SebiStatusEnum;
    sebiRegNo: string;
    riskProfile: RiskProfileEnum;
    capitalReq: CapitalRequiredBucketEnum;
    isApproved: boolean;
    paymentProvider: string;
    paymentAccountId: string;
    kycStatus: KycStatusEnum;
    hitRate: string;
    avgPnl: string;
    drawdown: string;
    joinedAt: string;
    updatedAt: string;
}
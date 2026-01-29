export enum InstrumentTypeEnum {
  CASH_EQUITY = "CASH_EQUITY",
  STOCK_FUTURES = "STOCK_FUTURES",
  STOCK_OPTIONS = "STOCK_OPTIONS",
  INDEX_FUTURES = "INDEX_FUTURES",
  INDEX_OPTIONS = "INDEX_OPTIONS",
  COMMODITIES = "COMMODITIES",
  CURRENCY_DERIVATIVES = "CURRENCY_DERIVATIVES",
}

export enum TradeTypeEnum {
  BUY = "BUY",
  SELL = "SELL",
}

export interface Trade {
  id: string;
  creatorId: string;
  instrumentType: string;
  symbol: string;
  tradeType: string;
  entryRange: string;
  targetPrice: number;
  stopLoss: number;
  thesisText: string;
  imageUrl: string | null;
  isFree: boolean;
  expiryDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTradeDto {
  instrumentType: InstrumentTypeEnum;
  symbol: string;
  tradeType: TradeTypeEnum;
  entryRange: string;
  targetPrice: number;
  stopLoss: number;
  thesisText: string;
  thesisImageUrl?: string;
  isFree?: boolean;
  expiryDate: string;
}

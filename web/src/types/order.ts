type OrderType = "Buy" | "Sell";
type OrderStatus = "Pending" | "Processing" | "Executed" | "Failed";

export interface IOrderResponse {
  id: number;
  quantity: number;
  type: OrderType;
  status: OrderStatus;
  assetName: string;
}

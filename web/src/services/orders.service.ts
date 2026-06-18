import type { IOrderResponse } from "../types/order";
import { HttpService } from "./http.service";

const endpoint = import.meta.env.VITE_ORDERS_URL || "http://localhost:8000";
const http = new HttpService(endpoint);

export function getOrders(): Promise<IOrderResponse[]> {
  return http.get<IOrderResponse[]>("/orders");
}

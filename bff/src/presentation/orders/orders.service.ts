import { Injectable } from '@nestjs/common';
import { OrdersAggregator } from '../../aggregators/orders/orders.service';
import { IOrderResponse } from './orders.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersAggregators: OrdersAggregator) {}

  public async getOrders(): Promise<IOrderResponse[] | null> {
    return await this.ordersAggregators.getOrders();
  }
}

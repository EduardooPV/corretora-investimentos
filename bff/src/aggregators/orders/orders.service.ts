import { Injectable } from '@nestjs/common';
import { CoreHttpService } from '../../common/http/http.service';
import { IApiOrderResponse } from './orders.dto';

@Injectable()
export class OrdersAggregator {
  constructor(private readonly http: CoreHttpService) {}

  private base = process.env.CORRETORA_API_URL ?? 'http://localhost:5089';

  public async getOrders() {
    try {
      return await this.http.get<IApiOrderResponse[]>(`${this.base}/orders`);
    } catch (error) {
      console.error(error, '[getOrders]');
      throw error;
    }
  }
}

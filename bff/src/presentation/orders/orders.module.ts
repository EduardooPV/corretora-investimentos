import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CoreHttpService } from '../../common/http/http.service';
import { OrdersAggregator } from '../../aggregators/orders/orders.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [OrdersController],
  providers: [OrdersService, CoreHttpService, OrdersAggregator],
  exports: [OrdersService],
})
export class OrdersModule {}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorators';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }
}

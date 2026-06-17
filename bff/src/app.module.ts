import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrdersModule } from './presentation/orders/orders.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule, OrdersModule],
})
export class AppModule {}

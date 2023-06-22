import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/database/entities/order-item.entitiy';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem]),ProductModule,UserModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}

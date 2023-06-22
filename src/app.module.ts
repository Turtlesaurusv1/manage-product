import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { UserEntity } from './database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { ProductEntitiy } from './database/entities/product.entitiy';
import { ProductModule } from './api/product/product.module';
import { OrderItem } from './database/entities/order-item.entitiy';
import { OrderModule } from './api/order/order.module';
require('dotenv').config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: `${process.env.DB_USERNAME}`,
      password: `${process.env.DB_PASSWORD}`,
      database: `${process.env.DB_DATABASE}`,
      entities: [UserEntity,ProductEntitiy,OrderItem],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProductModule,
    OrderModule
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntitiy } from 'src/database/entities/product.entitiy';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntitiy])
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports:[ProductService]
})
export class ProductModule {}

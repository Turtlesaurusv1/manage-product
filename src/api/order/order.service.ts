import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/database/crud-service';
import { OrderItem } from 'src/database/entities/order-item.entitiy';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService extends CrudService<OrderItem> {
  constructor(
    @InjectRepository(OrderItem) protected repository: Repository<OrderItem>,
  ) {
    super(repository);
  }
}

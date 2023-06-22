import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/database/crud-service';
import { ProductEntitiy } from 'src/database/entities/product.entitiy';
import { DeepPartial, Repository } from 'typeorm';
import { ProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService extends CrudService<ProductEntitiy> {
    constructor(
      @InjectRepository(ProductEntitiy) protected repository: Repository<ProductEntitiy>,
    ) {
      super(repository);
    }

}

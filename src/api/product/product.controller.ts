import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto/create-product.dto';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() product: ProductDto) {
    try {
      
      const data = await this.productService.createAndSave({ ...product });
      return data;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      const data = await this.productService.find();
      return data;
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const findProduct = await this.productService.findOne({
        where: {
          id: id,
        },
      });
      if (!findProduct) {
        throw new Error('Product not found');
      }
      return findProduct;
    } catch (error) {
      throw error;
    }
  }
}

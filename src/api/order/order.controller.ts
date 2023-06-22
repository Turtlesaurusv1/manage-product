import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtDecorator } from '../auth/decorator';
import { orderDto } from './dto/order.dto';
import { ProductService } from '../product/product.service';
import { status } from './status.enum';
import { UserService } from '../user/user.service';
import { MultiSelect } from 'src/database/multi-select';
import { In } from 'typeorm';

@Controller('order')
@ApiTags('order')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  @Post('')
  async orderItem(@JwtDecorator() payload: any, @Body() body: orderDto) {
    try {
      const { product } = body;
      const findProduct = await this.productService.findOne({
        where: {
          id: product,
        },
      });
      if (!product) {
        throw new Error('Product not found');
      }
      const order = this.orderService.createAndSave({
        ...body,
        product: findProduct,
        userId: payload?.id,
        status: status.CART,
      });

      return order;
    } catch (error) {
      throw error;
    }
  }

  @Get('my-list')
  async orderList(@JwtDecorator() payload: any) {
    try {
      return await this.userService
        .createQueryBuilder('u')
        .leftJoinAndSelect('u.OrderItems', 'o')
        .where('u.id = :id', { id: payload?.id })
        .andWhere('o.status = :status', { status: status.CART })
        .getMany();
    } catch (error) {
      throw error;
    }
  }

  @Get('order-history')
  async orderListComplete(@JwtDecorator() payload: any) {
    try {
      return await this.userService
        .createQueryBuilder('u')
        .leftJoinAndSelect('u.OrderItems', 'o')
        .where('u.id = :id', { id: payload?.id })
        .andWhere('o.status = :status', { status: status.COMPLETED })
        .getMany();
    } catch (error) {
      throw error;
    }
  }

  @Patch('buy-item')
  async buyItem(@JwtDecorator() payload: any, @Body() body: MultiSelect) {
    try {
      const findOrder = await this.orderService.find({
        where: {
          id: In(body?.ids),
        },
      });
      await Promise.all(
        findOrder.map(async (item) => {
          await this.orderService.update(
            {
              where: {
                id: item.id,
              },
            },
            {
              status: status.COMPLETED,
            },
          );
        }),
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  @Delete()
  async deleteOrder(@JwtDecorator() payload: any, @Body() body: MultiSelect) {
    try {
      for (const id of body.ids) {
        const entity = await this.orderService.findOne({ where: { id: id } });
        await this.orderService.softRemove(entity);
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}

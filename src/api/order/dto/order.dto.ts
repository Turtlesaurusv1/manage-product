import { ApiProperty } from '@nestjs/swagger';
import { status } from '../status.enum';
import { IsIn } from 'class-validator';

export class orderDto {
  @ApiProperty({ required: true ,default:1})
  quantity: number;

  @ApiProperty({ required: true })
  product: number;
}

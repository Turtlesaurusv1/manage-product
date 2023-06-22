import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ProductDto {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  description: string;
  @ApiProperty({ required: true })
  @IsNumber()
  price: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class MultiSelect {
  @ApiProperty({ example: [1] })
  @IsNumber({}, { each: true })
  @IsOptional()
  ids: number[];
}

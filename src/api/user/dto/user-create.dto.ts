import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({ required: true })
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase()?.trim())
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  isActive: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  tel: string;
}

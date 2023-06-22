import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { JwtDecorator } from './decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto) {
    try {
      const user = await this.authService.validateUser(body);

      if (!user) {
        throw new UnauthorizedException();
      }

      return await this.authService.login(body);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@JwtDecorator() payload: any) {
    try {
      return payload;
    } catch (error) {
      throw error;
    }
  }
}

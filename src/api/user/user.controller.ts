import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: UserCreateDto) {
    try {
      const data = await this.userService.createUser(createUserDto);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

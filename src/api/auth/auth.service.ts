import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { classToPlain } from 'class-transformer';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { compareSync } from 'bcrypt';
import { UserGroups } from 'src/database/enum/user-groups.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(body: LoginDto) {
    try {
      const { email, password } = body;
      const user = await this.userService.findOne({
        where: {
          email: email,
        },
      });
      
      

      if (user && (await compareSync(password, user.password))) {
        return classToPlain(user, {
          groups: [UserGroups.USER_VIEW],
        });
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async login(body: LoginDto) {
    try {
      const user = await this.validateUser(body);
      const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      return {
        data: {
          ...user,
        },
        accessToken: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw error;
    }
  }
}

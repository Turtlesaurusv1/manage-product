import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { hashSync } from 'bcrypt';
import { CrudService } from 'src/database/crud-service';

@Injectable()
export class UserService extends CrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) protected repository: Repository<UserEntity>,
  ) {
    super(repository);
  }
  async createUser(data: UserCreateDto): Promise<UserEntity> {
    try {
      const { password, email } = data;
      const user = await this.repository.findOne({
        where: {
          email: email,
        },
      });
      if (user) {
        throw new BadRequestException('User already exits.');
      }

      const entity = this.repository.create({
        ...data,
        password: hashSync(password, 10),
      });

      return entity.save();
    } catch (error) {
      throw error;
    }
  }
}

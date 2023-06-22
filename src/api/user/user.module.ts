import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from 'src/database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntitiy } from 'src/database/entities/product.entitiy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}

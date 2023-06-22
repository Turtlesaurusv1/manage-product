import { Column, Entity, ManyToOne } from 'typeorm';
import { TableName } from '../table-name.enum';
import { UserEntity } from './user.entity';
import { ProductEntitiy } from './product.entitiy';
import { CommonEntity } from '../common-entity';
import { Exclude } from 'class-transformer';

@Entity(TableName.orderitems)
export class OrderItem extends CommonEntity {
  @Column()
  quantity: number;

  @ManyToOne(() => UserEntity, (U) => U.id)
  user: UserEntity;

  @Column({ nullable: true })
  @Exclude()
  userId: number;

  @ManyToOne(() => ProductEntitiy, (p) => p.id)
  product: ProductEntitiy;

  @Column()
  status: string;
}

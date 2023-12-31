import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../common-entity';
import { UserGroups } from '../enum/user-groups.enum';
import { TableName } from '../table-name.enum';
import { OrderItem } from './order-item.entitiy';

@Entity(TableName.USER)
export class UserEntity extends CommonEntity {
  @Column({ type: 'varchar', length: '255', nullable: false })
  @Expose({
    groups: [UserGroups.USER_LIST, UserGroups.USER_VIEW, UserGroups.USER_LOGIN],
  })
  email: string;

  @Column({ type: 'varchar', length: '255', nullable: false })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: '255', nullable: true })
  @Expose({ groups: [UserGroups.USER_LIST, UserGroups.USER_VIEW] })
  firstName: string;

  @Column({ type: 'varchar', length: '255', nullable: true })
  @Expose({ groups: [UserGroups.USER_LIST, UserGroups.USER_VIEW] })
  lastName: string;

  @Column({ type: 'boolean', nullable: true })
  @Expose({ groups: [UserGroups.USER_LIST, UserGroups.USER_VIEW] })
  isActive: boolean;

  @Column({ type: 'varchar', length: '255', nullable: true })
  @Expose({ groups: [UserGroups.USER_LIST, UserGroups.USER_VIEW] })
  tel: string;

  @OneToMany(() => OrderItem, (mta) => mta.user)
  OrderItems: OrderItem[];

  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }
}

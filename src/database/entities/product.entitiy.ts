import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../common-entity';
import { TableName } from '../table-name.enum';

@Entity(TableName.PRODUCT)
export class ProductEntitiy extends CommonEntity{
  @Column({ type: 'varchar', length: '255', nullable: false })
  name: string;

  @Column({ type: 'varchar', length: '255', nullable: true })
  description: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: false,
  })
  price: number;
}

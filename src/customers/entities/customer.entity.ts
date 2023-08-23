import { Exclude } from 'class-transformer';
import { Order } from 'src/orders/entities/order.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';

@Entity('customers')
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: "The Customer's Unique Identifier",
  })
  id: number;

  @Column({
    length: 255,
    type: 'varchar',
    unique: true,
    nullable: true,
  })
  email: string;

  @Column({
    length: 100,
    type: 'varchar',
    default: 'guest',
  })
  name: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @DeleteDateColumn()
  @Exclude()
  delete_date: Date;

  // private table: any; // TODO: Create Table Entity
}

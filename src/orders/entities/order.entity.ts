import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: "The Customer's Unique Identifier",
  })
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.id)
  customer: Customer;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @Column({
    type: 'integer',
  })
  subtotal: number;

  @Column({})
  tax: number;

  @Column({
    type: 'integer',
  })
  total: number;
}

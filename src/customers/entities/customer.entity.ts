import { PaymentMethod } from 'src/payment-method/entities/payment-method.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('customers')
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: "The Customer's Unique Identifier",
  })
  id: number;

  @Column({
    length: 100,
    type: 'string',
  })
  email: string;

  @Column({
    length: 100,
    type: 'string',
  })
  name: string;

  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.customer)
  paymentMethods: PaymentMethod[];
  // private table: any; // TODO: Create Table Entity
}

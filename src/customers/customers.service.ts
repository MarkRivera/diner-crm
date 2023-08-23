import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(customer);
  }

  findAll() {
    // TODO: Only Managers can see all customers
    return this.customerRepository.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return instanceToPlain(this.customerRepository.findOne({ where: { id } }));
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    try {
      const existingCustomer = await this.customerRepository.findOne({
        where: { id },
      });

      if (!existingCustomer) {
        throw new NotFoundException('Customer not found');
      }

      this.customerRepository.merge(existingCustomer, updateCustomerDto);

      const updatedCustomer =
        await this.customerRepository.save(existingCustomer);

      return updatedCustomer;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Emails must be unique');
      }

      throw error;
    }
  }

  async remove(id: number) {
    const user = await this.customerRepository.findOne({ where: { id } });
    if (!user)
      throw new NotFoundException('User either does not exist or is deleted');

    await this.customerRepository.softDelete(id);
  }
}

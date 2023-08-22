import { PipeTransform, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';

@Injectable()
export class DefaultValuePipe implements PipeTransform {
  transform(value: CreateCustomerDto) {
    const name = (value.name && value.name.trim()) || 'guest';
    const email = (value.email && value.email.trim()) || null;

    return { ...value, name, email };
  }
}

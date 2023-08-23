import { Controller, Post, Body } from '@nestjs/common';
import { PaymentIntentService } from './payment-intent.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';

@Controller('payment-intent')
export class PaymentIntentController {
  constructor(private readonly paymentIntentService: PaymentIntentService) {}

  @Post()
  create(@Body() createPaymentIntentDto: CreatePaymentIntentDto) {
    return this.paymentIntentService.create(createPaymentIntentDto);
  }
}

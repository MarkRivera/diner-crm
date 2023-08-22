import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import Stripe from 'stripe';

@Injectable()
export class PaymentIntentService {
  constructor(@Inject('Stripe') private readonly stripe: Stripe) {}
  async create(createPaymentIntentDto: CreatePaymentIntentDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 2000,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    return { clientSecret: paymentIntent.client_secret };
  }
}

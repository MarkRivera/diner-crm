import { Module, Provider } from '@nestjs/common';
import { PaymentIntentService } from './payment-intent.service';
import { PaymentIntentController } from './payment-intent.controller';
import Stripe from 'stripe';

const StripeProvider: Provider = {
  provide: 'Stripe',
  useFactory: () =>
    new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-08-16',
    }),
};

@Module({
  controllers: [PaymentIntentController],
  providers: [PaymentIntentService, StripeProvider],
})
export class PaymentIntentModule {}

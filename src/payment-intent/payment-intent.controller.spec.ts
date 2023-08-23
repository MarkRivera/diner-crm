import { Test, TestingModule } from '@nestjs/testing';
import { PaymentIntentController } from './payment-intent.controller';
import { PaymentIntentService } from './payment-intent.service';

describe('PaymentIntentController', () => {
  let controller: PaymentIntentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentIntentController],
      providers: [PaymentIntentService],
    }).compile();

    controller = module.get<PaymentIntentController>(PaymentIntentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

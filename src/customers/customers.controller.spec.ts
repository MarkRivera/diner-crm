import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Order } from 'src/orders/entities/order.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('CustomersController', () => {
  let controller: CustomersController;
  let customersService: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomersService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: 1,
              name: 'guest',
              email: null,
            }),

            update: jest.fn().mockReturnValue({
              id: 1,
              name: 'mark',
              email: 'mark@test.com',
            }),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: getRepositoryToken(Customer),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Order),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    customersService = module.get<CustomersService>(CustomersService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('customersService should be defined', () => {
    expect(customersService).toBeDefined();
  });

  describe('create', () => {
    it('should return a customer with no data', async () => {
      const customer = {
        name: '',
        email: '',
      };

      expect(await controller.create(customer)).toEqual({
        id: 1,
        name: 'guest',
        email: null,
      });
    });
  });

  describe('update', () => {
    it('On success, should return the updated customer', async () => {
      const id = 1;
      const updatedInfo = {
        name: 'mark',
        email: 'mark@test.com',
      };

      expect(await controller.update(id, updatedInfo)).toEqual({
        id: 1,
        name: 'mark',
        email: 'mark@test.com',
      });
    });

    it('On failure, non-unique email should throw a BadRequestException', async () => {
      const id = 2;
      const updatedInfo = {
        name: 'mark',
        email: 'mark@test.com',
      };

      (customersService.update as jest.Mock).mockRejectedValue(
        new BadRequestException('Emails must be unique'),
      );

      await expect(controller.update(id, updatedInfo)).rejects.toThrow(
        'Emails must be unique',
      );
    });

    it('On failure, customer not found should throw a NotFoundException', async () => {
      const id = 2;
      const updatedInfo = {
        name: 'mark',
        email: '',
      };

      (customersService.update as jest.Mock).mockRejectedValue(
        new NotFoundException('Customer not found'),
      );

      await expect(controller.update(id, updatedInfo)).rejects.toThrow(
        'Customer not found',
      );
    });
  });

  describe('delete', () => {
    it('On success, should return a message and status code of 200', async () => {
      const id = 1;

      expect(await controller.remove(id)).toEqual({
        message: `The customer with id: ${id} has been deleted`,
        status: 200,
        id,
      });
    });

    it('On failure, should throw a BadRequestException', async () => {
      const id = 1;

      (customersService.remove as jest.Mock).mockRejectedValue(
        new BadRequestException('User either does not exist or is deleted'),
      );

      await expect(controller.remove(id)).rejects.toThrow(
        new BadRequestException('User either does not exist or is deleted'),
      );
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';

import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import FakeTransactionsRepository from './repositories/fakes/transactions.fake-repository.ts';

describe('TransactionsController', () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        TransactionsService,
        {
          provide: 'TransactionsRepository',
          useClass: FakeTransactionsRepository,
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';

import { TransactionsService } from './transactions.service';
import FakeTransactionsRepository from './repositories/fakes/transactions.fake-repository.ts';

jest.mock('node:crypto', () => ({
  randomUUID: () => '1',
}));
const date = '2022-10-29T00:00:00.000Z';
jest.useFakeTimers().setSystemTime(new Date(date));

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: 'TransactionsRepository',
          useClass: FakeTransactionsRepository,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#create', () => {
    it('should be able to create a transaction with only the required fields', async () => {
      const data = {
        amount: 400,
      };

      await expect(service.create(data)).resolves.toEqual({
        id: '1',
        amount: 400,
        description: undefined,
        createdAt: date,
        updatedAt: date,
        occurredAt: date,
      });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';

import { TransactionsService } from './transactions.service';
import FakeTransactionsRepository from './repositories/fakes/transactions.fake-repository.ts';

const id = '1';
const date = '2022-10-29T00:00:00.000Z';

jest.mock('node:crypto', () => ({
  randomUUID: () => id,
}));
jest.useFakeTimers().setSystemTime(new Date(date));

describe('TransactionsService', () => {
  let service: TransactionsService;
  let transactionsRepository: FakeTransactionsRepository;

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
    transactionsRepository = module.get<FakeTransactionsRepository>(
      'TransactionsRepository',
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getAll', () => {
    it('should be able to get all the transactions', async () => {
      transactionsRepository.create({ amount: 500 });
      transactionsRepository.create({ amount: 200 });

      await expect(service.getAll()).resolves.toEqual([
        {
          amount: 500,
          createdAt: date,
          id,
          updatedAt: date,
        },
        {
          amount: 200,
          createdAt: date,
          id,
          updatedAt: date,
        },
      ]);
    });
  });

  describe('#create', () => {
    const defaultFields = {
      id: '1',
      description: undefined,
      createdAt: date,
      updatedAt: date,
      occurredAt: date,
    };

    it.each([
      {
        with: 'informing only the required fields',
        data: { amount: 400 },
      },
      {
        with: 'informing the optional fields',
        data: {
          amount: 400,
          description: 'Incoming from Project S',
          occurredAt: '2022-10-20T00:00:00.000Z',
        },
      },
    ])('it should be able to create a transaction $when', async ({ data }) => {
      await expect(service.create(data)).resolves.toEqual({
        ...defaultFields,
        ...data,
      });
    });
  });
});

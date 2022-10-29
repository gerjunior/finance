import { Prisma, Transaction } from '@prisma/client';

interface ITransactionsRepository {
  getAll: () => Promise<Transaction[]>;
  get: (id: string) => Promise<Transaction | undefined>;
  create: (data: Prisma.TransactionCreateInput) => Promise<Transaction>;
  update: (
    id: string,
    data: Prisma.TransactionUpdateInput,
  ) => Promise<Transaction>;
}

export default ITransactionsRepository;

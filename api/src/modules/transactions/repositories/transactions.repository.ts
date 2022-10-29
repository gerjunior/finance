import { Prisma, Transaction } from '@prisma/client';

interface ITransactionsRepository {
  getAll: () => Promise<Transaction[]>;
  create: (data: Prisma.TransactionCreateInput) => Promise<Transaction>;
}

export default ITransactionsRepository;

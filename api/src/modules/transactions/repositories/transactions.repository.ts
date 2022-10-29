import { Prisma, Transaction as FullTransaction } from '@prisma/client';

type Transaction = Omit<FullTransaction, 'deletedAt'>;
interface ITransactionsRepository {
  getAll: () => Promise<Transaction[]>;
  get: (id: string) => Promise<Transaction | undefined>;
  create: (data: Prisma.TransactionCreateInput) => Promise<Transaction>;
  update: (
    id: string,
    data: Prisma.TransactionUpdateInput,
  ) => Promise<Transaction>;
  delete: (id: string) => Promise<void>;
}

export default ITransactionsRepository;

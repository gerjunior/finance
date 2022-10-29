import { Prisma, Transaction } from '@prisma/client';

interface ITransactionsRepository {
  create: (data: Prisma.TransactionCreateInput) => Promise<Transaction>;
}

export default ITransactionsRepository;

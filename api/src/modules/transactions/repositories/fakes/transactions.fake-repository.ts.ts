import { randomUUID } from 'node:crypto';

import { Injectable } from '@nestjs/common';
import { Prisma, Transaction } from '@prisma/client';

import TransactionsRepositoryInterface from '@/modules/transactions/repositories/transactions.repository';

@Injectable()
class FakeTransactionsRepository implements TransactionsRepositoryInterface {
  private transactions: Transaction[] = [];

  async create(data: Prisma.TransactionCreateInput) {
    const transaction: Prisma.TransactionCreateInput = {
      id: randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.transactions.push(transaction as Transaction);

    return transaction as Transaction;
  }
}

export default FakeTransactionsRepository;

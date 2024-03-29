import { randomUUID } from 'node:crypto';

import { Injectable } from '@nestjs/common';
import { Prisma, Transaction } from '@prisma/client';

import TransactionsRepositoryInterface from '@/modules/transactions/repositories/transactions.repository';

@Injectable()
class FakeTransactionsRepository implements TransactionsRepositoryInterface {
  private transactions: Transaction[] = [];

  private getIndex(id: string) {
    return this.transactions.findIndex((transaction) => transaction.id === id);
  }

  async getAll() {
    return this.transactions;
  }

  async get(id: string) {
    return this.transactions.find((transaction) => transaction.id === id);
  }

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

  async update(id: string, data: Prisma.TransactionUpdateInput) {
    const idx = this.getIndex(id);

    const updatedTransaction = {
      ...this.transactions[idx],
      ...data,
    } as unknown as Transaction;

    this.transactions[idx] = updatedTransaction;

    return updatedTransaction;
  }

  async delete(id: string) {
    this.transactions = this.transactions.filter((transaction) => transaction.id !== id);
  }
}

export default FakeTransactionsRepository;

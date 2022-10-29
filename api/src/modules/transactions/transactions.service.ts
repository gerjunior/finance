import { Inject, Injectable } from '@nestjs/common';

import CreateTransactionDTO from './dtos/create-transaction.dto';
import ITransactionsRepository from './repositories/transactions.repository';
@Injectable()
export class TransactionsService {
  constructor(
    @Inject('TransactionsRepository')
    private readonly transactionsRepository: ITransactionsRepository,
  ) {}

  async get(id: string) {
    return this.transactionsRepository.get(id);
  }

  async getAll() {
    return this.transactionsRepository.getAll();
  }

  async create({ amount, occurredAt, description }: CreateTransactionDTO) {
    return this.transactionsRepository.create({
      description,
      amount,
      occurredAt: occurredAt || new Date().toISOString(),
    });
  }
}

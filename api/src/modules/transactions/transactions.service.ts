import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import CreateTransactionDTO from './dtos/create-transaction.dto';
import UpdateTransactionDTO from './dtos/update-transaction.dto';
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

  async update(id: string, data: UpdateTransactionDTO) {
    const transaction = await this.transactionsRepository.get(id);
    if (!transaction) {
      throw new UnprocessableEntityException();
    }

    return this.transactionsRepository.update(id, data);
  }

  async delete(id: string) {
    const transaction = await this.transactionsRepository.get(id);
    if (!transaction) {
      return;
    }

    return this.transactionsRepository.delete(id);
  }
}

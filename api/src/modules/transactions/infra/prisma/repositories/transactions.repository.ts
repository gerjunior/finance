import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/shared/modules/prisma.service';
import TransactionsRepositoryInterface from '@/modules/transactions/repositories/transactions.repository';

@Injectable()
class TransactionsRepository implements TransactionsRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.transaction.findMany();
  }

  async create(data: Prisma.TransactionCreateInput) {
    return this.prisma.transaction.create({ data });
  }
}

export default TransactionsRepository;

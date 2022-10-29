import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/shared/modules/prisma.service';
import TransactionsRepositoryInterface from '@/modules/transactions/repositories/transactions.repository';

@Injectable()
class TransactionsRepository implements TransactionsRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.transaction.findMany({
      where: { deletedAt: null },
    });
  }

  async get(id: string) {
    return this.prisma.transaction.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async create(data: Prisma.TransactionCreateInput) {
    return this.prisma.transaction.create({ data });
  }

  async update(id: string, data: Prisma.TransactionUpdateInput) {
    return this.prisma.transaction.update({ data, where: { id } });
  }

  async delete(id: string) {
    await this.prisma.transaction.update({
      data: { deletedAt: new Date().toISOString() },
      where: { id },
    });
  }
}

export default TransactionsRepository;

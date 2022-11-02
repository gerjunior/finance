import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/shared/modules/prisma.service';
import ICategoriesRepository from '@/modules/categories/repositories/categories.repository';

@Injectable()
class CategoriesRepository implements ICategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.category.findMany({
      where: { deletedAt: null },
    });
  }

  async get(id: string) {
    return this.prisma.category.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async getByName(name: string) {
    return this.prisma.category.findFirst({
      where: { name, deletedAt: null },
    });
  }

  async create(data: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({ data });
  }

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    return this.prisma.category.update({ data, where: { id } });
  }

  async delete(id: string) {
    await this.prisma.category.update({
      data: { deletedAt: new Date().toISOString() },
      where: { id },
    });
  }
}

export default CategoriesRepository;

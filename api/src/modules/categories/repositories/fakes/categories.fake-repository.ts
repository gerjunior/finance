import { randomUUID } from 'node:crypto';

import { Injectable } from '@nestjs/common';
import { Prisma, Category } from '@prisma/client';

import ICategoriesRepository from '../categories.repository';

@Injectable()
class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  private getIndex(id: string) {
    return this.categories.findIndex((category) => category.id === id);
  }

  async getAll() {
    return this.categories;
  }

  async get(id: string) {
    return this.categories.find((category) => category.id === id);
  }

  async getByName(name: string) {
    return this.categories.find((category) => category.name === name);
  }

  async create(data: Prisma.CategoryCreateInput) {
    const category: Prisma.CategoryCreateInput = {
      id: randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.categories.push(category as Category);

    return category as Category;
  }

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    const idx = this.getIndex(id);

    const updatedCategory = {
      ...this.categories[idx],
      ...data,
    } as unknown as Category;

    this.categories[idx] = updatedCategory;

    return updatedCategory;
  }

  async delete(id: string) {
    this.categories = this.categories.filter((category) => category.id !== id);
  }
}

export default FakeCategoriesRepository;

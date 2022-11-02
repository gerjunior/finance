import { Inject, Injectable, BadRequestException } from '@nestjs/common';

import CreateCategoryDTO from './dtos/create-category.dto';
import PatchCategoryDTO from './dtos/patch-category.dto';
import ICategoriesRepository from './repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  async getAll() {
    return this.categoriesRepository.getAll();
  }

  async get(id: string) {
    return this.categoriesRepository.get(id);
  }

  async create(data: CreateCategoryDTO) {
    const existingCategory = await this.categoriesRepository.getByName(data.name);

    if (existingCategory) {
      throw new BadRequestException(null, 'There is already a category with this name');
    }

    return this.categoriesRepository.create(data);
  }

  async patch(id: string, data: PatchCategoryDTO) {
    const [existingCategory, categoryWithSameName] = await Promise.all([
      this.categoriesRepository.get(id),
      this.categoriesRepository.getByName(data.name),
    ]);

    if (!existingCategory) {
      throw new BadRequestException(null, 'Category not found');
    }

    if (categoryWithSameName) {
      throw new BadRequestException(null, 'There is already a category with this name');
    }

    return this.categoriesRepository.update(id, data);
  }

  async delete(id: string) {
    const category = await this.categoriesRepository.get(id);
    if (!category) {
      return;
    }

    return this.categoriesRepository.delete(id);
  }
}

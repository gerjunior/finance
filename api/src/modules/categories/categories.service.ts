import { Inject, Injectable, BadRequestException } from '@nestjs/common';

import CreateCategoryDTO from './dtos/create-category.dto';
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

  async create(data: CreateCategoryDTO) {
    const existingCategory = await this.categoriesRepository.getByName(data.name);

    if (existingCategory) {
      throw new BadRequestException(null, 'There is already a category with this name');
    }

    return this.categoriesRepository.create(data);
  }
}

import { Body, Controller, Post, UsePipes } from '@nestjs/common';

import CreateCategoryDTO, { createCategorySchema } from './dtos/create-category.dto';
import { CategoriesService } from './categories.service';
import JoiValidationPipe from '@/shared/pipes/joi.validation.pipe';
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createCategorySchema))
  async create(@Body() body: CreateCategoryDTO) {
    return this.categoriesService.create(body);
  }
}

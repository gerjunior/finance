import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';

import CreateCategoryDTO, { createCategorySchema } from './dtos/create-category.dto';
import { CategoriesService } from './categories.service';
import JoiValidationPipe from '@/shared/pipes/joi.validation.pipe';
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAll() {
    return this.categoriesService.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.categoriesService.get(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createCategorySchema))
  async create(@Body() body: CreateCategoryDTO) {
    return this.categoriesService.create(body);
  }
}

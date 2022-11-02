import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UsePipes } from '@nestjs/common';

import CreateCategoryDTO, { createCategorySchema } from './dtos/create-category.dto';
import { CategoriesService } from './categories.service';
import JoiValidationPipe, { useSchema } from '@/shared/pipes/joi.validation.pipe';
import { patchCategorySchema } from './dtos/patch-category.dto';
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

  @Patch(':id')
  async patch(@Param('id') id: string, @Body(useSchema(patchCategorySchema)) body: CreateCategoryDTO) {
    return this.categoriesService.patch(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return this.categoriesService.delete(id);
  }
}

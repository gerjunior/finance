import { PrismaService } from '@/shared/modules/prisma.service';
import { Module } from '@nestjs/common';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import CategoriesRepository from './infra/prisma/repositories/categories.repository';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, { provide: 'CategoriesRepository', useClass: CategoriesRepository }],
})
export class CategoriesModule {}

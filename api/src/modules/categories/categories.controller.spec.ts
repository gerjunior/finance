import { Test, TestingModule } from '@nestjs/testing';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import FakeCategoriesRepository from './repositories/fakes/categories.fake-repository';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService, { provide: 'CategoriesRepository', useClass: FakeCategoriesRepository }],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

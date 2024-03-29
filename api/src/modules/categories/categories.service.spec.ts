import { Test, TestingModule } from '@nestjs/testing';

import { CategoriesService } from './categories.service';
import FakeCategoriesRepository from './repositories/fakes/categories.fake-repository';

const id = '1';
const date = '2022-10-29T00:00:00.000Z';

jest.mock('node:crypto', () => ({
  randomUUID: () => id,
}));
jest.useFakeTimers().setSystemTime(new Date(date));

describe('CategoriesService', () => {
  let service: CategoriesService;
  let categoriesRepository: FakeCategoriesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService, { provide: 'CategoriesRepository', useClass: FakeCategoriesRepository }],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    categoriesRepository = module.get<FakeCategoriesRepository>('CategoriesRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getAll', () => {
    it('should be able to get all the categories', async () => {
      categoriesRepository.create({ name: 'House' });
      categoriesRepository.create({ name: 'Medical' });

      const result = await service.getAll();

      expect(result.length).toEqual(2);
    });
  });

  describe('#get', () => {
    it('should be able to get a category', async () => {
      const data = { name: 'House' };
      categoriesRepository.create(data);

      const result = await service.get(id);
      expect(result).toMatchObject(data);
    });
  });

  describe('#create', () => {
    it('should be able to create a new category', async () => {
      const data = { name: 'House' };
      const result = await service.create(data);
      expect(result).toEqual({
        id: '1',
        name: 'House',
        createdAt: date,
        updatedAt: date,
      });
    });

    it('should throw when creating a category that already exists', async () => {
      categoriesRepository.create({ name: 'House' });
      const data = { name: 'House' };
      await expect(service.create(data)).rejects.toThrow('There is already a category with this name');
    });
  });

  describe('#patch', () => {
    it('should not be able to update a category that does not exist', async () => {
      await expect(service.patch('1 ', { name: 'House' })).rejects.toThrow('Category not found');
    });

    it('should not be able to update a category with the same name of an existing one', async () => {
      categoriesRepository.create({ id: '1', name: 'House' });
      categoriesRepository.create({ id: '2', name: 'Housing' });
      await expect(service.patch('1', { name: 'Housing' })).rejects.toThrow('There is already a category with this name');
    });
    it('should be able to update a category', async () => {
      categoriesRepository.create({ name: 'House' });
      await expect(service.patch('1', { name: 'Housing' })).resolves.toEqual({
        createdAt: date,
        id: '1',
        name: 'Housing',
        updatedAt: date,
      });
    });
  });

  describe('#delete', () => {
    it('should be able to delete a category', async () => {
      categoriesRepository.create({ name: 'House' });

      await expect(service.delete(id)).resolves.toBeUndefined();
      const categories = await categoriesRepository.getAll();
      expect(categories.length).toEqual(0);
    });

    it('should return normally if the resource has already been deleted', async () => {
      await expect(service.delete(id)).resolves.toBeUndefined();
    });
  });
});

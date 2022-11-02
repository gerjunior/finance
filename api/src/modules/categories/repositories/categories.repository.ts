import { Prisma, Category } from '@prisma/client';

interface ICategoriesRepository {
  getAll: () => Promise<Category[]>;
  get: (id: string) => Promise<Category | undefined>;
  getByName: (name: string) => Promise<Category | undefined>;
  create: (data: Prisma.CategoryCreateInput) => Promise<Category>;
  update: (id: string, data: Prisma.CategoryUpdateInput) => Promise<Category>;
  delete: (id: string) => Promise<void>;
}
export default ICategoriesRepository;

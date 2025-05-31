import { Category } from "@prisma/client";

export interface ICategoryModel {
  create(category: Category): Promise<Category>;
  update(id: string, category: Category): Promise<Category>;
  delete(id: string): Promise<Category>;
  findById(id: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
}

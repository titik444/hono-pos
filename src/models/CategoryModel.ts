import { Category, PrismaClient } from "@prisma/client";
import { ICategoryModel } from "./interfaces/ICategoryModel";
import prisma from "../utils/prismaClient";

class CategoryModel implements ICategoryModel {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  create(category: Category): Promise<Category> {
    return this.prisma.category.create({ data: category });
  }

  update(id: string, category: Category): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: {
        name: category.name,
      },
    });
  }

  delete(id: string): Promise<Category> {
    return this.prisma.category.delete({ where: { id } });
  }

  findById(id: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  findAll(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }
}

export default new CategoryModel();

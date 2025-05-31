import { Context } from "hono";
import { categoryValidation } from "../validations/CategoryValidation";
import Log from "../utils/Logger";
import CategoryModel from "../models/CategoryModel";
import { Category } from "@prisma/client";

class CategoryController {
  async createCategory(c: Context) {
    try {
      const body = await c.req.json();
      const { name } = await categoryValidation.parse(body);
      const category = await CategoryModel.create({
        name,
      } as Category);

      return c.json(
        { message: "Category created successfully", data: category },
        201
      );
    } catch (error) {
      Log.error(
        "Error ./controllers/CategoryController.createCategory " + error
      );
      if (error instanceof Error) {
        let message = error.message;
        try {
          message = JSON.parse(error.message)[0].message;
        } catch {
          message = error.message;
        }
        return c.json({ message, data: null }, 400);
      } else {
        return c.json({ message: "Internal Server Error", data: null }, 500);
      }
    }
  }

  async getAllCategory(c: Context) {
    try {
      const categories = await CategoryModel.findAll();
      return c.json({ message: "Get categories success", data: categories });
    } catch (error) {
      Log.error(
        "Error ./controllers/CategoryController.getCategories " + error
      );
      return c.json({ message: "Internal Server Error", data: null }, 500);
    }
  }

  async getCategoryById(c: Context) {
    try {
      const id = c.req.param("id");
      const category = await CategoryModel.findById(id);
      return c.json({ message: "Get category success", data: category });
    } catch (error) {
      Log.error("Error ./controllers/CategoryController.getCategory " + error);
      return c.json({ message: "Internal Server Error", data: null }, 500);
    }
  }

  async updateCategory(c: Context) {
    try {
      const id = c.req.param("id");
      const body = await c.req.json();
      const { name } = await categoryValidation.parse(body);
      const category = await CategoryModel.update(id, {
        name,
      } as Category);
      return c.json({ message: "Update category success", data: category });
    } catch (error) {
      Log.error(
        "Error ./controllers/CategoryController.updateCategory " + error
      );
      return c.json({ message: "Internal Server Error", data: null }, 500);
    }
  }

  async deleteCategory(c: Context) {
    try {
      const id = c.req.param("id");
      const category = await CategoryModel.delete(id);
      return c.json({ message: "Delete category success", data: category });
    } catch (error) {
      Log.error(
        "Error ./controllers/CategoryController.deleteCategory " + error
      );
      return c.json({ message: "Internal Server Error", data: null }, 500);
    }
  }
}

export default new CategoryController();

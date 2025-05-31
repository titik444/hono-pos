import { Hono } from "hono";
import CategoryController from "../controllers/CategoryController";
// import AccessValidation from "../validations/AccessValidation";

const categoryRoute = new Hono();

// categoryRoute.use("/category/*", AccessValidation.validateAccessToken);
categoryRoute.post("/category", CategoryController.createCategory);
categoryRoute.put("/category/:id", CategoryController.updateCategory);
categoryRoute.get("/category", CategoryController.getAllCategory);
categoryRoute.get("/category/:id", CategoryController.getCategoryById);
categoryRoute.delete("/category/:id", CategoryController.deleteCategory);

export default categoryRoute;

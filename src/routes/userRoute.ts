import { Hono } from "hono";
import UserController from "../controllers/UserController";
import AccessValidation from "../validations/AccessValidation";

const userRoute = new Hono();

userRoute.post("/auth/login", UserController.verifyUser);
userRoute.get("/auth/refresh", UserController.refreshToken);

userRoute.get(
  "/auth/me",
  AccessValidation.validateAccessToken,
  UserController.getCurrentUser
);

export default userRoute;

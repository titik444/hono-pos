import { Hono } from "hono";
import UserController from "../controllers/UserController";

const userRoute = new Hono();

userRoute.post("/auth/login", UserController.verifyUser);
userRoute.get("/auth/refresh", UserController.refreshToken);

export default userRoute;

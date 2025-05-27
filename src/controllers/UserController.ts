import { Context } from "hono";
import { loginValidation } from "../validations/UserValidation";
import Log from "../utils/Logger";
import UserModel from "../models/UserModel";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/Jwt";

class UserController {
  async verifyUser(c: Context) {
    try {
      const data = await c.req.json();
      const { email, password } = await loginValidation.parse(data);
      // check user existing
      const userCheck = await UserModel.findByEmail(email);
      if (!userCheck) {
        return c.json({ message: "User not found", data: null }, 404);
      }
      // process login
      const user = await UserModel.verifyUser(email, password);
      let token = null;
      let refreshToken = null;
      if (!user) {
        return c.json(
          { message: "Invalid email or password", data: null },
          400
        );
      }
      token = await generateAccessToken(user);
      refreshToken = await generateRefreshToken(user);
      return c.json(
        {
          message: "User logged in successfully",
          data: { ...user, token, refreshToken },
        },
        200
      );
    } catch (error) {
      Log.error("Error ./controllers/UserController.getUser " + error);
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

  async refreshToken(c: Context) {
    const authHeader = c.req.header("Authorization");
    const tokenRefresh = authHeader?.split(" ")[1];
    // check if token is present
    if (!tokenRefresh) {
      return c.json({ message: "Unauthorized", data: null }, 401);
    }
    try {
      const payload = await verifyRefreshToken(tokenRefresh);
      const user = await UserModel.findById(Number(payload.id));
      if (!user) {
        return c.json({ message: "Unauthorized", data: null }, 401);
      }
      const token = await generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);
      return c.json({
        message: "Token refreshed successfully",
        data: { ...user, token, refreshToken },
      });
    } catch {
      return c.json({ message: "Unauthorized", data: null }, 401);
    }
  }
}

export default new UserController();

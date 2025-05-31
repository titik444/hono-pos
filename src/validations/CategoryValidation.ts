import { z, ZodType } from "zod";

export const categoryValidation: ZodType = z.object({
  name: z
    .string()
    .min(1, { message: "Category name is required" })
    .max(255, { message: "Category name must be at most 255 characters long" }),
});

import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters"),

    email: z
      .string()
      .email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });



export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Product name must be at least 3 characters"),

  sku: z
    .string()
    .min(3, "SKU is required"),

  description: z
    .string()
    .min(5, "Description is required"),

  category: z
    .string()
    .min(1, "Category is required"),

  price: z
    .number({
      error: "Price is required",
    })
    .min(0),

  quantity: z
    .number({
      error: "Quantity is required",
    })
    .min(0),
});

export const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Category name must be at least 3 characters"),

  description: z
    .string()
    .min(5, "Description is required"),
});
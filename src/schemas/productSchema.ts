import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  price: z
    .number()
    .min(0.01, "Price must be greater than 0"),
  stockQuantity: z
    .number()
    .min(0, "Stock cannot be negative"),
  categoryId: z
    .number()
    .min(1, "Please select a category"),
});

export type ProductSchemaType = z.infer<typeof productSchema>;

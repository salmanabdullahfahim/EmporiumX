import { z } from "zod";

const createProduct = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  discount: z.number().min(0, "Discount must be a positive number").optional(),
  categoryId: z.string(),
  inventory: z
    .number()
    .int()
    .min(0, "Inventory must be a non-negative integer"),
  images: z.array(z.string()).optional(),
  vendorId: z.string(),
});

export const ProductValidation = { createProduct };

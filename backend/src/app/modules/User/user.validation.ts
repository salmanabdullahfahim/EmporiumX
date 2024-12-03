import { z } from "zod";

const createAdmin = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  admin: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    email: z.string({
      required_error: "Email is required!",
    }),
  }),
});
const createVendor = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  vendor: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    email: z.string({
      required_error: "Email is required!",
    }),
  }),
});

const createCustomer = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  customer: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    email: z.string({
      required_error: "Email is required!",
    }),
  }),
});

export const userValidation = {
  createAdmin,
  createVendor,
  createCustomer,
};

import { z } from "zod";

export const BannerValidation = z.object({
  title: z.string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title cannot exceed 100 characters" })
    .nonempty({ message: "Title is required" }),

  description: z.string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(500, { message: "Description cannot exceed 500 characters" })
    .nonempty({ message: "Description is required" }),
  buttons: z.array(z.object({
    name: z.string().min(1, { message: "Button Name is Required" }),
    route: z.string().min(1, { message: "Route is Required" }),
  })),
  imageId: z.number().optional(),
});

export type BannerValidationType = z.infer<typeof BannerValidation>;


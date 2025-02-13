import { z } from "zod";

export const BannerValidation = z.object({
  title: z.string().min(1, { message: "Title is Required" }),
  description: z.string().min(1, { message: "Description is Required" }),
  buttons: z.array(z.object({
    name: z.string().min(1, { message: "Button Name is Required" }),
    route: z.string().min(1, { message: "Route is Required" }),
  })),
  imageId: z.number().optional(),
});

export type BannerValidationType = z.infer<typeof BannerValidation>;


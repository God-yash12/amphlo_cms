import { z } from "zod";

export const HomeAboutValidation = z.object({
  title: z.string().nonempty("Title is required"),
  mainTitle: z.string().optional(),
  description: z.string().nonempty("Description is required"),
  listTitle: z.string().optional(),
  listItem: z.array(
    z.object({
      list: z.string().optional(),
    })
  ).optional(),
  image: z.number().optional(),
});

export type HomeAboutValidationData = z.infer<typeof HomeAboutValidation>;

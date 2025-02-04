import { z } from "zod";

export const KeyFeaturesValidation = z.object({
  title: z.string().min(1, {message: "Title is Required!"}),
  description: z.string().min(1, {message: "Description is Required!"})
});

export type KeyFeaturesFormData = z.infer<typeof KeyFeaturesValidation>;

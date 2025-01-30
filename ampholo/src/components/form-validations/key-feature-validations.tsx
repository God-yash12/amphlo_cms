import { z } from "zod";

export const KeyFeaturesValidation = z.object({
  title: z.string(),
  description: z.string(),
  cardTitle: z.string(),
  cardDescription: z.string(),
  image: z
  .instanceof(File)
  .refine((file) => file.size <= 10 * 1024 * 1024, {
    message: 'File must be less than 5MB', 
  })
  .refine(
    (file) =>
      ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type),
    { message: 'Only JPG, JPEG, and PNG files are allowed' }
  ),
});

export type KeyFeaturesFormData = z.infer<typeof KeyFeaturesValidation>;

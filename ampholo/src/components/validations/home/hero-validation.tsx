
import { z } from "zod";

export const HeroSectionValidation = z.object({
    title: z.string().nonempty({ message: "Title is Required" }),
    description: z.string().nonempty({ message: "Description is Required" }),
    buttons: z.array(z.object({
        name: z.string().optional(),
        route: z.string().optional(),
    })),
    imageId: z.number().nullable().optional()
});

export type THeroSectionValidation = z.infer<typeof HeroSectionValidation>;
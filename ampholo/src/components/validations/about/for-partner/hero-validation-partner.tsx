
import { z } from "zod";

export const PartnerHeroValidation = z.object({
    title: z.string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(100, { message: "Title cannot exceed 100 characters" })
        .nonempty({ message: "Title is required" }),

    description: z.string()
        .min(10, { message: "Description must be at least 10 characters long" })
        .max(500, { message: "Description cannot exceed 500 characters" })
        .nonempty({ message: "Description is required" }),
    buttons: z.array(z.object({
        name: z.string().nonempty({ message: "Button name is Required" }),
        route: z.string().nonempty({ message: "Button Route is Required" }),
    })),
    image: z.number().optional(),
});

export type PartnerHeroValidationData = z.infer<typeof PartnerHeroValidation>;
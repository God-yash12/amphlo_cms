
import { z } from "zod";

export const FeatureCardValidation = z.object({
    id: z.number().optional(),
    title: z.string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(100, { message: "Title cannot exceed 100 characters" })
        .nonempty({ message: "Title is required" }),

    description: z.string()
        .min(10, { message: "Description must be at least 10 characters long" })
        .max(500, { message: "Description cannot exceed 500 characters" })
        .nonempty({ message: "Description is required" }),
    image: z.number({ message: "Image is Required" })
})

export type FeatureCardData = z.infer<typeof FeatureCardValidation>
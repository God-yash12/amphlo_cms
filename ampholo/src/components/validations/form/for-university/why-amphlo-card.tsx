
import { z } from "zod";

export const WhyAmphloCardValidation = z.object({
    title: z.string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(100, { message: "Title cannot exceed 100 characters" })
        .nonempty({ message: "Title is required" }),

    description: z.string()
        .min(10, { message: "Description must be at least 10 characters long" })
        .max(500, { message: "Description cannot exceed 500 characters" })
        .nonempty({ message: "Description is required" }),
    image: z.number().min(1, { message: "please upload one image"})
})

export type WhyAmphloCardData = z.infer<typeof WhyAmphloCardValidation>

import { z } from "zod";

export const UniHeroValidation = z.object({
    title: z.string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(100, { message: "Title cannot exceed 100 characters" })
        .nonempty({ message: "Title is required" }),

    subTitle: z.string()
        .min(10, { message: "subTitle must be at least 10 characters long" })
        .max(200, { message: "subTitle cannot exceed 200 characters" })
        .nonempty({ message: "subTitle is required" }),
    image: z.number().nullable().optional()
})

export type UniHeroValidationData = z.infer<typeof UniHeroValidation>
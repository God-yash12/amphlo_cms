
import { z } from "zod";

export const JourneyValidation = z.object({
    title: z.string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(100, { message: "Title cannot exceed 100 characters" })
        .nonempty({ message: "Title is required" }),

    description: z.string()
        .min(10, { message: "Description must be at least 10 characters long" })
        .max(500, { message: "Description cannot exceed 500 characters" })
        .nonempty({ message: "Description is required" }),
    cardDetail: z.array(
        z.object({
            count: z.number({ message: "number is Required" }),
            cardTitle: z.string().min(1, { message: "Journey Title is Required" }),
            cardDescription: z.string().min(1, { message: "Journey Description is Required" })
        })
    ).optional()
})

export type JourneyValidationData = z.infer<typeof JourneyValidation>
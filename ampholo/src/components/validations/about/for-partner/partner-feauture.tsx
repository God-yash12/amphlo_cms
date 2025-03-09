
import { z } from "zod";

export const PartnerFeatureValidation = z.object({
    featureTitle: z.string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(100, { message: "Title cannot exceed 100 characters" })
        .nonempty({ message: "Title is required" }),

    featureDescription: z.string()
        .min(10, { message: "Description must be at least 10 characters long" })
        .max(500, { message: "Description cannot exceed 500 characters" })
        .nonempty({ message: "Description is required" }),
    image: z.number().min(1, { message: "Image is Required" }),
    feature: z.array(z.object({
        title: z.string().nonempty({ message: "Title is Required" }),
        description: z.string().nonempty({ message: "Description is Required" }),
    }))
})

export type PartnerFeatureValidationData = z.infer<typeof PartnerFeatureValidation>
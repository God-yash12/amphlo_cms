
import { z } from "zod";

export const PartnerFeatureValidation = z.object({
    featureTitle: z.string().nonempty({ message: "FeatureTitle is Required" }),
    featureDescription: z.string().nonempty({ message: " Feature Description is Required" }),
    image: z.number().min(1, { message: "Image is Required" }),
    feature: z.array(z.object({
        title: z.string().nonempty({ message: "Title is Required" }),
        description: z.string().nonempty({ message: "Description is Required" }),
    }))
})

export type PartnerFeatureValidationData = z.infer<typeof PartnerFeatureValidation>
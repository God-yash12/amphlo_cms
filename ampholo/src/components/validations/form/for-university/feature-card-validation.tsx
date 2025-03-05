
import { z }  from "zod";

export const UniFeatureCardValidation = z.object({
    title: z.string().nonempty({message: "Title is Required"}),
    description : z.string().nonempty({message: "Description is Required"}),
    image:z.number().optional()
})

export type UniFeatureCardValidationData = z.infer<typeof UniFeatureCardValidation>
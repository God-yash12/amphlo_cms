
import { z }  from "zod";

export const FeatureCardValidation = z.object({
    title: z.string().nonempty({message: "Title is Required"}),
    description : z.string().nonempty({message: "Description is Required"}),
    image: z.number({message: "Image is Required"})
})

export type FeatureCardData = z.infer<typeof FeatureCardValidation>
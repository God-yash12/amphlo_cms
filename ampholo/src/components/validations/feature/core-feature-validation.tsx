
import { z }  from "zod";

export const CoreFeatureValidation = z.object({
    title: z.string().nonempty({message: "Title is Required"}),
    mainTitle: z.string(),
    description : z.string().nonempty({message: "Description is Required"}),
})

export type CoreFeatureValidationData = z.infer<typeof CoreFeatureValidation>

import { z }  from "zod";

export const FeatureHeroValidation = z.object({
    title: z.string().nonempty({message: "Title is Required"}),
    description : z.string().nonempty({message: "SubTitle is Required"}),
    image: z.number().optional(),
    buttons: z.array(
        z.object({
            name: z.string().optional(),
            route: z.string().optional(),
        })
    ).optional()
})

export type FeatureHeroValidationData = z.infer<typeof FeatureHeroValidation>
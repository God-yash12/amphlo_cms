import { z } from "zod";


export const PortalHeroValidation = z.object({
    title: z.string().nonempty({message: "Title is Required"}),
    subTitle : z.string().nonempty({message: "SubTitle is Required"}),
    imageId: z.number().min(1, {message: "Image is Required"})
    
})

export type PortalHeroValidationData = z.infer<typeof PortalHeroValidation>
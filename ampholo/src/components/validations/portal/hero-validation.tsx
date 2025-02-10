import { z } from "zod";


export const PortalHeroValidation = z.object({
    title: z.string().nonempty({message: "Title is Required"}),
    subTitle : z.string().nonempty({message: "SubTitle is Required"}),
    image: z.number()
    
})

export type PortalHeroValidationData = z.infer<typeof PortalHeroValidation>
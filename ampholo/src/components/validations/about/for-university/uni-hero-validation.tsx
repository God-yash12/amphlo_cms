
import { z }  from "zod";

export const UniHeroValidation = z.object({
    title: z.string().nonempty({message: "Title is Required"}),
    subTitle : z.string().nonempty({message: "Description is Required"}),
    image: z.number().min(1, {message: "Image is Required"})
})

export type UniHeroValidationData = z.infer<typeof UniHeroValidation>
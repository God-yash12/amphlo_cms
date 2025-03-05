
import { z }  from "zod";

export const WhyAmphloCardValidation = z.object({
    title: z.string().nonempty({message: "Title is Required"}),
    description : z.string().nonempty({message: "Description is Required"}),
    image: z.number().optional()
})

export type WhyAmphloCardData = z.infer<typeof WhyAmphloCardValidation>
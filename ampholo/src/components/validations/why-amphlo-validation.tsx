import { z } from "zod";

export const WhyAmphloValidation = z.object({
    title: z.string().nonempty({message: "Title is Required"}),
    mainTitle: z.string().nonempty({message: "Main title is Required"}),
    description: z.string().nonempty({message: "Description is Required"}),
    image: z.number()
})

export type WhyAmphloFormData = z.infer<typeof WhyAmphloValidation>
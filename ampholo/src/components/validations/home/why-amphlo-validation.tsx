import { z } from "zod";

export const WhyAmphloValidation = z.object({
    title: z.string().nonempty({message: "Title is Required"}),
    mainTitle: z.string().nonempty({message: "Main title is Required"}),
    description: z.string().nonempty({message: "Description is Required"}),
    imageId: z.number().optional(),
    lists: z.array(
        z.object({
            listTitle: z.string().optional()
        })
    )

})

export type WhyAmphloFormData = z.infer<typeof WhyAmphloValidation>
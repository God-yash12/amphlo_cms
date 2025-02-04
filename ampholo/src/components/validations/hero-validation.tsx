
import { z } from "zod";

export const HeroSectionValidation = z.object({
    title: z.string().nonempty({message: "Title is Required"}),
    description: z.string().nonempty({message: "Description is Required"}),
    image: z.number().optional(),
    buttons: z.array().optional()

})
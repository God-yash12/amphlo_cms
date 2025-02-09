
import { z } from "zod";

export const JourneyValidation = z.object({
    title: z.string().nonempty({message: "Title is Required"}),
    description:z.string().nonempty({message: "Description is Required"}),
    cardDetail: z.array(
        z.object({
            count: z.number({message: "number is Required"}),
            cardTitle: z.string().min(1, {message: "Journey Title is Required"}),
            cardDescription: z.string().min(1, {message: "Journey Description is Required"})
        })
    ).optional()
})

export type JourneyValidationData = z.infer<typeof JourneyValidation>
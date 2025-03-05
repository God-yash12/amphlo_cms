
import { z } from "zod";

export const JoinNowValidation = z.object({
    title: z.string().nonempty({message: "Title is Required"}),
    description: z.string().nonempty({message: "Description is Required"}),
    buttons: z.array(z.object({
        name: z.string().nonempty({message: "Button is Required"}),
        route: z.string().nonempty({message: "Please select a Route"})
    }))
})

export type JoinNowValidationData = z.infer<typeof JoinNowValidation>
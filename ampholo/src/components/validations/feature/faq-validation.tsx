
import { z } from "zod";

export const FAQValidation = z.object({
    question: z.string().nonempty({message: "Quetion is Required"}).min(10, {message: "Minimum 10 character"}).max(200,{message: "Maximum Length 200 characters only"}),
    answer: z.string().nonempty({message: "Answer is Required"}).min(10, {message: "Minimum 10 character"}).max(600,{message: "Maximum Length 600 character only"})
})

export type FAQValidationData = z.infer<typeof FAQValidation>
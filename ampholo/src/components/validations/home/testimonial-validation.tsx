
import { z } from "zod";

export const TestimonialsValidation = z.object({
    personName: z.string().nonempty({message: "Name is Required"}),
    workPlace: z.string().nonempty({message: "Work Place is Required"}),
    feedback: z.string().nonempty({message: "Please Provide us Your Feedback"}),
    image: z.number().optional(),
    ratings: z.number({message: "Please Provide us ratings"})
})

export type TestimonialsValidationData = z.infer<typeof TestimonialsValidation>
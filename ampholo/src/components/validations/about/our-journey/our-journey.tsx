import { z } from "zod";

export const AboutMoreValidation = z.object({
    aboutMore: z.array(z.object({
        title: z.string().nonempty({ message: "Title is Required" }),
        description: z.string().nonempty({ message: "Description is Required" }),
        year: z.string().nonempty({message: 'Please select a Date'}),
        image: z.number().min(1, { message: "At least one image is required" })
    })).min(1, {message: "AT least one field is Required!!"})
})


export type AboutMoreValidationData = z.infer<typeof AboutMoreValidation>
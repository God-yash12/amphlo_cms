import { z } from "zod";

export const AboutMoreValidation = z.object({
    aboutMore: z.array(z.object({
        title: z.string().nonempty({ message: "Title is Required" }),
        description: z.string().nonempty({ message: "Description is Required" }),
        year: z.date(),
        image: z.number().optional()
    })).min(1, {message: "AT least one field is Required!!"})
})


export type AboutMoreValidationData = z.infer<typeof AboutMoreValidation>
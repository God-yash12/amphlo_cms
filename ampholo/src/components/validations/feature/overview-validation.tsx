import { z } from "zod";

export const OverViewValidation = z.object({
    overview: z.array(z.object({
        title: z.string().nonempty({ message: "Title is Required" }),
        description: z.string().nonempty({ message: "Description is Required" }),
        image: z.number({ message: 'Image is  Required' })
    })).min(1, {message: "At least one field is Required!!"})
})

export type OverViewValidationData = z.infer<typeof OverViewValidation>
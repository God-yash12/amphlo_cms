
import { z }  from "zod";

export const UniWhyChooseValidation = z.object({
    title: z.string().nonempty({message: "Title is Required"}),
    description : z.string().nonempty({message: "Description is Required"}),
})

export type UniWhyChooseValidationData = z.infer<typeof UniWhyChooseValidation>
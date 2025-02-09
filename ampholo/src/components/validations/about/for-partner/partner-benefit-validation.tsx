
import { z }  from "zod";

export const PartnerBenefitValidation = z.object({
    title: z.string().nonempty({message: "Title is Required"}),
    description : z.string().nonempty({message: "Description is Required"}),
    image: z.number({message: "Please Upload a Image"})
})

export type PartnerBenefitValidationData = z.infer<typeof PartnerBenefitValidation>
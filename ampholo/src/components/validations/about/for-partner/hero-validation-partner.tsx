
import { z } from "zod";

export const PartnerHeroValidation = z.object({
    title: z.string().nonempty({ message: "Title is Required" }),
    description: z.string().nonempty({ message: "Description is Required" }),
    buttons: z.array(z.object({
        name: z.string().nonempty({message: "Button name is Required"}),
        route: z.string().nonempty({message: "Button Route is Required"}),
    })),
    image: z.number().optional(),
});

export type PartnerHeroValidationData = z.infer<typeof PartnerHeroValidation>;
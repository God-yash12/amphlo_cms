import { z } from "zod";

export const countriesValidation = z.object({
    title: z.string().nonempty({ message: "Name is required" }),
    description: z.string().nonempty({ message: "Description is required" }),
    image: z.number({message: "Image is required"}),
    buttons: z.array(z.object({
        name: z.string().nonempty({ message: "Name is required" }),
        route: z.string().nonempty({ message: "Route is required" }),
    })),


});

export type CountriesValidationData = z.infer<typeof countriesValidation>;


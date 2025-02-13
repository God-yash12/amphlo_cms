import { z } from "zod";

export const TransformValidation = z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("Description is required"),
    buttons: z.array(z.object({
        name: z.string().nonempty("Name is required"),
        route: z.string().nonempty("Route is required"),
    })),
    imageId: z.number().optional(),
})

export type TransformValidationType = z.infer<typeof TransformValidation>;

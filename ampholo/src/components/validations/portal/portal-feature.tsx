import { z } from "zod";

export const PortalFeatureValidation = z.object({
    title: z.string().nonempty("Title is required"),
    mainTitle: z.string().optional(),
    description: z.string().nonempty("Description is required"),
    listTitle: z.string().optional(),
    listItem: z.array(
        z.object({
            list: z.string().optional(),
        })
    ).optional(),
    imageId: z.number().min(1, {message: "Image is Required"}),
});

export type PortalFeatureValidationData = z.infer<typeof PortalFeatureValidation>;

import { z } from "zod";

export const PortalAccessValidation = z.object({
    title: z.string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(100, { message: "Title cannot exceed 100 characters" })
        .nonempty({ message: "Title is required" }),

    description: z.string()
        .min(10, { message: "Description must be at least 10 characters long" })
        .max(500, { message: "Description cannot exceed 500 characters" })
        .nonempty({ message: "Description is required" }),
    process: z.array(
        z.object({
            processCount: z.number(),
            processTitle: z.string().nonempty({ message: "Title is Required" }),
            processDescription: z.string().nonempty({ message: "Process Description is Required" })
        })
    )

})

export type PortalAccessFormData = z.infer<typeof PortalAccessValidation>
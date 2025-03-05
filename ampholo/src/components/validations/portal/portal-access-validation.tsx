import { z } from "zod";

export const PortalAccessValidation = z.object({
    title: z.string().nonempty({ message: "Title is Required" }),
    description: z.string().nonempty({ message: "Description is Required" }),
    process: z.array(
        z.object({
            processCount: z.number(),
            processTitle: z.string().nonempty({ message: "Title is Required" }),
            processDescription: z.string().nonempty({ message: "Process Description is Required" })
        })
    )

})

export type PortalAccessFormData = z.infer<typeof PortalAccessValidation>
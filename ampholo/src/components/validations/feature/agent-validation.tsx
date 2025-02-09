
import { z } from "zod";

export const AgentProcessValidation = z.object({
    title: z.string().nonempty({message: "Title is Required"}),
    description:z.string(),
    process: z.array(
        z.object({
            processNumber: z.number({message: "number is Required"}),
            processTitle: z.string().min(1, {message: "Process Title is Required"}),
            processDescription: z.string().min(1, {message: "Process Description is Required"})
        })
    ).optional()
})

export type AgentProcessValidationData = z.infer<typeof AgentProcessValidation>

import { z } from "zod";

export const AgentProcessValidation = z.object({
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
            processNumber: z.number({ message: "number is Required" }),
            processTitle: z.string().min(1, { message: "Process Title is Required" }),
            processDescription: z.string().min(1, { message: "Process Description is Required" })
        })
    ).optional()
})

export type AgentProcessValidationData = z.infer<typeof AgentProcessValidation>
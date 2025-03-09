import { z } from "zod";

export const CounterValidation = z.object({
    title: z.string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(100, { message: "Title cannot exceed 100 characters" })
        .nonempty({ message: "Title is required" }),

    description: z.string()
        .min(10, { message: "Description must be at least 10 characters long" })
        .max(500, { message: "Description cannot exceed 500 characters" })
        .nonempty({ message: "Description is required" }),

    countryCount: z.number().min(1, { message: "Country count is required" }),
    countryCountSubTitle: z.string().min(1, { message: "Country count sub title is required" }),
    agentCount: z.number().min(1, { message: "Agent count is required" }),
    agentCountSubTitle: z.string().min(1, { message: "Agent count sub title is required" }),
    studentsCount: z.number().min(1, { message: "Students count is required" }),
    studentsCountSubTitle: z.string().min(1, { message: "Students count sub title is required" }),
    partnerRatingCount: z.number().min(1, { message: "Partner rating count is required" }),
    partnerRatingSubTitle: z.string().min(1, { message: "Partner rating sub title is required" }),

})

export type CounterValidationType = z.infer<typeof CounterValidation>;

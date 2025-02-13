import { z } from "zod";

export const CounterValidation = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),

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

import { z } from "zod";

export const WhyAmphloValidation = z.object({
    whyAMPHLO: z.string(),
    mainTitle: z.string(),
    description: z.string(),
    studentManagementTitle: z.string(),
    studentManagementDescription: z.string(),
    CRMThemeTitle: z.string(),
    CRMThemeDescription: z.string(),
    coursesTitle: z.string(),
    coursesDescription: z.string(),
    image: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
        message: "Image is required",
    })
    .refine((file) => {
        const validTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/svg+xml",
        ];
        return validTypes.includes(file.type);
    }, {
        message: "Invalid file type. Allowed types: JPEG, PNG, GIF, SVG.",
    })
    .refine((file) => file.size <= 10 * 1024 * 1024, {
        message: "File size must be less than 10MB.",
    }),
})

export type WhyAmphloFormData = z.infer<typeof WhyAmphloValidation>
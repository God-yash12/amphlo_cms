
import { z }  from "zod";

export const UniAboutFeatures = z.object({
    title: z.string().nonempty({message: "Title is Required"}),
    description : z.string().nonempty({message: "Description is Required"}),
})

export type UniAboutFeaturesData = z.infer<typeof UniAboutFeatures>
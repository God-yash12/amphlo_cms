
import { z } from "zod";
export const HomeAboutValidation = z.object({
    title: z.string().nonempty("Title is required"),
    mainTitle: z.string().optional(),
    description: z.string().nonempty("Description is required"),
    listTitle: z.string().optional(),
    listItem: z.string().optional(), 
    image: z.number()
  });  

export type HomeAboutValidationData = z.infer<typeof HomeAboutValidation>
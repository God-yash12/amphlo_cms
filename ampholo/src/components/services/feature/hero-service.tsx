import { useForm } from "react-hook-form"
import { UseAxiosPrivate } from "../../../auth/home_auth"
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeatureHeroValidation, FeatureHeroValidationData } from "../../validations/feature/hero-valiadtion";


export const UseHeroService = () => {
    const axiosPrivate = UseAxiosPrivate()

    const form = useForm<FeatureHeroValidationData>({
        resolver: zodResolver(FeatureHeroValidation)
    })

    const mutation = useMutation({
        mutationFn: async (data: FeatureHeroValidationData) => {
            const response = await axiosPrivate.patch('features-hero', data);
            return response;
        },
        onSuccess: () => {
            form.reset()
            toast.success("Feature Hero Section Customized Successfully")
        },
        onError: (error: any) => {
            toast.error(`Failed to Update the Hero Section ${error.message}`)
        }
    })

    const onSubmit = (data: FeatureHeroValidationData) => {
        mutation.mutate(data)
    }


    return { form, onSubmit, }
}
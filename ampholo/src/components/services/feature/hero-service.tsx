import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useAxios } from "../../../auth/home_auth"
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeatureHeroValidation, FeatureHeroValidationData } from "../../validations/feature/hero-valiadtion";

export const UseHeroService = () => {
    const axiosPrivate = useAxios()

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

    const { data, isLoading } = useQuery({
        queryKey: ["feature-hero"],
        queryFn: async () => {
            const response = await axiosPrivate.get('features-hero')
            return response.data
        }
    })
    useEffect(() => {
        if (data) {
            try {
                form.reset({
                    title: data.title,
                    description: data.description,
                    buttons: data.buttons?.map((button: any) => ({
                        name: button.name,
                        route: button.route
                    })),
                })
            } catch (error) {
                toast.error("Failed to fetch data")
            }
        }
    }, [data, form]);

    return { form, onSubmit, image: data?.image, isLoading, mutation }
}
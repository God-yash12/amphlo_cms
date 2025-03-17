import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useAxios } from "../../../auth/home_auth"
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { PortalHeroValidationData, PortalHeroValidation } from "../../validations/portal/hero-validation";


export const UsePortalHeroService = () => {
    const axiosPrivate = useAxios()

    const form = useForm<PortalHeroValidationData>({
        resolver: zodResolver(PortalHeroValidation)
    })

    const mutation = useMutation({
        mutationFn: async (data: PortalHeroValidationData) => {
            const response = await axiosPrivate.patch('portal-hero', data);
            return response;
        },
        onSuccess: () => {
            toast.success("Portal Hero Section Customized Successfully")
            form.reset()
        },
        onError: (error: any) => {
            toast.error(`Failed to Update the Hero Section ${error.message}`)
        }
    })

    const onSubmit = (data: PortalHeroValidationData) => {
        mutation.mutate(data)
    }

    const { data, isLoading } = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
            const response = await axiosPrivate.get("portal-hero");
            return response.data;
        }
    });

    useEffect(() => {
        if (data) {
            try {
                form.reset({
                    title: data.title,
                    subTitle: data.subTitle,
                })
                
            } catch (error) {
                console.log("Failed to fetch data")
            }
        }
    }, [data, form]);


    return { form, onSubmit, image: data?.image, isLoading, mutation }
}
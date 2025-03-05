import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { useAxios } from "../../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartnerHeroValidation, PartnerHeroValidationData } from "../../../validations/about/for-partner/hero-validation-partner";

export const PartnerHeroService = () => {
    const axiosPrivate = useAxios();


    const form = useForm<PartnerHeroValidationData>({
        resolver: zodResolver(PartnerHeroValidation),
        mode: "onChange",
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "buttons"
      });

    const { mutateAsync, isPending } = useMutation<any, Error, PartnerHeroValidationData>({
        mutationFn: async (data) => {
            const response = await axiosPrivate.patch("partner-hero", data);
            return response.data;
        },
        onSuccess: () => {
            form.reset();
            toast.success("Partner Hero Section Customized Successfully!", {
                position: "top-right",
            });
        },
        onError: (error: any) => {
            toast.error(`Failed to Update the Partner Hero Section ${error.message}`)
        },

    });

    const onSubmit = async (data: PartnerHeroValidationData) => {
        await mutateAsync(data);
    };

    const { data, isLoading } = useQuery({
        queryKey: ["partner-hero"],
        queryFn: async () => {
            const response = await axiosPrivate.get("partner-hero");
            return response.data;
        }
    })

    useEffect(() => {
      if(data){
        form.reset({
            title: data?.title,
            description: data?.description,
            buttons: data?.buttons?.map((button: any) => ({
                name: button.name,
                route: button.route
            })),
            image: data?.image
        })
      }
    }, [data])

    return {
        form,
        onSubmit,
        fields,
        append,
        remove,
        image: data?.image,
        isLoading,
        isPending,
    };
};

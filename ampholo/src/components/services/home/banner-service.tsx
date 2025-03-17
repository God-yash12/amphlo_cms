import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxios } from "../../../auth/home_auth";
import { toast } from "react-toastify";
import { BannerValidation, BannerValidationType } from "../../validations/home/banner-validation";
import { zodResolver } from "@hookform/resolvers/zod";


export const BannerService = () => {

    const  axiosPrivate  = useAxios();
    
    const form = useForm<BannerValidationType>({
        resolver: zodResolver(BannerValidation),
        mode: "onChange",
    });

    const {
        fields,
        append,
        remove,
      } = useFieldArray({
        control: form.control,
        name: "buttons"
      });

    const { mutateAsync, isPending} =  useMutation({
        mutationFn: async (data: BannerValidationType) => {
            const response = await axiosPrivate.patch("banner", data);
            return response;
        },
        onSuccess: () => {
            form.reset();
            toast.success("Banner section customized successfully!", {
                position: "top-right"
            })
        },
        onError: (error) => {
            toast.error(`Failed to submit banner form!!! ${error.message}`)
        }       
    })

    const onSubmit = async (data: BannerValidationType) => {
        await mutateAsync(data);
    };

    
    const {data, isLoading} = useQuery({
        queryKey: ["banner"],
        queryFn: async () => {
            const response = await axiosPrivate.get("banner");
            return response.data;
        }
    })

    useEffect(() => {
        try {
            form.reset({
                title: data?.title,
                description: data?.description,
                imageId: data?.image,
                buttons: data?.buttons?.map((button: any) => ({
                    name: button.name,
                    route: button.route,
                })),
            });
        } catch (error) {
            console.error("Error fetching banner data:", error);
        }
    }, [data]);

    return {
        form,
        onSubmit,
        image: data?.image,
        isLoading,
        fields,
        append,
        remove,
        isPending,
    };
}

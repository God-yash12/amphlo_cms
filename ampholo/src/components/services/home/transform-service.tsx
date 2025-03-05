import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxios } from "../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransformValidation, TransformValidationType } from "../../validations/home/transform-validation"; 

export const TransformService = () => {

    const axiosPrivate = useAxios();

    const form = useForm<TransformValidationType>({
        resolver: zodResolver(TransformValidation),
        mode: "onChange",
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "buttons",
    })

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: TransformValidationType) => {
            const response = await axiosPrivate.patch("transform", data);
            return response;
        },
        onSuccess: () => {
            form.reset();
            toast.success("Transform section customized successfully!", {
                position: "top-right"
            })
        },
        onError: (error) => {
            toast.error(`Failed to submit transform form!!! ${error.message}`)
        }
    })

    const onSubmit = async (data: TransformValidationType) => {
        await mutateAsync(data);
    };

    const { data, isLoading } = useQuery({
        queryKey: ["transform"],
        queryFn: async () => {
            const response = await axiosPrivate.get("transform");
            return response;
        }
    })

    useEffect(() => {
        try {
            form.reset({
                title: data?.data?.title,
                description: data?.data?.description,
                buttons: data?.data?.buttons?.map((button: any) => ({
                    name: button.name,
                    route: button.route,
                })),
            });
            
        } catch (error) {
            console.error("Error fetching transform data:", error);
        }
    }, [data, form]);

    
    return {
        form,
        onSubmit,
        image: data?.data?.image,
        fields,
        append,
        remove,
        isLoading,
        isPending,
    };
}

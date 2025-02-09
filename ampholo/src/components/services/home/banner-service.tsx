import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { UseAxiosPrivate } from "../../../auth/home_auth";
import { toast } from "react-toastify";

interface BannerFormData{
    title?: string;
    description?: string;
    buttons?: {
        name?: string;
        route?: string;
    }[];
    image?: number;
}

export const BannerService = () => {

    const  axiosPrivate  = UseAxiosPrivate();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<BannerFormData>({
        defaultValues: {
            title: "",
            description: "",
            buttons:[{
                name: "",
                route: "",
            },
            {
                name: "",
                route: "",
            }],
            image: 0,

        },
    });

    const { mutateAsync} =  useMutation({
        mutationFn: async (data: BannerFormData) => {
            const response = await axiosPrivate.patch("banner", data);
            return response;
        },
        onSuccess: () => {
            reset();
            toast.success("Banner section customized successfully!", {
                position: "top-right"
            })
        },
        onError: (error) => {
            toast.error(`Failed to submit banner form!!! ${error.message}`)
        }       
    })

    const onSubmit = async (data: BannerFormData) => {
        await mutateAsync(data);
        console.log(data, "data");
    };


    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        setValue,
    };
}

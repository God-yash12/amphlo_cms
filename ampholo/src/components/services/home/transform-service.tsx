import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { UseAxiosPrivate } from "../../../auth/home_auth";
import { toast } from "react-toastify";

interface TransformFormData {
    title?: string;
    description?: string;
    buttons?: {
        name?: string;
        route?: string;
    }[];
    image?: number;
}

export const TransformService = () => {

    const axiosPrivate = UseAxiosPrivate();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<TransformFormData>({
        defaultValues: {
            title: "",
            description: "",
            buttons: [{
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

    const { mutateAsync } = useMutation({
        mutationFn: async (data: TransformFormData) => {
            const response = await axiosPrivate.patch("transform", data);
            return response;
        },
        onSuccess: () => {
            reset();
            toast.success("Transform section customized successfully!", {
                position: "top-right"
            })
        },
        onError: (error) => {
            toast.error(`Failed to submit transform form!!! ${error.message}`)
        }
    })

    const onSubmit = async (data: TransformFormData) => {
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

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UseAxiosPrivate } from "../../../../auth/home_auth";

interface FormDataProps {
    title: string;
    description: string;
    image: number;
}

export const KeyFeaturesFormService = () => {
    const axiosPrivate = UseAxiosPrivate()

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm <FormDataProps> ({
        defaultValues: {
            title: "",
            description: "",
            image: 0
        }
    })

    const { mutateAsync } = useMutation({
        mutationFn: async (data: FormDataProps) => {
            const response = await axiosPrivate.post('key-feature-card', data);
            return response;
        },
        onSuccess: () => {
            reset()
            toast.success("Key Feature Card Updated successfully")
        },
        onError: (error) => {
            toast.error(`Failed to update the Card ${error.message}`)
        }
    })

    const onSubmit = async (data: FormDataProps) => {
        await mutateAsync(data)
    }

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        setValue,

    }
}
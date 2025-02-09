import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UseAxiosPrivate } from "../../../../auth/home_auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeatureCardValidation } from "../../../validations/feature/feature-card-validation";

interface FormDataProps {
    title: string;
    description: string;
    image: number;
}

export const CoreFeaturesFormService = () => {
    const axiosPrivate = UseAxiosPrivate()

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm <FormDataProps> ({
        resolver: zodResolver(FeatureCardValidation),
        defaultValues: {
            title: "",
            description: "",
        }
    })

    const { mutateAsync } = useMutation({
        mutationFn: async (data: FormDataProps) => {
            const response = await axiosPrivate.post('core-feature-card', data);
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
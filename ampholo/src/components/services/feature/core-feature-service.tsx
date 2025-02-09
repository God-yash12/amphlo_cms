import { useForm } from "react-hook-form"
import { UseAxiosPrivate } from "../../../auth/home_auth"
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { CoreFeatureValidation } from "../../validations/feature/core-feature-validation";

interface HeroDataProps {
    title: string;
    mainTitle?: string;
    description?: string;

}


export const UseCoreFeatureService = () => {
    const axiosPrivate = UseAxiosPrivate()

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<HeroDataProps>({
        resolver: zodResolver(CoreFeatureValidation),
        defaultValues: {
            title: "",
            description: "",
            mainTitle: "",
        }
    })

    const mutation = useMutation({
        mutationFn: async (data: HeroDataProps) => {
            const response = await axiosPrivate.patch('core-features', data);
            return response;
        },
        onSuccess: () => {
            reset()
            toast.success("Feature Core Feature Section Customized Successfully")
        },
        onError: (error: any) => {
            toast.error(`Failed to Update the Core Feature Section ${error.message}`)
        }
    })

    const onSubmit = (data: HeroDataProps) => {
        mutation.mutate(data)
    }

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        reset,
        setValue,
        errors,

    }
}
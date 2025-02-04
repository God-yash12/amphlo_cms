import { useForm } from "react-hook-form"
import { UseAxiosPrivate } from "../../../auth/home_auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { WhyAmphloFormData, WhyAmphloValidation } from '../../validations/why-amphlo-validation';
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"

interface whyAMPHLOProps {
    title?: string;
    mainTitle?: string;
    description?: string;
    image?: number;
}

export const WhyAmphloService = () => {
    const axiosPrivate = UseAxiosPrivate()

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm <WhyAmphloFormData>({
        resolver: zodResolver(WhyAmphloValidation),
        mode: "onChange",
    })

    const { mutateAsync } = useMutation({
        mutationFn: async (data: whyAMPHLOProps) => {
            const response = await axiosPrivate.patch('why-amphlo', data)
            return response;
        },
        onSuccess: () => {
            reset()
            toast.success('Why Amphlo section created')
        },
        onError: (error) => {
            toast.error(`Failed to Create Why Amphlo section!! ${error.message}`)
        }
    })

    const onSubmit = async (data: whyAMPHLOProps) => {
        await mutateAsync(data)
    }

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        reset,
        setValue,
        errors,
        onSubmit,
    }
}
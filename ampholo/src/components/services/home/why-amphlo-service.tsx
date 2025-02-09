import { useForm } from "react-hook-form"
import { UseAxiosPrivate } from "../../../auth/home_auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { WhyAmphloFormData, WhyAmphloValidation } from '../../validations/home/why-amphlo-validation';
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"


export const WhyAmphloService = () => {
    const axiosPrivate = UseAxiosPrivate()

    const form = useForm <WhyAmphloFormData>({
        resolver: zodResolver(WhyAmphloValidation),
        mode: "onChange",
    })

    const { mutateAsync } = useMutation({
        mutationFn: async (data: WhyAmphloFormData) => {
            const response = await axiosPrivate.patch('why-amphlo', data)
            return response;
        },
        onSuccess: () => {
            form.reset()
            toast.success('Why Amphlo section created')
        },
        onError: (error) => {
            toast.error(`Failed to Create Why Amphlo section!! ${error.message}`)
        }
    })

    const onSubmit = async (data: WhyAmphloFormData) => {
        await mutateAsync(data)
    }

    return {
        form,
        onSubmit,
    }
}
import { useForm } from "react-hook-form"
import { UseAxiosPrivate } from "../../../auth/home_auth"
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { PortalHeroValidationData, PortalHeroValidation } from "../../validations/portal/hero-validation";


export const UsePortalHeroService = () => {
    const axiosPrivate = UseAxiosPrivate()

    const form = useForm<PortalHeroValidationData>({
        resolver: zodResolver(PortalHeroValidation)
    })

    const mutation = useMutation({
        mutationFn: async (data: PortalHeroValidationData) => {
            const response = await axiosPrivate.patch('portal-hero', data);
            return response;
        },
        onSuccess: () => {
            form.reset()
            toast.success("Portal Hero Section Customized Successfully")
        },
        onError: (error: any) => {
            toast.error(`Failed to Update the Hero Section ${error.message}`)
        }
    })

    const onSubmit = (data: PortalHeroValidationData) => {
        mutation.mutate(data)
    }


    return { form, onSubmit, }
}
import { useFieldArray, useForm } from "react-hook-form"
import { UseAxiosPrivate } from "../../../auth/home_auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { PortalAccessFormData, PortalAccessValidation } from "../../validations/portal/portal-access-validation";


export const PortalAccessService = () => {
    const axiosPrivate = UseAxiosPrivate()

    const form = useForm<PortalAccessFormData>({
        resolver: zodResolver(PortalAccessValidation),
        mode: "onChange",
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'process',
    });

    const { mutateAsync } = useMutation({
        mutationFn: async (data: PortalAccessFormData) => {
            const response = await axiosPrivate.patch('portal-access', data)
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

    const onSubmit = async (data: PortalAccessFormData) => {
        await mutateAsync(data)
    }

    return {
        form,
        onSubmit,
        fields, append, remove
    }
}
import { useForm } from "react-hook-form"
import { UseAxiosPrivate } from "../../../../auth/home_auth"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"


export const UseGalleryService = () => {
    const axiosPrivate = UseAxiosPrivate()

    const form = useForm()

    const mutation = useMutation({
        mutationFn: async (data) => {
            const response = await axiosPrivate.post('partner-gallery', data);
            return response;
        },
        onSuccess: () => {
            form.reset()
            toast.success("Gallery Images Saved  Successful")
        },
        onError: (error: any) => {
            toast.error(`Failed to Submit Gallery Images ${error.message}`)
        }
    })

    const onSubmit = (data: any) => {
        mutation.mutate(data)
    }


    return { form, onSubmit }
}
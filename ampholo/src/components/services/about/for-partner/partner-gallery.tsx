import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useAxios } from "../../../../auth/home_auth"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"

export const UseGalleryService = () => {
    const axiosPrivate = useAxios()

    const form = useForm()

    const mutation = useMutation({
        mutationFn: async (data) => {
            const response = await axiosPrivate.post('galleries', data);
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

    const { data, isLoading } = useQuery({
        queryKey: ["galleries"],
        queryFn: async () => {
            const response = await axiosPrivate.get('galleries');
            return response;
        }
    })

    useEffect(() => {
        form.reset({
            galleryIds: data?.data.map((gallery: any) => gallery.id)
        })
    }, [data])


    return { form, onSubmit, data,  isLoading, mutation }
}
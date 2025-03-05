import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form"
import { useAxios } from "../../../auth/home_auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { WhyAmphloFormData, WhyAmphloValidation } from '../../validations/home/why-amphlo-validation';
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"


export const WhyAmphloService = () => {
    const axiosPrivate = useAxios()

    const form = useForm <WhyAmphloFormData>({
        resolver: zodResolver(WhyAmphloValidation),
        mode: "onChange",
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'lists',
      })
    

    const { mutateAsync, isPending } = useMutation({
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

    const { data, isLoading } = useQuery({
        queryKey: ["why-amphlo"],
        queryFn: async () => {
            const response = await axiosPrivate.get('why-amphlo')
            return response.data
        }
    })

    useEffect(() => {
        try {
            form.reset(data)
        } catch (error) {
            console.error("Error fetching why amphlo data:", error);
        }
    }, [data])

    return {
        form,
        onSubmit,
        fields,
        append,
        remove,
        image: data?.image,
        isLoading,
        isPending,
    }
}
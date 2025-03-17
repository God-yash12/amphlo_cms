import { useForm } from "react-hook-form"
import { useAxios } from "../../../auth/home_auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { CoreFeatureValidation, CoreFeatureValidationData } from "../../validations/feature/core-feature-validation";
import { useEffect } from "react";


export const UseCoreFeatureService = () => {
    const axiosPrivate = useAxios()
    const queryClient = useQueryClient()
    const form = useForm<CoreFeatureValidationData>({
        resolver: zodResolver(CoreFeatureValidation),
        mode: "onChange"
    })

    const mutation = useMutation({
        mutationFn: async (data: CoreFeatureValidationData) => {
            const response = await axiosPrivate.patch('core-features', data);
            return response.data;
        },
        onSuccess: () => {
            form.reset()
            queryClient.invalidateQueries( {queryKey: ["core-features"]});
            toast.success("Feature Core Feature Section Customized Successfully")
        },
        onError: (error: any) => {
            toast.error(`Failed to Update the Core Feature Section ${error.message}`)
        }
    })

    const onSubmit = (data: CoreFeatureValidationData) => {
        mutation.mutate(data)
    }

    const { data, isLoading } = useQuery({
        queryKey: ["core-features"],
        queryFn: async () => {
            const response = await axiosPrivate.get('core-features')
            return response.data
        }
    })

    useEffect(() => {
        if (data) {
            form.reset({
                title: data?.title,
                mainTitle: data?.mainTitle,
                description: data?.description 
            })
        }
    }, [data])   

    return {
        form,
        onSubmit,
        isLoading,
        mutation,
    }
}
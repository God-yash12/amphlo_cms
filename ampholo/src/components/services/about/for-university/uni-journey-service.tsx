import { useFieldArray, useForm } from "react-hook-form"
import { useAxios } from "../../../../auth/home_auth"
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { JourneyValidation, JourneyValidationData } from "../../../validations/about/for-university/uni-journey-validation";
import { useEffect } from "react";

export const UseJourneyService = () => {
    const axiosPrivate = useAxios()

    const form = useForm<JourneyValidationData>({
        resolver: zodResolver(JourneyValidation),
        mode: 'onChange',
    })
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'cardDetail',
    })
    const mutation = useMutation({
        mutationFn: async (data: JourneyValidationData) => {
            const response = await axiosPrivate.patch('university-journey', data);
            return response;
        },
        onSuccess: () => {
            form.reset()
            toast.success("Feature Journey Section Customized Successfully")
        },
        onError: (error: any) => {
            toast.error(`Failed to Update the Feature Agent Section ${error.message}`)
        }
    })

    const onSubmit = (data: JourneyValidationData) => {
        mutation.mutate(data);
    };

    const { data, isLoading } = useQuery({
        queryKey: ["university-journey"],
        queryFn: async () => {
            const response = await axiosPrivate.get("university-journey");
            return response.data;
        }
    })

    useEffect(() => {
        if (data) {
            form.reset({
                title: data.title,
                description: data.description,
                cardDetail: data.cardDetail.map((card: any) => ({
                    count: card.count,
                    cardTitle: card.cardTitle,
                    cardDescription: card.cardDescription
                }))
            })
        }
    }, [data, form])

    return {
        form,
        onSubmit,
        isLoading,
        fields,
        append,
        remove,
        mutation,
    }
}
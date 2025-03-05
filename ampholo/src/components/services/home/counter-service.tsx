
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxios } from "../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { CounterValidation, CounterValidationType } from "../../validations/home/counter-validation";
import { useForm } from "react-hook-form";

export const useCounterService = () => {

    const axiosPrivate = useAxios()
    const form = useForm<CounterValidationType>({
        resolver: zodResolver(CounterValidation),
        mode: "onChange",
    })

    

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: CounterValidationType) => {
            const response = await axiosPrivate.patch('counters', data)
            return response;
        },
        onSuccess: () => {
            form.reset()
            toast.success("Counter form submitted successfully!!", {
                position: "top-right"
            })
        },
        onError: (error: any) => {
            toast.error(`Failed to submit counter form!!! ${error.message}`)
        }
    })

    const onSubmit = (data: CounterValidationType) => {
        mutateAsync(data)
    }

    const { data, isLoading } = useQuery({
        queryKey: ["counters"],
        queryFn: async () => {
            const response = await axiosPrivate.get('counters')
            return response.data
        }
    })

    useEffect(() => {
        form.reset(data)
    }, [data])

    return {
        form,
        onSubmit,
        isLoading, 
        isPending,
    }

}

import { useMutation } from "@tanstack/react-query";
import { UseAxiosPrivate } from "../../../auth/home_auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface CounterFormData {
    title: string;
    description: string;
    countryCount?: number;
    countryCountSubTitle?: string;
    agentCount?: number;
    agentCountSubTitle?: string;
    studentsCount?: number;
    studentsCountSubTitle?: string;
    partnerRatingCount?: number;
    partnerRatingSubTitle?: string;
}

export const CounterService = () => {

    const axiosPrivate = UseAxiosPrivate()
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<CounterFormData>({
        defaultValues: {
            title: "",
            description: "",
            countryCount: 0,
            countryCountSubTitle: "",
            agentCount: 0,
            agentCountSubTitle: "",
            studentsCount: 0,
            studentsCountSubTitle: "",
            partnerRatingCount: 0,
            partnerRatingSubTitle: ""
        },
        mode: "onChange"
    })


    const { mutateAsync } = useMutation({
        mutationFn: async (data: CounterFormData) => {
            
            const response = await axiosPrivate.patch('counters', data)
            return response;
        },
        onSuccess: () => {
            resetFormValue()
            toast.success("Counter form submitted successfully!!", {
                position: "top-right"
            })
        },
        onError: (error: any) => {
            toast.error(`Failed to submit counter form!!! ${error.message}`)
        }
    })

    const onSubmit = (data: CounterFormData) => {
        mutateAsync(data)
        resetFormValue()
    }

    const resetFormValue = () => {
       reset({
        title: "",
        description: "",
        countryCount: 0,
        countryCountSubTitle: "",
        agentCount: 0,
        agentCountSubTitle: "",
        studentsCount: 0,
        studentsCountSubTitle: "",
        partnerRatingCount: 0,
        partnerRatingSubTitle: "",
       })
    }

    
    return {
        register,
        reset,
        handleSubmit,
        setValue,
        errors,
        onSubmit,        
    }

}
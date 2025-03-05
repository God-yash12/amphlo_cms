import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useAxios } from "../../../auth/home_auth"
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AgentProcessValidation, AgentProcessValidationData } from "../../validations/feature/agent-validation";
import { zodResolver } from "@hookform/resolvers/zod";

export const UseAgentService = () => {
    const axiosPrivate = useAxios()

    const form = useForm<AgentProcessValidationData> ({
        resolver: zodResolver(AgentProcessValidation),
        mode: 'onChange',
    })

    const mutation  = useMutation({
        mutationFn: async (data: AgentProcessValidationData) => {
            const response = await axiosPrivate.patch('agent', data);
            return response;
        },
        onSuccess: () => {
            form.reset()
            toast.success("Feature Agent Section Customized Successfully")
        },
        onError: (error: any) => {
            toast.error(`Failed to Update the Feature Agent Section ${error.message}`)
        }
    })

    const onSubmit = (data: AgentProcessValidationData) => {
        console.log("Form Data Submitted:", JSON.stringify(data, null, 2));
        mutation.mutate(data);
    };

    const { data, isLoading } = useQuery({
        queryKey: ["agent"],
        queryFn: async () => {
            const response = await axiosPrivate.get('agent');
            return response.data;
        }
    })

    useEffect(() => {
        if (data) {
            form.reset({
                title: data?.title,
                description: data?.description,
                process: data?.process?.map((item: any) => ({
                    processNumber: item.processNumber,
                    processTitle: item.processTitle,
                    processDescription: item.processDescription
                }))
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
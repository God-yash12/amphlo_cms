import { useForm } from "react-hook-form"
import { UseAxiosPrivate } from "../../../auth/home_auth"
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AgentProcessValidation, AgentProcessValidationData } from "../../validations/feature/agent-validation";
import { zodResolver } from "@hookform/resolvers/zod";

export const UseAgentService = () => {
    const axiosPrivate = UseAxiosPrivate()

    const form = useForm<AgentProcessValidationData> ({
        resolver: zodResolver(AgentProcessValidation),
        defaultValues:{
            title: "Title",
            description: "Description",
            process: [{processNumber: 1, processTitle: "Title", processDescription: "Description"}]
        },
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

    return {
        form,
        onSubmit
    }
}
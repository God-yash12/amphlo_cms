import { useFieldArray, useForm } from "react-hook-form"
import { useAxios } from "../../../auth/home_auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { PortalAccessFormData, PortalAccessValidation } from "../../validations/portal/portal-access-validation";
import { useEffect } from "react"


export const PortalAccessService = () => {
    const axiosPrivate = useAxios()

    const form = useForm<PortalAccessFormData>({
        resolver: zodResolver(PortalAccessValidation),
        mode: "onChange",
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'process',
    });

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: PortalAccessFormData) => {
            const response = await axiosPrivate.patch('portal-access', data)
            return response;
        },
        onSuccess: () => {
            form.reset()
            toast.success('Portal Access Process section customized')
        },
        onError: (error) => {
            toast.error(`Failed to Customized Portal Access Process section!! ${error.message}`)
        }
    })

    const onSubmit = async (data: PortalAccessFormData) => {
        await mutateAsync(data)
    }

        const { data, isLoading } = useQuery({
            queryKey: ['portalaccess'],
            queryFn: async () => {
                const response = await axiosPrivate.get("portal-access");
                return response.data;
            }
        });
    
        useEffect(() => {
            if (data) {
                try {
                    form.reset({
                        title: data.title,
                        description: data.description,
                        process: data.process.map((item: any) => ({
                            processCount: item.processCount,  
                            processTitle: item.processTitle,
                            processDescription: item.processDescription,
                        })), 
                        
                    })
                    
                } catch (error) {
                    toast.error("Failed to fetch data")
                }
            }
        }, [data, form]);
    

    return {
        form,
        onSubmit,
        fields, append, remove,
        isLoading, isPending
    }
}
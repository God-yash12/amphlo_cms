import { useForm } from "react-hook-form"
import { useAxios } from "../../../auth/home_auth"
import { FAQValidation, FAQValidationData } from "../../validations/feature/faq-validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

export const UseFAQService = () => {
    const axiosPrivate = useAxios()
    const queryClient = useQueryClient();

    const form = useForm<FAQValidationData>({
        resolver: zodResolver(FAQValidation)
    })

    const mutation = useMutation({
        mutationFn: async (data: FAQValidationData) => {
            const response = await axiosPrivate.post('faqs', data);
            return response;
        },
        onSuccess: () => {
            form.reset()
            toast.success("FAQ Added Successfully")
        },
        onError: (error) => {
            toast.error(`Failed to Add FAQ ${error.message}`)
        }
    })

    const onSubmit = async (data: FAQValidationData) => {
        await mutation.mutate(data)
    }

    // get data
    const { data: faqs, isLoading, isError } = useQuery<FAQItem[]>({
        queryKey: ["faqs"],
        queryFn: async () => {
          const response = await axiosPrivate.get("faqs");
          return response.data;
        }
      });

    //   delete faq
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            await axiosPrivate.delete(`faqs/${id}`);
        },
        onSuccess: () => {
            toast.success("FAQ Deleted Successfully");
            queryClient.invalidateQueries({ queryKey: ["faqs"] });
        },
        onError: (error) => {
            toast.error(`Failed to Delete FAQ ${error.message}`);
        }
    });

    const deleteFAQ = (id: number) => deleteMutation.mutate(id);

     // update FAQ mutation
     const updateMutation = useMutation({
        mutationFn: async (data: FAQItem) => {
            const { id, question, answer } = data;
            await axiosPrivate.patch(`faqs/${id}`, { question, answer });
        },
        onSuccess: () => {
            toast.success("FAQ Updated Successfully");
            queryClient.invalidateQueries({ queryKey: ["faqs"] });
        },
        onError: (error) => {
            toast.error(`Failed to Update FAQ ${error.message}`);
        }
    });

    const updateFAQ = (data: FAQItem) => updateMutation.mutate(data);

    return { form, onSubmit, faqs, isLoading, isError, deleteFAQ, updateFAQ, mutation, }
}
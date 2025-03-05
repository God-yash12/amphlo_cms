import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAxios } from "../../../../auth/home_auth";
import { WhyAmphloCardValidation } from "../../../validations/form/for-university/why-amphlo-card";
import { zodResolver } from "@hookform/resolvers/zod";
import { WhyAmphloCardData } from "../../../validations/form/for-university/why-amphlo-card";

interface FormDataProps {
    id: number;
    title: string;
    description: string;
    image: {
        id: number;
        url: string;
        filename: string;
        mimetype: string;
    };
}

export const KeyFeaturesFormService = () => {
    const axiosPrivate = useAxios()
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [selectedKeyFeatureCard, setSelectedKeyFeatureCard] = useState<FormDataProps | null>(null)
    const queryClient = useQueryClient()
    

      const form = useForm<WhyAmphloCardData>({
        resolver: zodResolver(WhyAmphloCardValidation)
      })

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: FormDataProps) => {
            const response = await axiosPrivate.post('key-feature-card', data);
            return response;
        },
        onSuccess: () => {
            form.reset()
            toast.success("Key Feature Card Updated successfully")
        },
        onError: (error) => {
            toast.error(`Failed to update the Card ${error.message}`)
        }
    })

    
    const { data } = useQuery({
        queryKey: ['key-feature-card'],
        queryFn: async () => {
            const response = await axiosPrivate.get('key-feature-card')
            return response.data
        }
    })   

    const updateKeyFeatureCard = useMutation({
        mutationFn: async ({ id, updatedData }: { id: number; updatedData: WhyAmphloCardData }) => {
          const response = await axiosPrivate.patch(`key-feature-card/${id}`, updatedData);
          return response;
        },
        onSuccess: () => {
          form.reset();
          toast.success("Key Feature Card updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["key-feature-card"] });
          setSelectedKeyFeatureCard(null);
        },
        onError: (error: Error) => {
          toast.error(`Error updating why amphlo card: ${error.message}`);
        },
      })  

      
    const deleteKeyFeatureCard = useMutation({
        mutationFn: async (id: number) => {
            const response = await axiosPrivate.delete(`key-feature-card/${id}`)
            return response
        },
        onSuccess: () => {
            toast.success("Key Feature Card Deleted successfully")
        },
        onError: (error) => {
            toast.error(`Failed to delete the Card ${error.message}`)
        }
    })
    
    useEffect(() => {
        if (selectedKeyFeatureCard) {
            try {
                form.reset({
                    title: selectedKeyFeatureCard.title,
                    description: selectedKeyFeatureCard.description,
                    image: selectedKeyFeatureCard.image?.id
                });
                if (selectedKeyFeatureCard.image?.url) {
                    setImagePreview(selectedKeyFeatureCard.image.url);
                }
            } catch (error) {
                console.error("Error resetting form:", error);
            }
        }
    }, [selectedKeyFeatureCard, form]);


    const onSubmit = async (data:any) => {
        try {
            if (selectedKeyFeatureCard) {
                await updateKeyFeatureCard.mutateAsync({
                    id: selectedKeyFeatureCard.id,
                    updatedData: data,
                });
            } else {
                await mutateAsync(data);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };


    return {
        form,
        onSubmit,
        data,
        deleteKeyFeatureCard,
        imagePreview,
        setImagePreview,
        selectedKeyFeatureCard,
        setSelectedKeyFeatureCard,
        isPending,
    }
}
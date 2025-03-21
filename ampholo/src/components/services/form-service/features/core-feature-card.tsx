import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAxios } from "../../../../auth/home_auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeatureCardData, FeatureCardValidation } from "../../../validations/feature/feature-card-validation";


interface CoreFeatureCardData {
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

export const CoreFeaturesFormService = () => {
    const axiosPrivate = useAxios()
    const queryClient = useQueryClient()
    const [selectedCoreFeatureCard, setSelectedCoreFeatureCard] = useState<CoreFeatureCardData | null>(null)
    const [deleteCardId, setDeletingCardId] = useState<number | null>()
    const [imagePreview, setImagePreview] = useState<{
        id: number,
        url: string,
        filename: string
    } | null>(null)

    const form = useForm<FeatureCardData>({
        resolver: zodResolver(FeatureCardValidation),
        mode: "onChange",
    })

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: FeatureCardData) => {
            const response = await axiosPrivate.post('core-feature-card', data);
            return response;
        },
        onSuccess: () => {
            form.reset()
            queryClient.invalidateQueries({ queryKey: ['core-feature-card'] })
            toast.success("Key Feature Card Updated successfully")
        },
        onError: (error) => {
            toast.error(`Failed to update the Card ${error.message}`)
        }
    })

    const { data, isPending: loading } = useQuery({
        queryKey: ["core-feature-card"],
        queryFn: async () => {
            const response = await axiosPrivate.get("core-feature-card");
            return response.data;
        },
    });

    const updateCoreFeatureCard = useMutation({
        mutationFn: async ({ id, updatedData }: { id: number; updatedData: FeatureCardData }) => {
            const response = await axiosPrivate.patch(`core-feature-card/${id}`, updatedData);
            return response;
        },
        onSuccess: () => {
            form.reset()
            toast.success("Key Feature Card updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["core-feature-card"] });
            setImagePreview(null)
            setSelectedCoreFeatureCard(null);

        },
        onError: (error: Error) => {
            toast.error(`Error updating why amphlo card: ${error.message}`);
        },
    })



    const onSubmit = async (data: FeatureCardData) => {
        if (selectedCoreFeatureCard) {
            await updateCoreFeatureCard.mutateAsync({
                id: (selectedCoreFeatureCard as any).id,
                updatedData: data,
            });
        } else {
            await mutateAsync(data)
        }
    }


    const deleteCoreFeatureCard = useMutation({
        mutationFn: async (id: number) => {
            const response = await axiosPrivate.delete(`core-feature-card/${id}`)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["core-feature-card"] });
            toast.success("Core Feature Card Deleted successfully")
        },
        onError: (error) => {
            toast.error(`Failed to delete the Card ${error.message}`)
        }
    })

    const deleteCard = (id: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            setDeletingCardId(id); 
            deleteCoreFeatureCard.mutate(id, {
                onSettled: () => {
                    setDeletingCardId(null);
                }
            });
        }
    };
    


    useEffect(() => {
        if (selectedCoreFeatureCard) {
            try {
                form.reset({
                    title: selectedCoreFeatureCard.title,
                    description: selectedCoreFeatureCard.description,
                    image: selectedCoreFeatureCard.image?.id
                });
                if (selectedCoreFeatureCard.image) {
                    setImagePreview({
                        id: selectedCoreFeatureCard?.image.id,
                        url: selectedCoreFeatureCard?.image?.url,
                        filename: selectedCoreFeatureCard?.image.filename
                    })
                }
            } catch (error) {
                console.error("Error resetting form:", error);
            }
        }
    }, [selectedCoreFeatureCard, form]);

    return {
        form,
        onSubmit,
        data,
        imagePreview,
        setImagePreview,
        selectedCoreFeatureCard,
        setSelectedCoreFeatureCard,
        deleteCoreFeatureCard,
        isPending,
        loading,
        deleteCardId,
        isLoading: isPending || updateCoreFeatureCard.isPending,
        deleteCard
    }
}
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartnerBenefitValidation, PartnerBenefitValidationData } from "../../../validations/about/for-partner/partner-benefit-validation";

interface ItemProps {
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

export const PartnerBenefitService = () => {
    const axiosPrivate = useAxios();
    const queryClient = useQueryClient();
    const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);
    const [imagePreview, setImagePreview] = useState<{
        id: number,
        url: string,
        filename: string
    } | null>(null);

    const form = useForm<PartnerBenefitValidationData>({
        resolver: zodResolver(PartnerBenefitValidation),
        mode: "onChange",
    });

    const { mutateAsync, isPending } = useMutation<any, Error, PartnerBenefitValidationData>({
        mutationFn: async (data) => {
            const response = await axiosPrivate.post("partner-benefits", data);
            return response.data;
        },
        onSuccess: () => {
            form.reset();
            queryClient.invalidateQueries({ queryKey: ['partner-benefits'] }); // Invalidate the query to refetch data
            toast.success("Partner Benefits Section Customized Successfully!", {
                position: "top-right",
            });
        },
        onError: (error: any) => {
            toast.error(`Failed to Update the Partner Benefits Section ${error.message}`);
        },
    });

    const UpdateItem = useMutation({
        mutationFn: async ({ id, updateData }: { id: number, updateData: PartnerBenefitValidationData }) => {
            const response = await axiosPrivate.patch(`partner-benefits/${id}`, updateData);
            return response;
        },
        onSuccess: () => {
            form.reset();
            queryClient.invalidateQueries({ queryKey: ['partner-benefits'] }); // Invalidate the query to refetch data
            toast.success("Item Updated successfully");
            setSelectedItem(null);
            setImagePreview(null);
        },
        onError: (error: Error) => {
            toast.error(error?.message || "Failed to Update the Item");
        }
    });

    const onSubmit = async (data: PartnerBenefitValidationData) => {
        if (selectedItem) {
            await UpdateItem.mutateAsync({
                id: (selectedItem as any).id,
                updateData: data,
            });
            setSelectedItem(null);
        } else {
            await mutateAsync(data);
        }
    };

    const { data, isLoading } = useQuery<ItemProps[]>({
        queryKey: ["partner-benefits"], // Ensure this key matches the one used in invalidateQueries
        queryFn: async () => {
            const response = await axiosPrivate.get("partner-benefits");
            return response.data;
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const response = await axiosPrivate.delete(`partner-benefits/${id}`);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partner-benefits'] }); // Invalidate the query to refetch data
            toast.success("Item Deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Failed to Delete the Item');
        }
    });

    const deleteItem = (id: number) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            deleteMutation.mutate(id);
        }
    };

    useEffect(() => {
        if (selectedItem) {
            try {
                form.reset({
                    title: selectedItem.title,
                    description: selectedItem.description,
                    image: selectedItem?.image?.id,
                });

                if (selectedItem?.image) {
                    setImagePreview({
                        id: selectedItem?.image?.id,
                        url: selectedItem?.image?.url,
                        filename: selectedItem?.image?.filename,
                    });
                } else {
                    setImagePreview(null);
                }
            } catch (error) {
                console.error("Error resetting form:", error);
            }
        }
    }, [selectedItem]);

    return {
        form,
        onSubmit,
        data,
        isLoading,
        deleteItem,
        setSelectedItem,
        selectedItem,
        imagePreview,
        isPending,
    };
};
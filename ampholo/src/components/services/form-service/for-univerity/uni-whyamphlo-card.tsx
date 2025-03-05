import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { WhyAmphloCardValidation, WhyAmphloCardData } from "../../../validations/form/for-university/why-amphlo-card";

interface WhyAmphloCard {
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


export const UniWhyAmphloCardService = () => {
  const axiosPrivate = useAxios();
  const queryClient = useQueryClient();
  const [selectedWhyAmphloCard, setSelectedWhyAmphloCard] = useState<WhyAmphloCard | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  

  const form = useForm<WhyAmphloCardData>({
    resolver: zodResolver(WhyAmphloCardValidation),
    mode: "onChange",
  });

  const { mutateAsync, isPending } = useMutation<any, Error, WhyAmphloCardData>({
    mutationFn: async (data: WhyAmphloCardData) => {
      const response = await axiosPrivate.post("whyamphlo-card", data);
      return response;
    },
    onSuccess: () => {
      form.reset();
      toast.success("University Why Amphlo Card added successfully!", {
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      toast.error(`Error submitting form: ${error.message}`, {
        position: "top-right",
      });
    },
  });

  const updateWhyAmphloCard = useMutation({
    mutationFn: async ({ id, updatedData }: { id: number; updatedData: WhyAmphloCardData }) => {
      const response = await axiosPrivate.patch(`whyamphlo-card/${id}`, updatedData);
      return response;
    },
    onSuccess: () => {
      form.reset();
      toast.success("University Why Amphlo Card updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["whyamphlo-card"] });
      setSelectedWhyAmphloCard(null);
    },
    onError: (error: Error) => {
      toast.error(`Error updating why amphlo card: ${error.message}`);
    },
  })  

  const { data } = useQuery({
    queryKey: ["whyamphlo-card"],
    queryFn: async () => {
      const response = await axiosPrivate.get("whyamphlo-card");
      return response.data;
    },  
  });

  useEffect(() => {
    try {
      if (selectedWhyAmphloCard) {
        form.reset({
          title: selectedWhyAmphloCard.title,
          description: selectedWhyAmphloCard.description,
          image: selectedWhyAmphloCard.image?.id,
        });
        if (selectedWhyAmphloCard.image?.url) {
          setImagePreview(selectedWhyAmphloCard.image.url);
        }
      }
    } catch (error) {
      console.error("Error resetting form:", error);
    }
  }, [selectedWhyAmphloCard, form]);

  const deleteWhyAmphloCard = useMutation({
    mutationFn: async (id: number) => {
      await axiosPrivate.delete(`whyamphlo-card/${id}`);
    },
    onSuccess: () => {
      toast.success("University Why Amphlo Card deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Error deleting why amphlo card: ${error.message}`);
    },
  });

  const onSubmit = async (data: WhyAmphloCardData) => {
    if (selectedWhyAmphloCard) {
      await updateWhyAmphloCard.mutateAsync({
        id: (selectedWhyAmphloCard as any).id,
        updatedData: data,
      });
    } else {
      await mutateAsync(data);
    }
  };

  return {
    form,
    onSubmit,
    imagePreview,
    selectedWhyAmphloCard,
    setSelectedWhyAmphloCard,
    deleteWhyAmphloCard,
    data,
    isPending,
  };
};

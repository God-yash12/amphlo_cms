import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { UniFeatureCardValidation, UniFeatureCardValidationData } from "../../../validations/form/for-university/feature-card-validation";


interface FeatureCard {
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



export const UniFeatureCardService = () => {
  const axiosPrivate = useAxios();
  const [selectedFeatureCard, setSelectedFeatureCard] = useState<FeatureCard | null>(null);
  const [imagePreview, setImagePreview] = useState<{
    id: number;
    url: string;
    filename: string;
  } | null>(null);
  
  const queryClient = useQueryClient();

  const form = useForm<UniFeatureCardValidationData>({
    resolver: zodResolver(UniFeatureCardValidation),
    mode: "onChange",
  });

  const { mutateAsync, isPending } = useMutation<any, Error, UniFeatureCardValidationData>({
    mutationFn: async (data) => {
      const response = await axiosPrivate.post("uni-feature-card", data);
      return response.data;
    },
    onSuccess: () => {
      form.reset();
      toast.success("University Why Amphlo Card added successfully!", {
        position: "top-right",
      });
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });


  const updateFeatureCard = useMutation({
    mutationFn: async ({ id, updatedData }: { id: number; updatedData: UniFeatureCardValidationData }) => {
      const response = await axiosPrivate.patch(`uni-feature-card/${id}`, updatedData);
      return response;
    },
    onSuccess: () => {
      form.reset();
      toast.success("Feature card updated successfully");
      queryClient.invalidateQueries({queryKey:["uni-feature-card"]});
      setSelectedFeatureCard(null);
      setImagePreview(null);
    },
    onError: (error) => {
      console.error("Error updating feature card:", error);
    }
  });

  const onSubmit = (data: UniFeatureCardValidationData) => {
    if (selectedFeatureCard) {
      updateFeatureCard.mutate({
        id: selectedFeatureCard.id,
        updatedData: data
      });
    } else {
      mutateAsync(data);
    }
  };

  const { data, isPending: loading } = useQuery<FeatureCard[]>({
    queryKey: ['uni-feature-card'],
    queryFn: async () => {
      const response = await axiosPrivate.get('uni-feature-card')
      return response.data
    }
  })


  useEffect(() => {
    try {
      if (selectedFeatureCard) {
        form.reset({
          title: selectedFeatureCard.title,
          description: selectedFeatureCard.description,
          image: selectedFeatureCard?.image?.id
        });
        if(selectedFeatureCard.image){
          setImagePreview({
            id: selectedFeatureCard?.image?.id,
            filename: selectedFeatureCard?.image?.filename,
            url: selectedFeatureCard?.image?.url
          })
        }else{
          setImagePreview(null)
        }
      }
    } catch (error) {
      console.error("Error resetting form:", error);
    }
  }, [selectedFeatureCard]);


  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axiosPrivate.delete(`uni-feature-card/${id}`);
    },
    onSuccess: () => {
      toast.success("Feature Card Deleted Successfully");
      queryClient.invalidateQueries({queryKey: ["uni-feature-card"]});
    },
    onError: (error) => {
      console.error("Error deleting feature card:", error);
    }
  });

  

  return {
    form,
    onSubmit,
    data,
    selectedFeatureCard,
    setSelectedFeatureCard,
    imagePreview,
    setImagePreview,
    deleteMutation,
    isPending,
    loading,
  };
};

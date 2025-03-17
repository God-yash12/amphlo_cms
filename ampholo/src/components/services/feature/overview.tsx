import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useAxios } from "../../../auth/home_auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { OverViewValidation, OverViewValidationData } from "../../validations/feature/overview-validation";

export const UseOverviewService = () => {
  const axiosPrivate = useAxios();

  const form = useForm<OverViewValidationData>({
    resolver: zodResolver(OverViewValidation)
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "overview"
  });

  const mutation = useMutation({
    mutationFn: async (data: OverViewValidationData) => {
      const response = await axiosPrivate.patch('overview', data);
      return response.data;
    },
    onSuccess: () => {
      form.reset()
      toast.success("Features Overview updated successfully");
    },
    onError: (error: any) => {
      toast.error(`Update failed: ${error.message}`);
    }
  });

  const onSubmit = (data: OverViewValidationData) => {
    mutation.mutate(data);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const response = await axiosPrivate.get("overview");
      return response.data;
    },
   
  });


  useEffect(() => {
    if(data) {
      form.reset({
        overview: [
          {
            title: data?.title,
            description: data?.description,
            image: data?.images
          }
        ]
      })
    }
  }, [data, form])

  return {
    form,
    onSubmit,
    fields,
    append,
    remove,
    mutation,
    data, 
    isLoading,
  };
};
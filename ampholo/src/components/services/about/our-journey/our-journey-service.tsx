import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { UseAxiosPrivate } from "../../../../auth/home_auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { AboutMoreValidation, AboutMoreValidationData } from "../../../validations/about/our-journey/our-journey";


export const OurJourneyService = () => {
  const axiosPrivate = UseAxiosPrivate(); 

  const form = useForm<AboutMoreValidationData>({
    resolver: zodResolver(AboutMoreValidation),
    mode: "onChange",
  });



  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "aboutMore"
  });


  const mutation = useMutation({
    mutationFn: async (data: AboutMoreValidationData) => {
      const response = await axiosPrivate.patch('amphlo-journey', data);
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

  const onSubmit = (data: AboutMoreValidationData) => {
    mutation.mutate(data);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["AMPHLO_JOURNEY"],
    queryFn: async () => {
      const response = await axiosPrivate.get("amphlo-journey");
      return response.data;
    }
  })

  useEffect(() => {
    try {
      form.reset({
        aboutMore: data?.data?.map((item: any) => ({
          title: item.title,
          description: item.description,
          year: item.year,
          image: item.image
        })) || []

      })
    } catch (error) {
      console.log(error)
    }
  }, [data, form])

  return {
    form,
    onSubmit,
    fields,
    append,
    remove,
    image: data?.data?.map((item: any) => item.image),
    isLoading
  };
};
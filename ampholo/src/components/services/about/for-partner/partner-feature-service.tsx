import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { useAxios } from "../../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartnerFeatureValidation, PartnerFeatureValidationData } from "../../../validations/about/for-partner/partner-feauture";
export const PartnerFeatureService = () => {
  const axiosPrivate = useAxios();

  const form = useForm<PartnerFeatureValidationData>({
    resolver: zodResolver(PartnerFeatureValidation),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "feature"
    }); 

  const { mutateAsync, isPending } = useMutation<any, Error, PartnerFeatureValidationData>({
    mutationFn: async (data) => {
      const response = await axiosPrivate.patch("partner-features", data);
      return response.data;
    },
    onSuccess: () => {
      form.reset();
      toast.success("Partner Feature Card Customized Successfully!", {
        position: "top-right",
      });
    },
    onError: (error: any) => {
      toast.error(`Failed to Update the Partner Feature Card ${error.message}`)
    },

  });

  const onSubmit = async (data: PartnerFeatureValidationData) => {
    await mutateAsync(data);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["partner-features"],
    queryFn: async () => {
      const response = await axiosPrivate.get("partner-features");
      return response.data;
    }
  })

  useEffect(() => {
    try {
      form.reset({
        featureTitle: data?.featureTitle,
        featureDescription: data?.featureDescription,
        feature: data?.feature.map((feature: any) => ({title: feature.title, description: feature.description}))
      })
    } catch (error) {
      console.log(error)
    }
  }, [data])  

  return {
    form,
    onSubmit,
    fields,
    append,
    remove,
    image: data?.image,
    isLoading,
    isPending,
  };
};

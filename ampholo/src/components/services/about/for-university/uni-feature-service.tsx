import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { UniAboutFeatures, UniAboutFeaturesData } from "../../../validations/about/for-university/uni-feature-validation";
import { useEffect } from "react";

export const UniFeatureService = () => {
  const axiosPrivate = useAxios();

  const form = useForm<UniAboutFeaturesData>({
    resolver: zodResolver(UniAboutFeatures),
    mode: "onChange",
  });

  const { mutateAsync, isPending } = useMutation<any, Error, UniAboutFeaturesData>({
    mutationFn: async (data) => {
      const response = await axiosPrivate.patch("university-feature", data);
      return response.data;
    },
    onSuccess: () => {
      form.reset();
      toast.success("University Feature Section Customized Successfully!", {
        position: "top-right",
      });
    },
    onError: (error: any) => {
      toast.error(`Failed to Update the University Feature Section ${error.message}`)
    },

  });

  const onSubmit = async (data: UniAboutFeaturesData) => {
    await mutateAsync(data);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["university-feature"],
    queryFn: async () => {
      const response = await axiosPrivate.get("university-feature");
      return response.data;
    }
  })

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        description: data.description,
        image: data?.image,
      })
    }
  }, [data])

  return {
    form,
    onSubmit,
    isLoading,
    isPending,
    image: data?.image,
  }
}

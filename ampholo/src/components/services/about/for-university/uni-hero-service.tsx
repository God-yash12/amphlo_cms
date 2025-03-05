import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { UniHeroValidation, UniHeroValidationData } from "../../../validations/about/for-university/uni-hero-validation";

export const UniHeroService = () => {
  const axiosPrivate = useAxios();

  const form = useForm<UniHeroValidationData>({
    resolver: zodResolver(UniHeroValidation),
  });

  const { mutateAsync, isPending } = useMutation<any, Error, UniHeroValidationData>({
    mutationFn: async (data) => {
      const response = await axiosPrivate.patch("university-hero", data);
      return response.data;
    },

    onSuccess: () => {
      form.reset();
      toast.success("Hero section customized successfully!", {
        position: "top-right",
      });
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  const onSubmit = async (data: UniHeroValidationData) => {
    await mutateAsync(data);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["university-hero"],
    queryFn: async () => {
      const response = await axiosPrivate.get("university-hero");
      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        subTitle: data.subTitle,
        image: data?.image
      });
    }

  }, [data]);

  return {
    form,
    onSubmit,
    image: data?.image,
    isLoading,
    isPending,
  };
};

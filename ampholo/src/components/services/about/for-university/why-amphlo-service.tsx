import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { UniWhyChooseValidation, UniWhyChooseValidationData } from "../../../validations/about/for-university/uni-why-amphlo-validation";
import { useEffect } from "react";

export const UniWhyAmphloService = () => {
  const axiosPrivate = useAxios();

  const form = useForm<UniWhyChooseValidationData>({
    resolver: zodResolver(UniWhyChooseValidation),

  });

  const { mutateAsync, isPending } = useMutation<any, Error, UniWhyChooseValidationData>({
    mutationFn: async (data) => {
      const response = await axiosPrivate.patch("uni-whyamphlo", data);
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

  const onSubmit = async (data: UniWhyChooseValidationData) => {
    await mutateAsync(data);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["uni-whyamphlo"],
    queryFn: async () => {
      const response = await axiosPrivate.get("uni-whyamphlo");
      return response.data;
    },
  });


  useEffect(() => {
    if (data) {
      try {
        form.reset({
          title: data.title,
          description: data.description,
        })
      } catch (error) {
        console.log(error)
        toast.error("Failed to fetch data")
      }
    }
  }, [data, form]);

  return {
    form,
    onSubmit,
    isLoading,
    isPending,
  };
};

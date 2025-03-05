import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { JoinNowValidation, JoinNowValidationData } from "../../../validations/about/for-university/uni-join-now";
import { useEffect } from "react";

export const UseJoinNowService = () => {
  const axiosPrivate = useAxios();

  const form = useForm<JoinNowValidationData>({
    resolver: zodResolver(JoinNowValidation),
  });

  const { mutateAsync, isPending } = useMutation<any, Error, JoinNowValidationData>({
    mutationFn: async (data) => {
      const response = await axiosPrivate.patch("join-now-university", data);
      return response.data;
    },

    onSuccess: () => {
      form.reset();
      toast.success("Join Network customized successfully!", {
        position: "top-right",
      });
    },
    onError: (error) => {
      console.error("Error submitting data:", error);
    },
  });

  const onSubmit = async (data: JoinNowValidationData) => {
    await mutateAsync(data);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["join-now-partner"],
    queryFn: async () => {
      const response = await axiosPrivate.get("join-now-university");
      return response.data;
    }
  })

    useEffect(() => {
    if (data) {
      form.reset({
        title: data?.title,
        description: data?.description,
        buttons: data?.buttons?.map((button: any) => ({
          name: button.name,
          route: button.route
        }))
      })
    }
  }, [data])

  return {
    form,
    onSubmit,
    isLoading,
    isPending,
  };
};

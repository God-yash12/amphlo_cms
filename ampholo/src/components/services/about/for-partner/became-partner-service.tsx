import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { JoinNowValidationData, JoinNowValidation } from "../../../validations/about/for-university/uni-join-now";
import { useEffect } from "react";

export const BecamePartnerService = () => {
  const axiosPrivate = useAxios();

  const form = useForm<JoinNowValidationData>({
    resolver: zodResolver(JoinNowValidation),
    mode: "onChange",
  });

  const { mutateAsync, isPending } = useMutation<any, Error, JoinNowValidationData>({
    mutationFn: async (data) => {
      const response = await axiosPrivate.patch("partner-joinnow", data);
      return response.data;
    },
    onSuccess: () => {
      form.reset();
      toast.success("Partner Join Now Section Customized Successfully!", {
        position: "top-right",
      });
    },
    onError: (error: any) => {
      toast.error(`Failed to Update the Partner Join Now Section ${error.message}`)
    },

  });

  const onSubmit = async (data: JoinNowValidationData) => {
    await mutateAsync(data);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["partner-joinnow"],
    queryFn: async () => {
      const response = await axiosPrivate.get("partner-joinnow");
      return response.data;
    }
  })

  useEffect(() => {
    try {
      form.reset({
        title: data?.title,
        description: data?.description,
        buttons: data?.buttons?.map((button: any) => ({name: button.name, route: button.route}))
      })
    } catch (error) {
      console.log(error)
    }
  }, [data])
  

  return {
    form,
    onSubmit,
    isLoading,
    isPending,
  };
};

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { UseAxiosPrivate } from "../../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { JoinNowValidationData, JoinNowValidation } from "../../../validations/about/for-university/uni-join-now";

export const BecamePartnerService = () => {
  const axiosPrivate = UseAxiosPrivate();

  const form = useForm<JoinNowValidationData>({
    resolver: zodResolver(JoinNowValidation),
    defaultValues: {
      title: "",
      description: "",
      buttons: [{name: "", route: ""}]
    },
  });

  const { mutateAsync } = useMutation<any, Error, JoinNowValidationData>({
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

  return {
    form,
    onSubmit,
  };
};

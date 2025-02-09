import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { UseAxiosPrivate } from "../../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { JoinNowValidation, JoinNowValidationData } from "../../../validations/about/for-university/uni-join-now";

export const UseJoinNowService = () => {
  const axiosPrivate = UseAxiosPrivate();

  const form = useForm<JoinNowValidationData>({
    resolver: zodResolver(JoinNowValidation),
    defaultValues: {
      title: "",
      description: "",
      buttons:[{name: "", route: ""}],
    },
  });

  const { mutateAsync } = useMutation<any, Error, JoinNowValidationData>({
    mutationFn: async (data) => {
      const response = await axiosPrivate.patch("join-now-partner", data);
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

  return {
    form,
    onSubmit,
  };
};

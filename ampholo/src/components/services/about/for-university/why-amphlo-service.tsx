import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { UseAxiosPrivate } from "../../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { UniWhyChooseValidation, UniWhyChooseValidationData } from "../../../validations/about/for-university/uni-why-amphlo-validation";

export const UniWhyAmphloService = () => {
  const axiosPrivate = UseAxiosPrivate();

  const form = useForm<UniWhyChooseValidationData>({
    resolver: zodResolver(UniWhyChooseValidation),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { mutateAsync } = useMutation<any, Error, UniWhyChooseValidationData>({
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

  return {
    form,
    onSubmit,
  };
};

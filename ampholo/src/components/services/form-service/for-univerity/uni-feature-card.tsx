import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { UseAxiosPrivate } from "../../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { UniFeatureCardValidation, UniFeatureCardValidationData } from "../../../validations/form/for-university/feature-card-validation";

export const UniFeatureCardService = () => {
  const axiosPrivate = UseAxiosPrivate();

  const form = useForm<UniFeatureCardValidationData>({
    resolver: zodResolver(UniFeatureCardValidation),
    defaultValues: {
      title: "",
      description: "",
      image: 0,
    },
  });

  const { mutateAsync } = useMutation<any, Error, UniFeatureCardValidationData>({
    mutationFn: async (data) => {
      const response = await axiosPrivate.post("uni-feature-card", data);
      return response.data;
    },
    onSuccess: () => {
      form.reset();
      toast.success("University Why Amphlo Card added successfully!", {
        position: "top-right",
      });
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  const onSubmit = async (data: UniFeatureCardValidationData) => {
    await mutateAsync(data);
  };

  return {
    form,
    onSubmit,
  };
};

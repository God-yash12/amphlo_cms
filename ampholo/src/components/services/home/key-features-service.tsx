import { useForm } from "react-hook-form";
import { UseAxiosPrivate } from "../../../auth/home_auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyFeaturesValidation } from "../../validations/home/key-feature-validations";

interface KeyFeatureData {
  title: string;
  description: string;
  image: number
}

export const UseKeyFeatureService = () => {
  const axiosPrivate = UseAxiosPrivate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<KeyFeatureData>({
    resolver: zodResolver(KeyFeaturesValidation),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: KeyFeatureData) => {
      const response = await axiosPrivate.post("key-features", data);
      return response;
    },
    onSuccess: () => {
      reset();
      toast.success("Feature Post successful.");
    },
    onError: (error) => {
      toast.error(`Failed to post Feature: ${error.message}`);
    },
  });

  const onSubmit = async (data: KeyFeatureData) => {
    await mutateAsync(data);
    console.log(data, "data");
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    errors,
  };
};
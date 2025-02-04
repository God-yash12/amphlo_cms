import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { UseAxiosPrivate } from "../../../auth/home_auth";
import { toast } from "react-toastify";

interface HeroFormData {
  title?: string;
  image?: number;
  description?: string;
  buttons?: [];
}

export const HeroService = () => {
  const axiosPrivate = UseAxiosPrivate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<HeroFormData>({
    defaultValues: {
      title: "",
      image: undefined,
      description: "",
      buttons: [],
    },
  });

  const { mutateAsync } = useMutation<HeroFormData, Error, HeroFormData>({
    mutationFn: async (data) => {
      const response = await axiosPrivate.patch("hero", data);
      return response.data;
    },
    onSuccess: () => {
      reset();
      toast.success("Hero section customized successfully!", {
        position: "top-right",
      });
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  const onSubmit = async (data: HeroFormData) => {
    await mutateAsync(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    errors,
    reset,
  };
};

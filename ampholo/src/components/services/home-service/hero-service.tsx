import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { UseAxiosPrivate } from "../../../auth/home_auth";
import { toast } from "react-toastify";

interface HeroFormData {
  title: string;
  image?: File;
  description: string;
  buttons: [];
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

  const { mutateAsync } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axiosPrivate.post("home/hero", formData);
      return response.data;
    },
    onSuccess: () => {
      reset();
      toast.success("Hero section customized success!", {
        position: 'top-right'
      }
      );
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  const onSubmit = async (data: HeroFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (data.image) {
      formData.append("image", data.image);
    }
    formData.append("buttons", JSON.stringify(data.buttons));

    await mutateAsync(formData);
  };

  return {
    register,
    handleSubmit,
    setValue,
    errors,
    reset,
    onSubmit,
  };
};
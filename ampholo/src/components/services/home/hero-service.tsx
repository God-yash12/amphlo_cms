import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { UseAxiosPrivate } from "../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeroSectionValidation, THeroSectionValidation } from "../../validations/home/hero-validation";

export const HeroService = () => {
  const axiosPrivate = UseAxiosPrivate();

  const form = useForm<THeroSectionValidation>({
    resolver: zodResolver(HeroSectionValidation),
    defaultValues: {
      title: "",
      image: undefined,
      description: "",
      buttons: [
        {
          name: "",
          route: "",
        }
      ],
    },
  });

  const { mutateAsync } = useMutation<any, Error, THeroSectionValidation>({
    mutationFn: async (data) => {
      const response = await axiosPrivate.patch("hero", data);
      return response.data;
    },
    onSuccess: (data) => {
      form.reset(data);
      toast.success("Hero section customized successfully!", {
        position: "top-right",
      });
    },
    onError: (error) => {
      console.error("Error submitting form:", error);
    },
  });

  const onSubmit = async (data: THeroSectionValidation) => {
    await mutateAsync(data);
  };


  return {
    form,
    onSubmit,
  };
};

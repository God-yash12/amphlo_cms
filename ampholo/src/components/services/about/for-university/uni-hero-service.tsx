import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { UseAxiosPrivate } from "../../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { UniHeroValidation, UniHeroValidationData } from "../../../validations/about/for-university/uni-hero-validation";

export const AboutHeroService = () => {
  const axiosPrivate = UseAxiosPrivate();

  const form = useForm<UniHeroValidationData>({
    resolver: zodResolver(UniHeroValidation),
    defaultValues: {
      title: "",
      subTitle: "",
      image: 0 || undefined,
    },
  });

  const { mutateAsync } = useMutation<any, Error, UniHeroValidationData>({
    mutationFn: async (data) => {
      const response = await axiosPrivate.patch("university-hero", data);
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

  const onSubmit = async (data: UniHeroValidationData) => {
    await mutateAsync(data);
  };

  return {
    form,
    onSubmit,
  };
};

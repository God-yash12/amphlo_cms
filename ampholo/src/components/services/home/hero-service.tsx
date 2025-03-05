import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { useAxios } from "../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeroSectionValidation, THeroSectionValidation } from "../../validations/home/hero-validation";

export const HeroService = () => {
  const axiosPrivate = useAxios();

  const form = useForm<THeroSectionValidation>({
    resolver: zodResolver(HeroSectionValidation),
    mode: "onChange",
  });

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "buttons"
  });


  const { mutateAsync, isPending } = useMutation<any, Error, THeroSectionValidation>({
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

  const { data, isLoading } = useQuery({
    queryKey: ["hero"],
    queryFn: async () => {
      const response = await axiosPrivate.get("hero");
      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        description: data.description,
        buttons: data?.buttons?.map((button: any) => ({
          name: button.name,
          route: button.route,
        })),
      });
    }
  }, [data]);

  return {
    form,
    onSubmit,
    fields,
    append,
    remove,
    image: data?.image,
    isLoading,
    isPending,
  };
};

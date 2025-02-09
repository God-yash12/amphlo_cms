import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { UseAxiosPrivate } from "../../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { WhyAmphloCardValidation, WhyAmphloCardData } from "../../../validations/form/for-university/why-amphlo-card";

export const UniWhyAmphloCardService = () => {
  const axiosPrivate = UseAxiosPrivate();

  const form = useForm<WhyAmphloCardData>({
    resolver: zodResolver(WhyAmphloCardValidation)
  });

  const { mutateAsync } = useMutation<any, Error, WhyAmphloCardData>({
    mutationFn: async (data: WhyAmphloCardData) => {
      const response = await axiosPrivate.post("whyamphlo-card", data);
      return response;
    },
    onSuccess: () => {
      form.reset();
      toast.success("University Why Amphlo Card added successfully!", {
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      toast.error(`Error submitting form: ${error.message}`, {
        position: "top-right",
      });
    },
  });

  const onSubmit = async (data: WhyAmphloCardData) => {
    await mutateAsync(data);
  };

  return {
    form,
    onSubmit,
  };
};

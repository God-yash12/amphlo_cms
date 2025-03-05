import { useForm } from "react-hook-form";
import { useAxios } from "../../../auth/home_auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyFeaturesValidation, KeyFeaturesFormData } from "../../validations/home/key-feature-validations";
import { useEffect } from "react";


export const UseKeyFeatureService = () => {
  const axiosPrivate = useAxios();

  const form =useForm<KeyFeaturesFormData>({
    resolver: zodResolver(KeyFeaturesValidation),
    mode: "onChange",
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: KeyFeaturesFormData) => {
      const response = await axiosPrivate.patch("key-features", data);
      return response;
    },
    onSuccess: () => {
      form.reset();
      toast.success("Feature Post successful.");
    },
    onError: (error) => {
      toast.error(`Failed to post Feature: ${error.message}`);
    },
  });

  const onSubmit = async (data: KeyFeaturesFormData) => {
    await mutateAsync(data);
    console.log(data, "data");
  };

  const { data, isLoading } = useQuery({
    queryKey: ["key-features"],
    queryFn: async () => {
      const response = await axiosPrivate.get("key-features");
      return response.data;
    },
  });

  useEffect(() => {
    try {
      form.reset(data);
    } catch (error) {
      console.error("Error fetching key features data:", error);
    }
  }, [data, form]); 

  return {
   form,
   onSubmit,
   isLoading,
   isPending,
  };
};
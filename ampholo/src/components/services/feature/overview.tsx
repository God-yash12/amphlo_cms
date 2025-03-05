import { useForm, useFieldArray } from "react-hook-form";
import { useAxios } from "../../../auth/home_auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { OverViewValidation, OverViewValidationData } from "../../validations/feature/overview-validation";

export const UseOverviewService = () => {
  const axiosPrivate = useAxios();

  const form = useForm<OverViewValidationData>({
    resolver: zodResolver(OverViewValidation)
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "overview"
  });

  const mutation = useMutation({
    mutationFn: async (data: OverViewValidationData) => {
      const response = await axiosPrivate.post('overview', data);
      return response.data;
    },
    onSuccess: () => {
      form.reset()
      toast.success("Features Overview updated successfully");
    },
    onError: (error: any) => {
      toast.error(`Update failed: ${error.message}`);
    }
  });

  const onSubmit = (data: OverViewValidationData) => {
    mutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    fields,
    append,
    remove,
    mutation,
  };
};
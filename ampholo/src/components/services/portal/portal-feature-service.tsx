import { useFieldArray, useForm } from "react-hook-form"
import { UseAxiosPrivate } from "../../../auth/home_auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { PortalFeatureValidation, PortalFeatureValidationData } from "../../validations/portal/portal-feature";


export const UsePortalFeatureServices = () => {
  const axiosPrivate = UseAxiosPrivate()

  const form = useForm<PortalFeatureValidationData>({
    resolver: zodResolver(PortalFeatureValidation),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'listItem',
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: PortalFeatureValidationData) => {
      const response = await axiosPrivate.patch('portal-feature', data)
      return response.data;
    },
    onSuccess: (data: PortalFeatureValidationData) => {
      form.reset(data)
      toast.success('Portal Feature customized successful')
    },
    onError: (error: any) => {
      toast.error(`Failed to customize Portal Feature Page`, error.message)
    }
  })

  const onSubmit = async (data: PortalFeatureValidationData) => {
    await mutateAsync(data);
  };

  return {
    form,
    onSubmit,
    fields, append, remove
  }
}
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form"
import { useAxios } from "../../../auth/home_auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { PortalFeatureValidation, PortalFeatureValidationData } from "../../validations/portal/portal-feature";


export const UsePortalFeatureServices = () => {
  const axiosPrivate = useAxios()

  const form = useForm<PortalFeatureValidationData>({
    resolver: zodResolver(PortalFeatureValidation),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'listItem',
  });

  const { mutateAsync, isPending } = useMutation({
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

    const { data, isLoading } = useQuery({
          queryKey: ['portalFeature'],
          queryFn: async () => {
              const response = await axiosPrivate.get("portal-feature");
              return response.data;
          }
      });
  
      useEffect(() => {
          if (data) {
              try {
                  form.reset({
                      title: data.title,
                      mainTitle: data.mainTitle,
                      description: data.description,
                      listTitle: data.listTitle,
                      listItem: data.listItem,
                  })
                 
              } catch (error) {
                  toast.error("Failed to fetch data")
              }
          }
      }, [data, form]);

  return {
    form,
    onSubmit,
    fields, append, remove,
    image: data?.image,
    isLoading, isPending
  }
}
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form"
import { useAxios } from "../../../auth/home_auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { HomeAboutValidation, HomeAboutValidationData } from "../../validations/home/home-about-validation";

export const UseHomeAboutServices = () => {
  const axiosPrivate = useAxios();

  const form = useForm<HomeAboutValidationData>({
    resolver: zodResolver(HomeAboutValidation),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "listItem",
  });


  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: HomeAboutValidationData) => {
      const response = await axiosPrivate.patch('home-about', data)
      return response.data;
    },
    onSuccess: (data: HomeAboutValidationData) => {
      form.reset(data)
      toast.success('About customized successful')
    },
    onError: (error: any) => {
      toast.error(`Failed to customize About Page`, error.message)
    }
  })

  const onSubmit = async (data: HomeAboutValidationData) => {
    await mutateAsync(data);
  };

  const { data, isLoading } = useQuery({
    queryKey: ['home-about'],
    queryFn: async () => {
      const response = await axiosPrivate.get('home-about')
      return response.data;
    }
  })

  useEffect(() => {
    try {
      form.reset({
        title: data?.title,
        mainTitle: data?.mainTitle,
        description: data?.description,
        listTitle: data?.listTitle,
        listItem: data?.listItem.map((item: any) => ({
          list: item.list
        })),
      })
     
    } catch (error) {
      console.log(error)
    }
  }, [data])

  return {
    form,
    onSubmit,
    fields,
    append,
    remove,
    image: data?.image,
    isLoading,
    isPending,
  }
}
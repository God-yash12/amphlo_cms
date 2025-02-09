import { useForm } from "react-hook-form"
import { UseAxiosPrivate } from "../../../auth/home_auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { HomeAboutValidation, HomeAboutValidationData } from "../../validations/home/home-about-validation";


export const UseHomrAboutServices = () => {
  const axiosPrivate = UseAxiosPrivate()

  const form = useForm<HomeAboutValidationData>({
    resolver: zodResolver(HomeAboutValidation),
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: HomeAboutValidationData) => {
      const response = await axiosPrivate.patch('home-about', data)
      return response.data;
    },
    onSuccess: () => {
      form.reset()
      toast.success('About customized successful')
    },
    onError: (error: any) => {
      toast.error(`Failed to customize About Page`, error.message)
    }
  })

  const onSubmit = async (data: HomeAboutValidationData) => {
    await mutateAsync(data);
  };

  return {
    form,
    onSubmit,
  }
}
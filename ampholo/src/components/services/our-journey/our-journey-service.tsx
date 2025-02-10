import { useForm, useFieldArray } from "react-hook-form";
import { UseAxiosPrivate } from "../../../auth/home_auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { AboutMoreValidation, AboutMoreValidationData } from "../../validations/our-journey/our-journey";

export const UseAboutMoreService = () => {
  const axiosPrivate = UseAxiosPrivate(); 
  const form = useForm<AboutMoreValidationData>({

    resolver: zodResolver(AboutMoreValidation),
    defaultValues: {
      aboutMore: [{
        title: '',
        description: '',
        year: '',
        image: 0
      }]
    }
  });



  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "aboutMore"
  });


  const mutation = useMutation({
    mutationFn: async (data: AboutMoreValidationData) => {
      const response = await axiosPrivate.patch('about-more', data);
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

  const onSubmit = (data: AboutMoreValidationData) => {
    mutation.mutate(data);
  };


  return {
    form,
    onSubmit,
    fields,
    append,
    remove
  };
};
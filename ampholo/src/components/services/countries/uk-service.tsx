import { countriesValidation } from "../../validations/countries/countries-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CountriesValidationData } from "../../validations/countries/countries-validation";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { UseAxiosPrivate } from "../../../auth/home_auth";
import { toast } from "react-toastify";


export const UKService = () => {
    const axiosPrivate = UseAxiosPrivate();
    const form = useForm<CountriesValidationData>({
        resolver: zodResolver(countriesValidation),
        defaultValues: {
            title: "",
            description: "",
            image: 0,
            buttons: [{ name: "", route: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "buttons"
      });

    const { mutateAsync } = useMutation({
        mutationFn: async (data: CountriesValidationData) => {
          const response = await axiosPrivate.patch("uk", data);
          return response.data;
        },

        onSuccess: () => {
            form.reset();
            toast.success("Country updated successfully");
        },
        onError: () => {
            toast.error("Error updating country");
        },
    });

    const onSubmit = (data: CountriesValidationData) => {
        mutateAsync(data);
    };



    return { form, onSubmit, fields, append, remove };
}

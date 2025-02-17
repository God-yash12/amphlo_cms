import { countriesValidation } from "../../validations/countries/countries-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CountriesValidationData } from "../../validations/countries/countries-validation";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../auth/home_auth";
import { toast } from "react-toastify";


export const CountryHeroService = () => {
    const axiosPrivate = useAxios();

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
            const response = await axiosPrivate.post("country", data);
            return response.data;

        },
        onSuccess: () => {
            form.reset();
            toast.success("Country Hero Section updated successfully");
        },
        onError: (error: any) => {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error updating Country Hero Section");
            }
            form.reset()
        },
    });

    const onSubmit = (data: CountriesValidationData) => {
        mutateAsync(data);
    };



    return { form, onSubmit, fields, append, remove };
}

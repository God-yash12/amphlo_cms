import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { UseAxiosPrivate } from "../../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartnerHeroValidation, PartnerHeroValidationData } from "../../../validations/about/for-partner/hero-validation-partner";

export const PartnerHeroService = () => {
    const axiosPrivate = UseAxiosPrivate();

    const form = useForm<PartnerHeroValidationData>({
        resolver: zodResolver(PartnerHeroValidation),
        defaultValues: {
            title: "",
            description: "",
            image: 0,
            buttons: [{ name: "", route: "" }]
        },
    });

    const { mutateAsync } = useMutation<any, Error, PartnerHeroValidationData>({
        mutationFn: async (data) => {
            const response = await axiosPrivate.patch("partner-hero", data);
            return response.data;
        },
        onSuccess: () => {
            form.reset();
            toast.success("Partner Hero Section Customized Successfully!", {
                position: "top-right",
            });
        },
        onError: (error: any) => {
            toast.error(`Failed to Update the Partner Hero Section ${error.message}`)
        },

    });

    const onSubmit = async (data: PartnerHeroValidationData) => {
        await mutateAsync(data);
    };

    return {
        form,
        onSubmit,
    };
};

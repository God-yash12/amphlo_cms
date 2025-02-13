import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { UseAxiosPrivate } from "../../../../auth/home_auth";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartnerBenefitValidation, PartnerBenefitValidationData } from "../../../validations/about/for-partner/partner-benefit-validation";

export const PartnerBenefitService = () => {
    const axiosPrivate = UseAxiosPrivate();

    const form = useForm<PartnerBenefitValidationData>({
        resolver: zodResolver(PartnerBenefitValidation),
        mode: "onChange",
    });

    const { mutateAsync } = useMutation<any, Error, PartnerBenefitValidationData>({
        mutationFn: async (data) => {
            const response = await axiosPrivate.post("partner-benefits", data);
            return response.data;
        },
        onSuccess: () => {
            form.reset();
            toast.success("partner Benefits Section Customized Successfully!", {
                position: "top-right",
            });
        },
        onError: (error: any) => {
            toast.error(`Failed to Update the Partner Benefits Section ${error.message}`)
        },

    });

    const onSubmit = async (data: PartnerBenefitValidationData) => {
        await mutateAsync(data);
    };

    const { data } = useQuery({
        queryKey: ["partner-benefits"],
        queryFn: async () => {
            const response = await axiosPrivate.get("partner-benefits");
            return response.data;
        }
    });



    return {
        form,
        onSubmit,
        data,
       
    };
};

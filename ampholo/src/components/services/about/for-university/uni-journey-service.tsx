import { useForm } from "react-hook-form"
import { UseAxiosPrivate } from "../../../../auth/home_auth"
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { JourneyValidation, JourneyValidationData } from "../../../validations/about/for-university/uni-journey-validation";

export const UseJourneyService = () => {
    const axiosPrivate = UseAxiosPrivate()

    const form = useForm<JourneyValidationData> ({
        resolver: zodResolver(JourneyValidation),
        defaultValues:{
            title: "",
            description: "",
            cardDetail: [{count: 0, cardTitle: "", cardDescription: ""}]
        },
        mode: 'onChange',
    })

    const mutation  = useMutation({
        mutationFn: async (data: JourneyValidationData) => {
            const response = await axiosPrivate.patch('university-journey', data);
            return response;
        },
        onSuccess: () => {
            form.reset()
            toast.success("Feature Journey Section Customized Successfully")
        },
        onError: (error: any) => {
            toast.error(`Failed to Update the Feature Agent Section ${error.message}`)
        }
    })

    const onSubmit = (data: JourneyValidationData) => {
        mutation.mutate(data);
    };

    return {
        form,
        onSubmit
    }
}
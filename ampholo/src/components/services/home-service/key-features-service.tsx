
import { useForm } from "react-hook-form";
import { UseAxiosPrivate } from "../../../auth/home_auth";
import { KeyFeaturesFormData, KeyFeaturesValidation } from "../../form-validations/key-feature-validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface KeyFeatureProps {
    title: string;
    description: string;
    cardTitle: string;
    cardDescription: string;
    image?: File;
}

export const UseKeyFeatureService = () => {

    const axiosPrivate = UseAxiosPrivate()

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<KeyFeaturesFormData>({
        resolver: zodResolver(KeyFeaturesValidation)
    })

    const { mutateAsync } = useMutation({
        mutationFn: async (data: KeyFeatureProps) => {
            const formData = new FormData();

            formData.append("title", data.title || "")
            formData.append("description", data.description)
            formData.append("cardTitle", data.cardTitle)
            formData.append("cardDescription", data.cardDescription)

            if (data.image) {
                formData.append("image", data.image);
            } else {
                console.warn("No image provided");
            }

            const response = await axiosPrivate.post('home/key-features', formData)
            return response;
        },
        onSuccess: () => {
            reset()
            toast.success("Feature Post successful.")
        },
        onError: (error) => {
            toast.error(`Failed to post Feature: ${error.message}`)
        }
    })

    const onSubmit = (data: KeyFeatureProps) => {
        mutateAsync(data)
    }

    return {
        register,
        handleSubmit,
        setValue,
        errors,
        onSubmit
    }

}
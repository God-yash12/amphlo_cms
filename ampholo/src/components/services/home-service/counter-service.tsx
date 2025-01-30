
import { useMutation } from "@tanstack/react-query";
import { UseAxiosPrivate } from "../../../auth/home_auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRef } from "react";

interface CounterFormData {
    title: string;
    image?: File;
    description: string;
    countryCount?: number;
    countryCountSubTitle?: string;
    agentCount?: number;
    agentCountSubTitle?: string;
    studentsCount?: number;
    studentsCountSubTitle?: string;
    partnerRatingCount?: number;
    partnerRatingSubTitle?: string;
}

export const CounterService = () => {

    const axiosPrivate = UseAxiosPrivate()
    const fileUploadInputRef = useRef<HTMLInputElement>(null)
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<CounterFormData>({
        defaultValues: {
            title: "",
            image: undefined,
            description: "",
            countryCount: 0,
            countryCountSubTitle: "",
            agentCount: 0,
            agentCountSubTitle: "",
            studentsCount: 0,
            studentsCountSubTitle: "",
            partnerRatingCount: 0,
            partnerRatingSubTitle: ""
        },
        mode: "onChange"
    })


    const { mutateAsync } = useMutation({
        mutationFn: async (data: CounterFormData) => {
            const formData = new FormData()
            formData.append("title", data.title)
            formData.append("description", data.description)
            if (data.image) {
                formData.append('image', data.image)
            }
            // Ensure numbers are converted to strings before appending
            formData.append("countryCount", data.countryCount?.toString() || "0");
            formData.append("agentCount", data.agentCount?.toString() || "0");
            formData.append("studentsCount", data.studentsCount?.toString() || "0");
            formData.append("partnerRatingCount", data.partnerRatingCount?.toString() || "0");

            // Add subtitles
            formData.append("countryCountSubTitle", data.countryCountSubTitle || "");
            formData.append("agentCountSubTitle", data.agentCountSubTitle || "");
            formData.append("studentsCountSubTitle", data.studentsCountSubTitle || "");
            formData.append("partnerRatingSubTitle", data.partnerRatingSubTitle || "");

            const response = await axiosPrivate.post('home/counter', formData)
            return response;
        },
        onSuccess: () => {
            resetFormValue()
            toast.success("Counter form submitted successfully!!", {
                position: "top-right"
            })
        },
        onError: (error) => {
            toast.error("Failed to submit counter form!!!")
            console.log(error, "counter form submit error")
        }
    })

    const onSubmit = (data: CounterFormData) => {
        mutateAsync(data)
        
    }

    const resetFormValue = () => {
       reset({
        title: "",
        image: undefined,
        description: "",
        countryCount: 0,
        countryCountSubTitle: "",
        agentCount: 0,
        agentCountSubTitle: "",
        studentsCount: 0,
        studentsCountSubTitle: "",
        partnerRatingCount: 0,
        partnerRatingSubTitle: "",
       })

       if(fileUploadInputRef.current){
        fileUploadInputRef.current.value = "";
       }
    }

    

    return {
        register,
        reset,
        handleSubmit,
        setValue,
        errors,
        onSubmit,
        fileUploadInputRef,
        
    }

}
import { useForm } from "react-hook-form"
import { UseAxiosPrivate } from "../../../auth/home_auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { WhyAmphloFormData, WhyAmphloValidation } from "../../form-validations/why-amphlo-validation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"

interface whyAMPHLOProps {
    whyAMPHLO: string;
    mainTitle: string;
    description: string;
    studentManagementTitle: string;
    studentManagementDescription: string;
    CRMThemeTitle: string;
    CRMThemeDescription: string;
    coursesTitle: string;
    coursesDescription: string;
    image?: File;
}

export const WhyAmphloService = () => {
    const axiosPrivate = UseAxiosPrivate()

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm <WhyAmphloFormData>({
        resolver: zodResolver(WhyAmphloValidation)
    })

    const { mutateAsync } = useMutation({
        mutationFn: async (data: whyAMPHLOProps) => {

            const formData = new FormData();
            formData.append('whyAMPHLO', data.whyAMPHLO)
            formData.append('mainTItle', data.mainTitle);
            formData.append('description', data.description)
            formData.append('studentManagementTitle', data.studentManagementTitle)
            formData.append('studentManagementDescription', data.studentManagementDescription)
            formData.append('CRMThemeTitle', data.CRMThemeTitle)
            formData.append('CRMThemeDescription', data.CRMThemeDescription)
            formData.append('coursesTitle', data.coursesTitle)
            formData.append('coursesDescription', data.coursesDescription)
            if(data.image) {
                formData.append('image', data.image)
            }
            // Array.from(data.images).forEach(image => formData.append('image', image))
            const response = await axiosPrivate.post('home/why-amphlo', formData)
            return response;
        },
        onSuccess: () => {
            reset()
            toast.success('Why Amphlo section created')
        },
        onError: (error) => {
            toast.error(`Failed to Create Why Amphlo section!! ${error.message}`)
        }
    })

    const onSubmit = async (data: whyAMPHLOProps) => {
        await mutateAsync(data)
    }

    return {
        register,
        handleSubmit,
        reset,
        setValue,
        errors,
        onSubmit,
    }
}
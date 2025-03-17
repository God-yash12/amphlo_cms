import { useForm } from "react-hook-form"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";


const signupSchema = z.object({
    name: z.string().nonempty({message: "Name is Required"}),
    email: z.string().nonempty({message: "Email is Required"}),
    password: z.string().nonempty({message: "Password isRequired"}),
})

type signupSchemaData = z.infer<typeof signupSchema>



export const AdminSignupService = () => {

    const form = useForm<signupSchemaData>({
        resolver: zodResolver(signupSchema),
    })

    // ${import.meta.env.VITE_BASE_URL}
    const loginMutation = useMutation({
        mutationFn: async (data: signupSchemaData) => {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin-signup`, data);
            return response.data;
        },
        onSuccess: () => {
            form.reset()
          toast.success("Admin Added successfully")
        },
        onError: (error: any) => {
            console.log("failed to login", error)
            const errorMessage = error?.response?.data?.message || "Failed to add Admin";
            toast.error(errorMessage)
        }
    });

    const submitLogin = (data: signupSchemaData) => {
        loginMutation.mutate(data)
    }

    return {
        form,
        submitLogin,
        loginMutation,
    }
}
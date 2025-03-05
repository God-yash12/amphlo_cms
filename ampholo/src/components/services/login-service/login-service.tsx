import { useForm } from "react-hook-form"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../../auth/home_auth"


const loginschema = z.object({
    email: z.string(),
    password: z.string(),
})

type loginschemaData = z.infer<typeof loginschema>


export const Loginservice = () => {
    const { setAccessToken } = useAuth();
    const navigate = useNavigate();
    const axiosPrivate = useAxios();

    const form = useForm<loginschemaData>({
        resolver: zodResolver(loginschema),
    })

    // ${import.meta.env.VITE_BASE_URL}
    const loginMutation = useMutation({
        mutationFn: async (data: loginschemaData) => {
            const response = await axiosPrivate.post(`auth/login`, data);
            return response.data;
        },
        onSuccess: (data) => {
            if (data?.accessToken) {
                setAccessToken(data.accessToken);
                navigate('/')
            } else {
                toast.error("Tokens not found in response");
            }
        },
        onError: (error: any) => {
            console.log("failed to login", error)
            const errorMessage = error?.response?.data?.message || "Login Failed";
            toast.error(errorMessage)
        }
    });

    const submitLogin = (data: loginschemaData) => {
        loginMutation.mutate(data)
    }

    return {
        form,
        submitLogin,
        loginMutation,
    }
}
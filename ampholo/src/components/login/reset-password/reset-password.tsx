import { useForm } from "react-hook-form";
import { useAxios } from "../../../auth/home_auth";
import PrimaryButton from "../../../ui/buttons/primary-button";
import InputField from "../../../ui/input/input";
import Header from "../../../ui/typographs/header/header";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
// import BeatLoader from "../../../ui/loader/beat-loader";
import BeatLoader from "react-spinners/BeatLoader";


interface ResetPasswordFormValues {
    email: string;
}

export const ResetPassword = () => {
    const axiosPrivate = useAxios();
    const navigate = useNavigate();
    const form = useForm<ResetPasswordFormValues>();


    const Mutation = useMutation({
        mutationFn: async (data: { email: string }) => {
            const response = await axiosPrivate.post("/auth/generate-otp", data);
            return response.data;
        },
        onSuccess: (data) => {
            localStorage.setItem("resetEmail", form.getValues("email"))
            form.reset()
            toast.success(data?.message || "OTP has been sent to your email");
            navigate('/verify-otp', { state: { email: form.getValues("email") } })
        },
        onError: (error: any) => {
            toast.error(error?.message || "Failed to provide the OTP, please try again later");
        },
    });

    const onSubmit = (data: ResetPasswordFormValues) => {
        Mutation.mutate(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="container max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
                <Header className="text-center text-2xl font-bold mb-4">Enter Your Email</Header>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <InputField
                        label="Enter Your Email"
                        {...form.register("email", { required: "Email is required", pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i })}
                        type="email"
                        className="border p-3 w-full rounded-md"
                    />
                    {form.formState.errors.email && <p className="text-red-500 text-sm">{form.formState.errors.email?.message}</p>}

                    <PrimaryButton type="submit" className="w-full"> {Mutation.isPending ? <div className="flex items-center justify-center gap-5"> OTP Generating <BeatLoader /></div> :"Submit" } </PrimaryButton>
                </form>
                <Link to="/login">
                    <section className="flex flex-initial items-center justify-start gap-1 mt-5">
                        <IoArrowBackSharp />
                        Back
                    </section>
                </Link>
            </div>
        </div>
    );
};

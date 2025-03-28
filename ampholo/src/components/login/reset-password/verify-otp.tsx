// VerifyOTP.tsx
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../ui/typographs/header/header";
import PrimaryButton from "../../../ui/buttons/primary-button";
import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../auth/home_auth";
import { toast } from "react-toastify";
import { IoArrowBackSharp } from "react-icons/io5";
import InputField from "../../../ui/input/input";
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

interface FormData {
    otp: string;
}

export const VerifyOTP = () => {
    const axiosPrivate = useAxios();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);

     const email = localStorage.getItem("resetEmail");
    
        if (!email) {
            toast.error("No email found. Please request OTP again.");
            navigate("/reset-password");
        }
    

    const verifyOTPMutation = useMutation({
        mutationFn: async (data: FormData) => {
            setIsSubmitting(true);
            try {
                const response = await axiosPrivate.post('/auth/verify-otp', { email, otp: data.otp });
                return response.data;
            } finally {
                setIsSubmitting(false);
            }
        },
        onSuccess: (data) => {
            navigate('/create-newPassword');
            reset();
            toast.success(data?.message || "OTP Verified");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Invalid OTP");
        }
    });

    const verifyOtp = (data: FormData) => {
        verifyOTPMutation.mutate(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="container max-w-sm p-6 bg-white rounded-lg shadow-md">
                <Header className="text-center text-2xl font-bold mb-4">
                    Verify Your OTP
                </Header>
                <form onSubmit={handleSubmit(verifyOtp)} className="space-y-4">
                    <div className="space-y-2">
                        <InputField
                            label="Enter Your OTP"
                            {...register('otp', {
                                required: "OTP is required",
                                pattern: {
                                    value: /^\d{6}$/,
                                    message: "OTP must be exactly 6 digits"
                                }
                            })}
                            type="text"
                            maxLength={6}
                            placeholder="Enter 6-digit OTP"
                        />
                        {errors.otp && (
                            <p className="text-red-500 text-sm">{errors.otp.message}</p>
                        )}
                    </div>

                    <PrimaryButton
                        type="submit"
                        className="w-full mt-4"
                        disabled={isSubmitting}
                    >
                        {verifyOTPMutation.isPending ? <div className="flex items-center justify-center gap-5"> OTP Verifying <BeatLoader /></div> :"Submit" }
                    </PrimaryButton>
                </form>

                <Link to="/reset-password">
                    <section className="flex flex-initial items-center justify-start gap-1 mt-5">
                        <IoArrowBackSharp />
                        Back
                    </section>
                </Link>
            </div>
        </div>
    );
};
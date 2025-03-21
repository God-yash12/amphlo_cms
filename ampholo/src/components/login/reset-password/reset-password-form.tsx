import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PrimaryButton from "../../../ui/buttons/primary-button";
import InputField from "../../../ui/input/input";
import { useAxios } from "../../../auth/home_auth";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { useMutation } from "@tanstack/react-query";
import BeatLoader from "react-spinners/BeatLoader";

interface NewPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export const NewPasswordForm = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxios();

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<NewPasswordFormData>();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const email = localStorage.getItem("resetEmail");

  if (!email) {
    toast.error("No email found. Please request OTP again.");
    navigate("/reset-password");
  }

  const mutation = useMutation({
    mutationFn: async (data: NewPasswordFormData) => {
      const response = await axiosPrivate.post("/auth/reset-password", {
        email,
        newPassword: data.newPassword,
      });
      return response.data;
    },
    onSuccess: (data) => {
      reset();
      navigate("/login");
      toast.success(data?.message || "Password Reset successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to Reset Password!!, Please try later");
    },
  });

  const onSubmit = async (data: NewPasswordFormData) => {
    await mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Password</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            {/* New Password Field */}
            <div className="relative">
              <InputField
                label="New Password"
                type={showNewPassword ? "text" : "password"} 
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                    message: "Password must contain at least one letter and one number",
                  },
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
            )}

            {/* Confirm Password Field */}
            <div className="relative">
              <InputField
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <PrimaryButton type="submit" className="w-full">
            {mutation.isPending ? (
              <div className="flex items-center justify-center gap-5">
                Password Resetting <BeatLoader />
              </div>
            ) : (
              "Reset Password"
            )}
          </PrimaryButton>
        </form>
        <Link to="/login">
          <section className="flex flex-initial items-center justify-start gap-1 mt-5">
            <IoArrowBackSharp />
            Cancel
          </section>
        </Link>
      </div>
    </div>
  );
};
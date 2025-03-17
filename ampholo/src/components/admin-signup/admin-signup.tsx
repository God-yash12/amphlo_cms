import { useState } from "react";
import PrimaryButton from "../../ui/buttons/primary-button";
import InputField from "../../ui/input/input";
import { AdminSignupService } from "../services/admin-signup/admin-signup-service";
import Header from "../../ui/typographs/header/header";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import { ErrorMessage } from "../../ui/typographs/error-message";

export const Adminsignup = () => {

    const { form, submitLogin, loginMutation } = AdminSignupService()
    const errorMessage  = form.formState.errors;
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 p-4">
            {/* Card Container */}
            <div className="bg-white shadow-lg rounded-2xl p-6 lg:p-10 w-full max-w-md border border-gray-200">
                <Header className="text-center mb-6">Register New Admin</Header>

                <form
                    onSubmit={form.handleSubmit(submitLogin)}
                    className="space-y-6">

                    <div>
                        <InputField
                            label="Full Name"
                            variant="outlined"
                            placeholder="Enter your FullName"
                            className="w-full"
                            {...form.register('name')}
                        />
                    </div>
                    {errorMessage.name && <ErrorMessage>{errorMessage.name.message}</ErrorMessage>}
                    {/* Email Input */}
                    <div>
                        <InputField
                            label="Email"
                            variant="outlined"
                            placeholder="Enter your email"
                            className="w-full"
                            {...form.register('email')}
                        />
                    {errorMessage.email && <ErrorMessage>{errorMessage.email.message}</ErrorMessage>}
                    </div>


                    {/* Password Input */}
                    <div className="relative">
                        <InputField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            placeholder="Enter your password"
                            className="w-full"
                            {...form.register('password')}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                        </button>

                    </div>
                    {errorMessage.password && <ErrorMessage>{errorMessage.password.message}</ErrorMessage>}

                    {/* Button */}
                    <PrimaryButton type="submit" className="w-full py-2 text-lg">
                    {loginMutation.isPending ? <div className="flex items-center justify-center gap-5"> Adding New Admin <BeatLoader /></div> :"Add New Admin" }
                    </PrimaryButton>
                </form>
            </div>
        </div>
    );
};

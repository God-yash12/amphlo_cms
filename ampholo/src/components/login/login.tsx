import { useState } from "react";
import PrimaryButton from "../../ui/buttons/primary-button";
import InputField from "../../ui/input/input";
import { Loginservice } from "../services/login-service/login-service";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Paragraph from "../../ui/typographs/paragraph";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";


export const LoginForm = () => {

    const { form, submitLogin, loginMutation } = Loginservice()
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            {/* Card Container */}
            <div className="bg-white shadow-lg rounded-2xl p-6 lg:p-10 w-full max-w-md border border-gray-200">
                <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">Admin Login</h1>

                <form
                    onSubmit={form.handleSubmit(submitLogin)}
                    className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <InputField
                            label="email"
                            variant="outlined"
                            placeholder="Enter your email"
                            className="w-full"
                            {...form.register('email')}
                        />
                    </div>

                    {/* Password Input */}
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

                    {/* Login Button */}
                    <PrimaryButton type="submit" className="w-full py-2 text-lg">
                        {loginMutation.isPending ? <div><BeatLoader /></div> : "Login Now"}
                    </PrimaryButton>
                </form>
                <div className="mt-5 flex">
                    <Link to="/reset-password">
                        <Paragraph className="cursor-pointer hover:underline">Forget Password</Paragraph>
                    </Link>
                </div>  
            </div>
        </div>
    );
};

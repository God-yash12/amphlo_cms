import PrimaryButton from "../../ui/buttons/primary-button";
import InputField from "../../ui/input/input";
import { Loginservice } from "../services/login-service/login-service";

export const LoginForm = () => {

    const { form, submitLogin } = Loginservice()

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
                            label="Username"
                            variant="outlined"
                            placeholder="Enter your Username"
                            className="w-full"
                            {...form.register('username')}
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <InputField
                            label="Password"
                            type="password"
                            variant="outlined"
                            placeholder="Enter your password"
                            className="w-full"
                            {...form.register('password')}
                        />
                    </div>

                    {/* Login Button */}
                    <PrimaryButton type="submit" className="w-full py-2 text-lg">
                        Login
                    </PrimaryButton>
                </form>
            </div>
        </div>
    );
};

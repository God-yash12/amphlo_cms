import InputField from "../../../../ui/input/input";
import PrimaryButton from "../../../../ui/buttons/primary-button";
import Header from "../../../../ui/typographs/header/header";
import Paragraph from "../../../../ui/typographs/paragraph";
import { TextEditor } from "../../../../ui/editor/text-editor";
import { ErrorMessage } from "../../../../ui/typographs/error-message";
import { UniWhyAmphloService } from "../../../services/about/for-university/why-amphlo-service";
import { BeatLoader, PropagateLoader } from "react-spinners";

export const WhyChooseAmphloCard = () => {
    const { form, onSubmit, isLoading, isPending } = UniWhyAmphloService()
    const errorMessage = form.formState.errors
    if (isLoading) return <PropagateLoader className="text-center" />
    return (
        <div className="bg-gradient-to-b from-gray-50 to-white">
            <div className=" bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
                {/* Header Section */}
                <div className="col-span-1 max-w-2xl mx-auto text-center mb-12">
                    <Header className="text-3xl text-left font-bold text-gray-900 mb-4">
                        Why Choose Amphlo?
                    </Header>
                    <Paragraph className="text-gray-600 text-left">
                        Customize and manage your website's Why Choose Amphlo section to highlight your main offerings
                    </Paragraph>
                </div>

                {/* Form Section */}
                <div className=" col-span-2">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="bg-white rounded-xl shadow-lg p-8 space-y-8"
                    >
                        {/* Title Input Section */}
                        <div className="space-y-4">
                            <div className="relative space-y-2">
                                <label className="block text-sm md:text-base font-semibold text-gray-700">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <InputField
                                    label="Showcase Your Headline *"
                                    className="w-full transition-all duration-200"
                                    size="lg"
                                    {...form.register('title')}

                                />
                            {errorMessage.title && <ErrorMessage>{errorMessage.title.message}</ErrorMessage>}
                            </div>

                            {/* Description Editor Section */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Feature Description *
                                </label>
                                <TextEditor
                                    placeholder="Describe your Why Choose Amphlo? in detail..."
                                    value={form.watch('description') ?? ""}
                                    onChange={(content) => form.setValue('description', content)}
                                />
                            </div>
                            {errorMessage.description && <ErrorMessage>{errorMessage.description.message}</ErrorMessage>}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4 border-t flex justify-center">
                            <PrimaryButton
                                type="submit"
                                disabled={isPending}
                                className="px-4 md:px-6 py-2"
                            >
                                {isPending ? <BeatLoader size={8} color="#ffffff" /> : "Save Changes"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

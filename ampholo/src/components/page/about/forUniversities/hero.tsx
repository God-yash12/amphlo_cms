import InputField from "../../../../ui/input/input";
import PrimaryButton from "../../../../ui/buttons/primary-button";
import Header from "../../../../ui/typographs/header/header";
import Paragraph from "../../../../ui/typographs/paragraph";
import { UniHeroService } from "../../../services/about/for-university/uni-hero-service";
import { ErrorMessage } from "../../../../ui/typographs/error-message";
import { FileUploadInput } from "../../../../ui/input/file-upload-input copy";
import { BeatLoader, PropagateLoader } from "react-spinners";

export const HeroUniversity = () => {
    const { form, onSubmit, image, isLoading, isPending } = UniHeroService();
    const errorMessage = form.formState.errors;

    if (isLoading) return (
        <div className="flex justify-center items-center h-64">
            <PropagateLoader color="#6366F1" />
        </div>
    );

    return (
        <div id="hero-university" className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
            {/* Header Section */}
            <div className="col-span-1 flex flex-col justify-between">
                <div>
                    <Header className="text-gray-800 font-bold text-xl md:text-2xl sm:text-left mb-4">
                        For University Hero Section Management
                    </Header>
                    <Paragraph className="text-gray-500 text-sm md:text-base text-left">
                        Customize and manage your website's "For University" hero section to highlight your main offerings, title, and description.
                    </Paragraph>
                </div>
            </div>

            {/* Form Section */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6 col-span-2 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
                {/* Title Input */}
                <div className="space-y-2">
                    <label className="block text-sm md:text-base font-semibold text-gray-700">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <InputField
                        label=""
                        variant="outlined"
                        size="lg"
                        placeholder="Enter a compelling title for your hero section"
                        className="w-full"
                        {...form.register("title", { required: "Title is required" })}
                    />
                    {errorMessage.title && <ErrorMessage className="text-red-500 text-xs md:text-sm">{errorMessage.title.message}</ErrorMessage>}
                </div>

                {/* SubTitle Input */}
                <div className="space-y-2">
                    <label className="block text-sm md:text-base font-semibold text-gray-700">
                        SubTitle <span className="text-red-500">*</span>
                    </label>
                    <InputField
                        label=""
                        variant="outlined"
                        size="lg"
                        placeholder="Enter a subtitle for your hero section"
                        className="w-full"
                        {...form.register("subTitle", { required: "SubTitle is required" })}
                    />
                    {errorMessage.subTitle && <ErrorMessage className="text-red-500 text-xs md:text-sm">{errorMessage.subTitle.message}</ErrorMessage>}
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                    <label className="block text-sm md:text-base font-semibold text-gray-700">
                        Feature Image <span className="text-red-500">*</span>
                    </label>
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-3 md:p-4">
                        <FileUploadInput
                            accept="image/*"
                            onChange={(files) => {
                                form.setValue("image", files.length > 0 ? files[0].id : null);
                            }}
                            initialFiles={image ? [{
                                id: image.id,
                                url: image?.url,
                                originalName: image.filename
                            }] : []}
                        />
                    </div>
                    {errorMessage.image && <ErrorMessage className="text-red-500 text-xs md:text-sm">{errorMessage.image.message}</ErrorMessage>}
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
    );
};
import InputField from "../../../../ui/input/input";
import PrimaryButton from "../../../../ui/buttons/primary-button";
import Header from "../../../../ui/typographs/header/header";
import Paragraph from "../../../../ui/typographs/paragraph";
import { UniHeroService } from "../../../services/about/for-university/uni-hero-service";
import { ErrorMessage } from "../../../../ui/typographs/error-message";
import { FileUploadInput } from "../../../../ui/input/file-upload-input copy";
import { BeatLoader, PropagateLoader } from "react-spinners";

export const HeroUniversity = () => {
    const { form, onSubmit, image, isLoading, isPending } = UniHeroService()
    const errorMessage = form.formState.errors

    if (isLoading) return <PropagateLoader className="text-center" />


    return (
        <div className="bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-4">
                {/* Header Section */}
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <Header className="text-3xl font-bold text-gray-900 mb-4">
                        For University Hero section Management
                    </Header>
                    <Paragraph className="text-gray-600">
                        Customize and manage your website'For University Hero sections section.
                    </Paragraph>
                </div>

                {/* Form Section */}
                <div className="mx-auto">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="bg-white rounded-xl shadow-lg p-8 space-y-8"
                    >
                        {/* Title Input Section */}
                        <div className="space-y-4">
                            <div className="relative">
                                <InputField
                                    label="Showcase Your Feature's Card Headline *"
                                    placeholder="Enter a compelling title for your features section"
                                    className="w-full transition-all duration-200"
                                    size="lg"
                                    {...form.register("title")}
                                />
                                {errorMessage.title && <ErrorMessage>{errorMessage.title.message}</ErrorMessage>}
                            </div>

                            {/* Description Editor Section */}
                            <div className="space-y-2">
                                <InputField
                                    label="SubTitle *"
                                    className="w-full transition-all duration-200"
                                    size="lg"
                                    {...form.register('subTitle')}
                                />
                                {errorMessage.subTitle && <ErrorMessage>{errorMessage.subTitle.message}</ErrorMessage>}
                            </div>
                            <div className="space-y-2 w-auto">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Feature Image *
                                </label>
                                <FileUploadInput
                                    accept="image/*"
                                    onChange={(files) => form.setValue('image', files ? files[0].id : null)}
                                    initialFiles={image ? [{
                                        id: image.id,
                                        url: image.url,
                                        originalName: image.filename
                                    }] : []}
                                />
                                {errorMessage.image && <ErrorMessage>{errorMessage.image.message}</ErrorMessage>}

                            </div>

                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">

                            <PrimaryButton type="submit" className="w-full text-center">{isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

import InputField from "../../../../ui/input/input";
import PrimaryButton from "../../../../ui/buttons/primary-button";
import Header from "../../../../ui/typographs/header/header";
import Paragraph from "../../../../ui/typographs/paragraph";
import { TextEditor } from "../../../../ui/editor/text-editor";
import { UniFeatureService } from "../../../services/about/for-university/uni-feature-service";
import { ErrorMessage } from "../../../../ui/typographs/error-message";
import { BeatLoader, PropagateLoader } from "react-spinners";
import { FileUploadInput } from "../../../../ui/input/file-upload-input copy";

export const UniAboutFeatures = () => {
    const { form, onSubmit, isLoading, isPending, image } = UniFeatureService()
    const errorMessage = form.formState.errors
    if (isLoading) return <PropagateLoader className="text-center" />
    return (
        <div className="bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <Header className="text-3xl font-bold text-gray-900 mb-4">
                        What Makes Amphlo Different
                    </Header>
                    <Paragraph className="text-gray-600">
                        Customize and manage your website'sWhat Makes Amphlo Different section
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
                                    label="Showcase Your Feature's Headline *"
                                    className="w-full transition-all duration-200"
                                    size="lg"
                                    {...form.register('title')}
                                />
                                {errorMessage.title && <ErrorMessage>{errorMessage.title.message}</ErrorMessage>}
                            </div>

                            {/* Description Editor Section */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Feature Description *
                                </label>
                                <TextEditor
                                    placeholder="Describe your key features in detail..."
                                    value={form.watch('description') ?? ""}
                                    onChange={(content) => form.setValue('description', content)}
                                />
                                {errorMessage.description && <ErrorMessage>{errorMessage.description.message}</ErrorMessage>}
                            </div>
                            <div className="w-auto space-y-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image *
                                </label>
                                <FileUploadInput
                                    onChange={(imageId) => form.setValue('image', imageId ? imageId[0].id : null)}
                                    initialFiles={image ? [{
                                        id: image.id,
                                        url: image.url,
                                        originalName: image.filename
                                    }] : []}
                                />
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

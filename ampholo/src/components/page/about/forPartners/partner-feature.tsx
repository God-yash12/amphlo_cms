import InputField from "../../../../ui/input/input";
import PrimaryButton from "../../../../ui/buttons/primary-button";
import Header from "../../../../ui/typographs/header/header";
import Paragraph from "../../../../ui/typographs/paragraph";
import { TextEditor } from "../../../../ui/editor/text-editor";
import { ErrorMessage } from "../../../../ui/typographs/error-message";
import { FiPlus } from "react-icons/fi";
import SecondaryButton from "../../../../ui/buttons/secondary-button";
import { PartnerFeatureService } from "../../../services/about/for-partner/partner-feature-service";
import { FileUploadInput } from "../../../../ui/input/file-upload-input copy";
import { BeatLoader, PropagateLoader } from "react-spinners";

export const PartnerFeatureSection = () => {
    const {
        form,
        onSubmit,
        fields,
        append,
        remove,
        image,
        isLoading,
        isPending,
    } = PartnerFeatureService();

    const { register, formState: { errors }, setValue } = form;

    const errorMessage = form.formState.errors;

    if (isLoading) return <PropagateLoader className="text-center" />

    return (
        <div className=" bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-12">
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="bg-white rounded-xl shadow-lg p-8 space-y-8"
                >
                    {/* Header Section */}
                    <div className="max-w-2xl mx-auto text-center mb-12">
                        <Header className="text-3xl font-bold text-gray-900 mb-4">
                            Partner Feature Section
                        </Header>
                        <Paragraph className="text-gray-600">
                            Customize and manage your website's partner Features section
                        </Paragraph>
                    </div>

                    {/* Title Input Section */}
                    <div className="space-y-4">
                        <div className="relative">
                            <InputField
                                label="Showcase Your Feature's Headline"
                                placeholder="Enter a compelling title for your features section"
                                className="w-full transition-all duration-200"
                                size="lg"
                                {...form.register('featureTitle')}
                            />
                            {errorMessage.featureTitle && <ErrorMessage>{errorMessage.featureTitle.message}</ErrorMessage>}
                        </div>

                        {/* Description Editor Section */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Feature Description
                            </label>
                            <TextEditor
                                value={form.watch('featureDescription') ?? ""}
                                onChange={(content) => form.setValue('featureDescription', content)}
                            />
                            {errorMessage.featureDescription && <ErrorMessage>{errorMessage.featureDescription.message}</ErrorMessage>}
                        </div>
                        <FileUploadInput
                            accept="image/*"
                            onChange={(files) => form.setValue('image', files[0].id)}
                            initialFiles={image ? [{
                                id: image.id,
                                url: image.url,
                                originalName: image.filename
                            }] : []}
                        />
                        {errorMessage.image && <ErrorMessage>{errorMessage.image.message}</ErrorMessage>}

                    </div>

                    {/* Form Section */}
                    <div className="mx-auto">
                        <Paragraph className="space-y-6t text-lg text-gray-800 font-normal">Add Features  for Partner</Paragraph>
                        {fields.map((field, index) => (
                            <div key={field.id} className="space-y-4 border-b pb-8 relative">
                                {/* Title Input */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <InputField
                                        label="Title"
                                        placeholder="Enter feature title"
                                        className="w-full"
                                        {...register(`feature.${index}.title`)}
                                    />
                                    {errors.feature?.[index]?.title && (
                                        <ErrorMessage>
                                            {errors.feature[index]?.title?.message}
                                        </ErrorMessage>
                                    )}
                                    {fields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="top-0 right-0 text-gray-600 hover:text-red-700"
                                        >
                                            <SecondaryButton>Delete Item</SecondaryButton>
                                        </button>
                                    )}
                                </div>

                                {/* Description Editor */}
                                <div className="flex flex-col space-y-2">

                                    <TextEditor
                                        placeholder="Describe your feature in detail..."
                                        value={field.description}
                                        onChange={(content) => {
                                            setValue(`feature.${index}.description`, content);
                                        }}
                                    />
                                    {errors.feature?.[index]?.description && (
                                        <ErrorMessage>
                                            {errors.feature[index]?.description?.message}
                                        </ErrorMessage>
                                    )}
                                </div>

                                {/* Image Upload (commented out for now) */}
                                {/* <div className="relative">
                                    <FileUploadInputField
                                        onUploadSuccess={(fileId) => form.setValue(`overview.${index}.image`, fileId)}
                                    />
                                    {errors.overview?.[index]?.image && (
                                        <ErrorMessage>
                                            {errors.overview[index]?.image?.message}
                                        </ErrorMessage>
                                    )}
                                </div> */}
                            </div>
                        ))}

                        {/* Add New Feature Button */}
                        <div className="flex justify-between items-center">
                            {fields.length < 5 && (
                                <PrimaryButton
                                    type="button"
                                    onClick={() => append({ title: '', description: '' })}
                                    className="flex items-center gap-2"
                                >
                                    <FiPlus className="w-4 h-4" />
                                    Add Feature
                                </PrimaryButton>
                            )}

                            {/* Save Changes Button */}

                            <PrimaryButton type="submit" className="w-full text-center">{isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

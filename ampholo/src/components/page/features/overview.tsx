import InputField from "../../../ui/input/input";
import PrimaryButton from "../../../ui/buttons/primary-button";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { TextEditor } from "../../../ui/editor/text-editor";
import { ErrorMessage } from "../../../ui/typographs/error-message";
import { UseOverviewService } from "../../services/feature/overview";
import { FiPlus } from "react-icons/fi";
import SecondaryButton from "../../../ui/buttons/secondary-button";
import { FileUploadInput } from "../../../ui/input/file-upload-input copy";
import { BeatLoader } from "react-spinners";

export const FeatureOverview = () => {
    const {
        form,
        onSubmit,
        fields,
        append,
        remove,
        mutation,
    } = UseOverviewService();

    if (fields.length === 0) {
        append({ title: "", description: "", image: 0 });
    }
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <Header className="text-3xl font-bold text-gray-900 mb-4">
                        Feature Overview
                    </Header>
                    <Paragraph className="text-gray-600">
                        Customize and manage your website's Features Overview section
                    </Paragraph>
                </div>

                {/* Form Section */}
                <div className="mx-auto">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="bg-white rounded-xl shadow-lg p-8 space-y-8"
                    >
                        {fields.map((field, index) => (
                            <div key={field.id} className="space-y-4 border-b pb-8 relative">
                                {/* Title Input */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label="Title *"
                                        placeholder="Enter feature title"
                                        className="w-full"
                                        {...form.register(`overview.${index}.title`)}
                                    />
                                    {form.formState.errors.overview?.[index]?.title && (
                                        <ErrorMessage>
                                            {form.formState.errors.overview[index]?.title?.message}
                                        </ErrorMessage>
                                    )}
                                    {fields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="top-0 right-0 text-gray-600 hover:text-red-700"
                                        >
                                            <SecondaryButton  > Delete Item </SecondaryButton>
                                        </button>
                                    )}
                                </div>

                                {/* Description Editor */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Feature Description *
                                    </label>
                                    <TextEditor
                                        placeholder="Describe your feature in detail..."
                                        value={form.watch(`overview.${index}.description`)}
                                        onChange={(content) => {
                                            form.setValue(`overview.${index}.description`, content);
                                        }}
                                    />
                                    {form.formState.errors.overview?.[index]?.description && (
                                        <ErrorMessage>
                                            {form.formState.errors.overview[index]?.description?.message}
                                        </ErrorMessage>
                                    )}
                                </div>

                                {/* Image Upload */}
                                <div className="relative">
                                    <FileUploadInput
                                        onChange={(files) => form.setValue(`overview.${index}.image`, files[0].id)}
                                    />
                                    {form.formState.errors.overview?.[index]?.image && (
                                        <ErrorMessage>
                                            {form.formState.errors.overview[index]?.image?.message}
                                        </ErrorMessage>
                                    )}
                                </div>

                            </div>

                        ))}

                        <div className="flex justify-between items-center">
                            {fields.length < 2 && (
                                <PrimaryButton
                                    type="button"
                                    onClick={() => append({ title: '', description: '', image: 0 })}
                                    className="flex items-center gap-2"
                                >
                                    <FiPlus className="w-4 h-4" />
                                    Add Feature
                                </PrimaryButton>
                            )}


                            <PrimaryButton type="submit" className="w-full text-center">{mutation.isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
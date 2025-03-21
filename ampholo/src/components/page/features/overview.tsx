import InputField from "../../../ui/input/input";
import PrimaryButton from "../../../ui/buttons/primary-button";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { TextEditor } from "../../../ui/editor/text-editor";
import { ErrorMessage } from "../../../ui/typographs/error-message";
import { UseOverviewService } from "../../services/feature/overview";
import { FiPlus } from "react-icons/fi";
import { FileUploadInput } from "../../../ui/input/file-upload-input copy";
import { BeatLoader, PropagateLoader } from "react-spinners";
import { MdDelete } from "react-icons/md";

export const FeatureOverview = () => {
    const {
        form,
        onSubmit,
        fields,
        append,
        remove,
        mutation,
        isLoading,
    } = UseOverviewService();

    if (fields.length === 0) {
        append({ title: "", description: "", image: 0 });
    }

    if (isLoading) return <PropagateLoader className="text-center" />


    return (
        <div >
            <div className="container bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
                {/* Header Section */}
                <div className="col-span-1 max-w-2xl mx-auto text-left mb-12">
                    <Header className="text-3xl font-bold text-gray-900 mb-4">
                        Feature Overview
                    </Header>
                    <Paragraph className="text-gray-600 text-left">
                        Customize and manage your website's Features Overview section, add title, description and feature image are required.
                    </Paragraph>
                </div>

                {/* Form Section */}
                <div className="col-span-2">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="bg-white rounded-xl shadow-lg p-8 space-y-8"
                    >
                        {fields.map((field, index) => (
                            <div key={field.id} className="space-y-4 border-b pb-8 relative">
                                {/* Title Input */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Title <span className="text-red-500">*</span>
                                        </label>
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
                                    </div>

                                    {fields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="top-0 right-0 text-gray-600 hover:text-red-700"
                                        >
                                            <MdDelete className="text-2xl text-gray-800 " />
                                        </button>
                                    )}
                                </div>

                                {/* Description Editor */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                                <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Feature Image *
                                    </label>
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


                            <PrimaryButton type="submit" disabled={mutation.isPending} className="w-full text-center">{mutation.isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
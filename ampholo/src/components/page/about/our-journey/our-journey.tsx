import { FiPlus } from "react-icons/fi";
import PrimaryButton from "../../../../ui/buttons/primary-button";
import SecondaryButton from "../../../../ui/buttons/secondary-button";
import { TextEditor } from "../../../../ui/editor/text-editor";
import InputField from "../../../../ui/input/input";
import { ErrorMessage } from "../../../../ui/typographs/error-message";
import Header from "../../../../ui/typographs/header/header";
import Paragraph from "../../../../ui/typographs/paragraph";
import { OurJourneyService } from "../../../services/about/our-journey/our-journey-service";
import { FileUploadInput } from "../../../../ui/input/file-upload-input copy";
import { BeatLoader, PropagateLoader } from "react-spinners";

export const OurJourney = () => {
    const {
        form,
        onSubmit,
        fields,
        append,
        remove,
        data,
        isLoading,
        mutation,
    } = OurJourneyService();

    const { register, formState: { errors }, setValue } = form;

    if (isLoading) return <PropagateLoader className="text-center" />

    if (fields.length === 0) {
        append({ title: '', description: '', image: 0, year: new Date() }, { shouldFocus: false });
    }


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
                {/* Header Section */}
                <div className="col-span-1 max-w-2xl mx-auto text-center mb-12">
                    <Header className=" text-left text-3xl font-bold text-gray-900 mb-4">
                        Our Journey
                    </Header>
                    <Paragraph className="text-gray-600 text-left">
                        Customize and manage your website's Journey section
                    </Paragraph>
                </div>

                {/* Form Section */}
                <div className=" col-span-2">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="bg-white rounded-xl shadow-lg p-8 space-y-8"
                    >
                        {fields.map((field, index) => (
                            <div key={field.id} className="space-y-4 border-b pb-8 relative">
                                {/* Title Input */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm md:text-base text-gray-700 font-semibold">
                                            Title <span className="text-red-500">*</span>
                                        </label>

                                        <InputField
                                            label="Title"
                                            placeholder="Enter feature title"
                                            className="w-full"
                                            {...register(`aboutMore.${index}.title`)}
                                        />
                                        {errors.aboutMore?.[index]?.title && (
                                            <ErrorMessage>
                                                {errors.aboutMore[index]?.title?.message}
                                            </ErrorMessage>
                                        )}
                                    </div>

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
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Feature Description
                                    </label>
                                    <TextEditor
                                        placeholder="Describe your feature in detail..."
                                        value={field.description}
                                        onChange={(content) => {
                                            setValue(`aboutMore.${index}.description`, content);
                                        }}
                                    />
                                    {errors.aboutMore?.[index]?.description && (
                                        <ErrorMessage>
                                            {errors.aboutMore[index]?.description?.message}
                                        </ErrorMessage>
                                    )}
                                </div>

                                {/* Date Picker */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Year *
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        {...register(`aboutMore.${index}.year`, { valueAsDate: true })}
                                    />
                                    {errors.aboutMore?.[index]?.year && (
                                        <ErrorMessage>
                                            {errors.aboutMore[index]?.year?.message}
                                        </ErrorMessage>
                                    )}
                                </div>

                                {/* Image Upload */}
                                <div className="relative">
                                    <FileUploadInput
                                        accept="image/*"
                                        onChange={(files) => form.setValue(`aboutMore.${index}.image`, files[0].id)}
                                        initialFiles={
                                            data?.[index]?.image
                                                ? [{
                                                    id: data[index].image.id,
                                                    url: data[index].image.url,
                                                    originalName: data[index].image.filename,
                                                }]
                                                : []
                                        }
                                    />

                                    {errors.aboutMore?.[index]?.image && (
                                        <ErrorMessage>
                                            {errors.aboutMore[index]?.image?.message}
                                        </ErrorMessage>
                                    )}

                                </div>
                            </div>
                        ))}

                        <div className="flex justify-between items-center">
                            {fields.length < 10 && (
                                <PrimaryButton
                                    type="button"
                                    onClick={() => append({ title: '', description: '', image: 0, year: new Date() })}
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

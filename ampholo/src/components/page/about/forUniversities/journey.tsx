import InputField from "../../../../ui/input/input";
import PrimaryButton from "../../../../ui/buttons/primary-button";
import Header from "../../../../ui/typographs/header/header";
import Paragraph from "../../../../ui/typographs/paragraph";
import { TextEditor } from "../../../../ui/editor/text-editor";
import { ErrorMessage } from "../../../../ui/typographs/error-message";
import SecondaryButton from "../../../../ui/buttons/secondary-button";
import { Textarea } from "@material-tailwind/react";
import { UseJourneyService } from "../../../services/about/for-university/uni-journey-service";
import { BeatLoader, PropagateLoader } from "react-spinners";
import { MdDelete } from "react-icons/md";

export const JourneyUniversity = () => {
    const { form, onSubmit, isLoading, fields, append, remove, mutation } = UseJourneyService();
    const errorMessage = form.formState.errors
    if (isLoading) return <PropagateLoader className="text-center" />

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
                {/* Header Section */}
                <div className="col-span-1 max-w-2xl mx-auto text-center mb-12">
                    <Header className="text-3xl font-bold text-gray-900 text-left mb-4">
                        Our Journey and Impact
                    </Header>
                    <Paragraph className="text-gray-600 text-left">
                        Customize and manage your Our Journey and Impact section.
                    </Paragraph>
                </div>

                {/* Form Section */}
                <div className=" col-span-2 bg-white rounded-xl shadow-lg p-8 space-y-8">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}

                    >
                        {/* Title Input Section */}
                        <div className="space-y-4">
                            <div className="relative space-y-2">
                                <label className="block text-sm md:text-base font-semibold text-gray-700">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <InputField
                                    label="Showcase Your Feature's Headline *"
                                    placeholder="Enter a compelling title for your features section"
                                    className="w-full transition-all duration-200"
                                    size="lg"
                                    {...form.register("title")}
                                />
                                {errorMessage.title && <ErrorMessage>{errorMessage.title.message}</ErrorMessage>}
                            </div>

                            {/* Description Editor Section */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description *
                                </label>
                                <TextEditor
                                    value={form.watch('description') ?? ''}
                                    onChange={(content) => {
                                        form.setValue("description", content);
                                    }}
                                />
                                {errorMessage.description && <ErrorMessage>{errorMessage.description.message}</ErrorMessage>}

                            </div>
                        </div>

                        {/* Journey Details */}
                        <section className="space-y-5 mt-7">

                            <h3 className="font-semibold text-gray-800 text-sm md:text-base">Journey Details</h3>
                            {fields.map((field, index) => (
                                <div key={field.id} className="space-y-5">

                                    <InputField
                                        type="number"
                                        label='Number'
                                        placeholder=" Number"
                                        {...form.register(`cardDetail.${index}.count`, { valueAsNumber: true })}
                                    />
                                    {errorMessage.cardDetail?.[index]?.count && (
                                        <ErrorMessage>
                                            {errorMessage.cardDetail[index]?.count?.message}
                                        </ErrorMessage>
                                    )}
                                    <InputField
                                        label="Title"
                                        placeholder="Title"
                                        {...form.register(`cardDetail.${index}.cardTitle`)}
                                    />
                                    {errorMessage.cardDetail?.[index]?.cardTitle && (
                                        <ErrorMessage>
                                            {errorMessage.cardDetail[index]?.cardTitle?.message}
                                        </ErrorMessage>
                                    )}
                                    {/* @ts-ignore */}
                                    <Textarea
                                        label="Description"
                                        placeholder="Description"
                                        {...form.register(`cardDetail.${index}.cardDescription`)}
                                    />
                                    {errorMessage.cardDetail?.[index]?.cardDescription && (
                                        <ErrorMessage>
                                            {errorMessage.cardDetail[index].cardDescription?.message}
                                        </ErrorMessage>
                                    )}
                                    {fields.length > 1 && (
                                        <MdDelete onClick={() => remove(index)} className="text-xl cursor-pointer" />
                                    )}
                                </div>

                            ))}
                            {
                                fields.length < 4 && (
                                    <div>
                                        <SecondaryButton
                                            onClick={(e) => {
                                                e.preventDefault();
                                                append({ count: 1, cardTitle: '', cardDescription: '' });
                                            }}
                                        >
                                            Add Journey Details
                                        </SecondaryButton>
                                    </div>
                                )
                            }
                        </section>
                        {/* Submit Button */}
                        <div className="pt-4 border-t flex justify-center">

                            <PrimaryButton type="submit" className="w-full text-center">{mutation.isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

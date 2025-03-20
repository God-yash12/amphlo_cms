import { useEffect, useRef, useState } from "react";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import InputField from "../../../ui/input/input";
import { UseTestimonialService } from "../../services/home/testimonial-service";
import { TextEditor } from "../../../ui/editor/text-editor";
import PrimaryButton from "../../../ui/buttons/primary-button";
import { ErrorMessage } from "../../../ui/typographs/error-message";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import SecondaryButton from "../../../ui/buttons/secondary-button";
import { FileUploadInput } from "../../../ui/input/file-upload-input copy";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BeatLoader, PulseLoader } from "react-spinners";
import DOMPurify from 'dompurify';
import { FormProvider } from "react-hook-form";

export const Testimonials = () => {
    const { form, onSubmit, testimonials, isLoading, isError, error, selectedImage, deleteTestimonial, handleDeleteClick, selectedTestimonial, setSelectedTestimonial, mutation } = UseTestimonialService();
    const errorMessage = form.formState.errors;
    const formRef = useRef<HTMLDivElement>(null);

    const [isImageLoading, setIsImageLoading] = useState(false);
    const [isRatingLoading, setIsRatingLoading] = useState(false);

    useEffect(() => {
        if (selectedTestimonial) {
            setIsImageLoading(true);
            setIsRatingLoading(true);
            setTimeout(() => {
                setIsImageLoading(false);
                setIsRatingLoading(false);
            }, 500);
        }
    }, [selectedTestimonial]);

    const scrollToForm = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div>
            <div ref={formRef} className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
                {/* Header Section */}
                <div className="col-span-1 mb-8 text-center">
                    <Header className="text-3xl font-bold text-gray-800 mb-2 text-left">
                        {selectedTestimonial ? "Update Testimonial" : " Share Your Experience"}
                    </Header>
                    <Paragraph className="text-gray-600 text-left">
                        We value your feedback! Help us improve by sharing your testimonial.
                    </Paragraph>
                </div>

                {/* Form Section */}
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 col-span-2 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 ">
                        {/* Person Name Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Person Name *
                            </label>
                            <InputField
                                label="Person Name *"
                                {...form.register("personName")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg transition-all"
                            />
                            {errorMessage.personName && (
                                <ErrorMessage className="text-red-500 text-sm">
                                    {errorMessage.personName.message}
                                </ErrorMessage>
                            )}
                        </div>

                        {/* Workplace Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Person Workplace *
                            </label>
                            <InputField
                                label="Person Workplace *"
                                {...form.register("workPlace")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg transition-all"
                            />
                            {errorMessage.workPlace && (
                                <ErrorMessage className="text-red-500 text-sm">
                                    {errorMessage.workPlace.message}
                                </ErrorMessage>
                            )}
                        </div>

                        {/* Feedback Editor */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Your Feedback *
                            </label>
                            <div className="border border-gray-300 rounded-lg overflow-hidden">
                                <TextEditor
                                    placeholder="Provide Us Your Feedback Message"
                                    value={form.watch("feedback") ?? ""}
                                    onChange={(content: any) => form.setValue("feedback", content)}
                                />
                            </div>
                            {errorMessage.feedback && (
                                <ErrorMessage className="text-red-500 text-sm">
                                    {errorMessage.feedback.message}
                                </ErrorMessage>
                            )}
                        </div>

                        {/* File Upload */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Profile Picture
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                                {isImageLoading ? (
                                    <div><PulseLoader /></div>
                                ) : (
                                    <FileUploadInput
                                        onChange={(fileId) => form.setValue('imageId', fileId[0].id)}
                                        initialFiles={selectedImage ? [{
                                            id: selectedImage?.id,
                                            originalName: selectedImage.filename,
                                            url: selectedImage?.url
                                        }] : []}
                                    />
                                )}

                            </div>
                        </div>

                        {/* Rating Section */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Rate Your Experience *
                            </label>
                            {isRatingLoading ? (
                                <div><PulseLoader /></div>
                            ) : (
                                <ReactStars
                                    count={5}
                                    size={32}
                                    isHalf={true}
                                    value={Number(form.watch("ratings")) || 0}
                                    onChange={(newRating: number) => {
                                        form.setValue("ratings", newRating);
                                    }}
                                    activeColor="#fbbf24"
                                />
                            )}
                            {errorMessage.ratings && (
                                <ErrorMessage className="text-red-500 text-sm">
                                    {errorMessage.ratings.message}
                                </ErrorMessage>
                            )}
                        </div>

                        {/* Submit Button */}
                        <PrimaryButton type="submit" className="w-full text-center">
                            {mutation.isPending ? <div><BeatLoader /></div> :
                                <div>{selectedTestimonial ? "Update" : "Submit"}</div>}
                        </PrimaryButton>
                    </form>
                </FormProvider>
            </div>

            <div className="mt-10">
                <Header className="text-2xl font-bold text-gray-800 mb-6">Testimonials</Header>
                {isLoading && <PropagateLoader className="text-center" />}
                {isError && error && <Paragraph className="text-red-500">Error: {error.message}</Paragraph>}

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials && testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col space-y-4"
                        >
                            {/* Testimonial Header */}
                            <div className="flex items-center space-x-4">
                                <img
                                    src={testimonial.image?.url}
                                    alt={testimonial.personName}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                />
                                <div>
                                    <Header className="text-lg font-medium text-gray-700">
                                        {testimonial.personName}
                                    </Header>
                                    <Paragraph className="text-gray-500 text-sm">
                                        {testimonial.workPlace}
                                    </Paragraph>
                                </div>
                            </div>

                            {/* Testimonial Feedback */}
                            <Paragraph className="text-gray-600 text-sm flex-1">
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(testimonial.feedback) }} />
                            </Paragraph>

                            {/* Ratings */}
                            <div className="flex justify-center">
                                <ReactStars
                                    count={5}
                                    size={20}
                                    isHalf={true}
                                    value={Number(testimonial.ratings)}
                                    edit={false}
                                    activeColor="#fbbf24"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end space-x-4">
                                <SecondaryButton
                                    onClick={() => {
                                        setSelectedTestimonial(testimonial);
                                        scrollToForm();
                                    }}
                                    className="px-4 py-2 text-sm"
                                >
                                    Update
                                </SecondaryButton>
                                <SecondaryButton
                                    onClick={() => handleDeleteClick(testimonial.id)}
                                    className="px-4 py-2 text-sm"
                                >
                                    {deleteTestimonial === testimonial.id ? (
                                        <BeatLoader size={8} color="#6B7280" />
                                    ) : (
                                        "Delete"
                                    )}
                                </SecondaryButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};
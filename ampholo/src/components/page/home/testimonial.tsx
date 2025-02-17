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


export const Testimonials = () => {
    const { form, onSubmit, testimonials, isLoading, isError, error, deleteMutation, selectedTestimonial, setSelectedTestimonial } = UseTestimonialService();
    const errorMessage = form.formState.errors;

   
    return (
        <div>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <Header className="text-3xl font-bold text-gray-800 mb-2">
                        {selectedTestimonial ? "Update Testimonial" : " Share Your Experience"}
                    </Header>
                    <Paragraph className="text-gray-600">
                        We value your feedback! Help us improve by sharing your testimonial.
                    </Paragraph>
                </div>

                {/* Form Section */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Person Name Field */}
                    <div className="space-y-2">
                        <InputField
                            label="Person Name"
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
                        <InputField
                            label="Person Workplace"
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Your Feedback
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Profile Picture
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                            <FileUploadInput
                                onChange={(fileId) => form.setValue('imageId', fileId[0].id)}
                                initialFiles={ selectedTestimonial?.image? [{
                                    id: selectedTestimonial?.image.id,
                                    url: selectedTestimonial?.image.url,
                                    originalName: selectedTestimonial?.image.filename
                                }] : []}
                            />
                        </div>

                    </div>

                    {/* Rating Section */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rate Your Experience
                        </label>
                        <div className="bg-gray-50 rounded-lg p-4">
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
                        </div>
                        {errorMessage.ratings && (
                            <ErrorMessage className="text-red-500 text-sm">
                                {errorMessage.ratings.message}
                            </ErrorMessage>
                        )}
                    </div>

                    {/* Submit Button */}
                    <PrimaryButton
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        {selectedTestimonial ? "Update Testimonial" : "Submit Testimonial"}
                    </PrimaryButton>
                </form>
            </div>

            {/* Testimonials Section */}
            <div className="mt-10">
                <Header className="text-2xl font-bold text-gray-800 mb-4">Testimonials</Header>
                {isLoading && <Paragraph>Loading testimonials...</Paragraph>}
                {isError && error && <Paragraph className="text-red-500">Error: {error.message}</Paragraph>}
                {testimonials && testimonials.map((testimonial: any, index: number) => (
                    <div key={index} className="border-b border-gray-200 py-4 flex items-center space-x-4">
                        <img
                            src={testimonial.image?.url}
                            alt={testimonial.personName}
                            className="w-16 h-16 rounded-full object-cover border"
                        />
                        <div>
                            <Header className="text-lg font-medium text-gray-700">
                                {testimonial.personName} - {testimonial.workPlace}
                            </Header>
                            <Paragraph className="text-gray-600">{testimonial.feedback}</Paragraph>
                            <ReactStars
                                count={5}
                                size={20}
                                isHalf={true}
                                value={Number(testimonial.ratings)}
                                edit={false}
                                activeColor="#fbbf24"
                            />
                        </div>
                        <div className="flex space-x-6">
                            <SecondaryButton onClick={() => setSelectedTestimonial(testimonial)}>Update</SecondaryButton>
                            <SecondaryButton onClick={() => deleteMutation.mutate(testimonial.id)}>Delete</SecondaryButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

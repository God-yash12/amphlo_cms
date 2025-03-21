import { useEffect, useRef, useState } from "react";
import InputField from "../../../ui/input/input";
import PrimaryButton from "../../../ui/buttons/primary-button";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { TextEditor } from "../../../ui/editor/text-editor";
import { CoreFeaturesFormService } from "../../services/form-service/features/core-feature-card";
import { ErrorMessage } from "../../../ui/typographs/error-message";
import SecondaryButton from "../../../ui/buttons/secondary-button";
import { FileUploadInput } from "../../../ui/input/file-upload-input copy";
import { BeatLoader } from "react-spinners";
import DOMPurify from "dompurify";
import { FormProvider } from "react-hook-form";


export const CoreFeatureCard = () => {
    const { form, onSubmit, imagePreview, selectedCoreFeatureCard, loading, deleteCard, deleteCardId, setSelectedCoreFeatureCard, data, isLoading } = CoreFeaturesFormService()
    const errorMessage = form.formState.errors;
    const formRef = useRef<HTMLDivElement>(null)

    const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

    useEffect(() => {
        if (selectedCoreFeatureCard) {
            setIsImageLoading(true)

            setTimeout(() => {
                setIsImageLoading(false)
            }, 500)
        }
    }, [selectedCoreFeatureCard])

    const scrollTOForm = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }

    return (
       <div >
            <div className="container mx-auto px-4 py-5">
                <div ref={formRef} className="container bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
                    {/* Header Section */}
                    <div className="col-span-1 max-w-2xl mx-auto  mb-12">
                        <Header className="text-3xl font-bold text-gray-900 mb-4 text-left">
                            {selectedCoreFeatureCard ? "Update Core Feature Card" : "Add Core Feature Card"}
                        </Header>
                        <Paragraph className="text-gray-600 text-left">
                            Customize and manage your website's  Core Feature Card of About Our portal Page
                        </Paragraph>
                    </div>

                    {/* Form Section */}
                    <div className="col-span-2 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
                        <FormProvider {...form} >
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                {/* Title Input Section */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm  text-gray-700 font-semibold">
                                            Title <span className="text-red-500">*</span>
                                        </label>
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
                                        <label className="block text-sm  text-gray-700 font-semibold">
                                            Description  <span className="text-red-500">*</span>
                                        </label>
                                        <TextEditor
                                            placeholder="Describe your key features in detail..."
                                            value={form.watch('description') ?? ""}
                                            onChange={(content) => {
                                                form.setValue("description", content);
                                            }}
                                        />
                                        {errorMessage.description && <ErrorMessage>{errorMessage.description.message}</ErrorMessage>}
                                    </div>
                                    <div className="w-auto space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Image *
                                        </label>
                                        {isImageLoading ? (
                                            <div><BeatLoader /></div>
                                        ) : (
                                            <FileUploadInput
                                                onChange={(files) => form.setValue('image', files[0].id)}
                                                initialFiles={imagePreview ? [{
                                                    id: imagePreview?.id,
                                                    url: imagePreview?.url,
                                                    originalName: imagePreview?.filename
                                                }] : []}
                                            />
                                        )}

                                        {errorMessage.image && <ErrorMessage>{errorMessage.image.message}</ErrorMessage>}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-5 border-t flex justify-center">
                                    <PrimaryButton type="submit" disabled={isLoading} className="w-full px-10 text-center">{isLoading ? <div><BeatLoader /></div> : <div>{selectedCoreFeatureCard ? "Update" : "Submit"}</div>}</PrimaryButton>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>


                <div className="mt-12 p-7">
                    <h2 className="text-2xl font-bold mb-4">Existing Feature Cards</h2>

                    {loading ? (
                        <BeatLoader />
                    ) : data && data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.map((card: any) => (
                                <div key={card.id} className="p-6 bg-white shadow-md rounded-lg">
                                    <h3 className="text-lg font-semibold">{card.title}</h3>
                                    <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(card.description) }}></p>
                                    {card.image?.url && <img src={card.image.url} alt="Feature Image" className="w-20 h-20 object-cover mt-2" />}
                                    <div className="flex space-x-4 mt-4">
                                        <SecondaryButton onClick={() => { setSelectedCoreFeatureCard(card); scrollTOForm(); }}>
                                            Edit
                                        </SecondaryButton>
                                        <SecondaryButton onClick={() => deleteCard(card.id)}>
                                            {
                                                deleteCardId === card.id ? <BeatLoader /> : "Delete"
                                            }
                                        </SecondaryButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Paragraph>No Data Found</Paragraph>
                    )}
                </div>


            </div>
        </div>
    );
};

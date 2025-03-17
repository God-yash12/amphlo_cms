import { useEffect, useRef, useState } from "react";
import InputField from "../../../ui/input/input";
import PrimaryButton from "../../../ui/buttons/primary-button";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { TextEditor } from "../../../ui/editor/text-editor";
import { ErrorMessage } from "../../../ui/typographs/error-message";
import SecondaryButton from "../../../ui/buttons/secondary-button";
import { KeyFeaturesFormService } from "../../services/form-service/home/key-features";
import { FileUploadInput } from "../../../ui/input/file-upload-input copy";
import { BeatLoader } from "react-spinners";
import DOMPurify from "dompurify";
import { FormProvider } from "react-hook-form";

export const HomeKeyFeatureCard = () => {
    const { form, onSubmit, imagePreview, selectedKeyFeatureCard, deletingCardId, isLoading, deleteCard, setSelectedKeyFeatureCard, loading, data, } = KeyFeaturesFormService()
    const errorMessage = form.formState.errors;

    const [isImageLoading, setIsImageLoading] = useState<boolean>(false)

    const formRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (selectedKeyFeatureCard) {
            setIsImageLoading(true)

            setTimeout(() => {
                setIsImageLoading(false)
            }, 500)
        }
    }, [selectedKeyFeatureCard])

    const scrollToForm = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div ref={formRef} className="container mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="max-w-2xl mx-auto text-center mb-12">
                    <Header className="text-3xl font-bold text-gray-900 mb-4">
                        {selectedKeyFeatureCard ? "Update Key Feature Card" : "Add Key Feature Card"}
                    </Header>
                    <Paragraph className="text-gray-600">
                        Customize and manage your website's  Key Feature Card section Cards
                    </Paragraph>
                </div>

                {/* Form Section */}
                <div className="mx-auto">
                    <FormProvider {...form}>
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Card Description *
                                    </label>
                                    <TextEditor
                                        placeholder="Describe your key features in detail..."
                                        value={form.watch('description') ?? ""}
                                        onChange={(content: string) => {
                                            form.setValue("description", content);
                                        }}
                                    />
                                    {errorMessage.description && <ErrorMessage>{errorMessage.description.message}</ErrorMessage>}
                                </div>
                                <div className="w-auto space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                    )
                                    }
                                    {errorMessage.image && <ErrorMessage>{errorMessage.image.message}</ErrorMessage>}

                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <PrimaryButton type="submit" disabled={isLoading} className="w-full text-center">{isLoading ? <div><BeatLoader /></div> : <div>{selectedKeyFeatureCard ? "UPDATE" : "SUBMIT"}</div>}</PrimaryButton>
                            </div>
                        </form>
                    </FormProvider>
                </div>


                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Existing Feature Cards</h2>

                    {loading ? (
                        <BeatLoader />
                    ) : data && data.length > 0 ? (
                        // Show cards if data exists
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.map((card: any) => (
                                <div key={card.id} className="p-6 bg-white shadow-md rounded-lg">
                                    <h3 className="text-lg font-semibold">{card.title}</h3>
                                    <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(card.description) }}></p>
                                    {card.image?.url && <img src={card.image.url} alt="Feature Image" className="w-20 h-20 object-cover mt-2" />}
                                    <div className="flex space-x-4 mt-4">
                                        <SecondaryButton onClick={() => { setSelectedKeyFeatureCard(card), scrollToForm() }}>
                                            Edit
                                        </SecondaryButton>
                                        <SecondaryButton onClick={() => deleteCard(card.id)}>
                                            {deletingCardId === card.id ? <BeatLoader /> : "Delete"}
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

import { useEffect, useRef, useState } from "react";
import InputField from "../../../../ui/input/input";
import PrimaryButton from "../../../../ui/buttons/primary-button";
import Header from "../../../../ui/typographs/header/header";
import Paragraph from "../../../../ui/typographs/paragraph";
import { TextEditor } from "../../../../ui/editor/text-editor";
import { FileUploadInput } from "../../../../ui/input/file-upload-input copy";
import { ErrorMessage } from "../../../../ui/typographs/error-message";
import { PartnerBenefitService } from "../../../services/about/for-partner/partner-benefit-service";
import { BeatLoader, PropagateLoader } from "react-spinners";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import DOMPurify from "dompurify";

export const PartnerBenefitSection = () => {
    const { form, onSubmit, isLoading, data, deleteItem, selectedItem, setSelectedItem, isPending, imagePreview } = PartnerBenefitService();
    const errorMessage = form.formState.errors;
    const formRef = useRef<HTMLDivElement>(null);

    const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

    useEffect(() => {
        if (selectedItem) {
            setIsImageLoading(true);

            setTimeout(() => {
                setIsImageLoading(false);
            });
        }
    }, [selectedItem]);

    const scrollTOForm = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    if (isLoading) return <PropagateLoader className="text-center" />;

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white">
            <div ref={formRef} className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
                {/* Header Section */}
                <div className="max-w-2xl mx-auto text-center mb-12 col-span-1">
                    <Header className="text-3xl font-bold text-gray-900 mb-4 text-left">
                        {selectedItem ? "Update Item" : "Partner Benefit Cards Management"}
                    </Header>
                    <Paragraph className="text-gray-600 text-left">
                        Customize and manage your website's Partners Benefit Cards Management section Cards
                    </Paragraph>
                </div>

                {/* Form Section */}
                <div className="col-span-2">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="bg-white rounded-xl shadow-lg p-8 space-y-8"
                    >
                        {/* Title Input Section */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                            <label className="block text-sm md:text-base font-semibold text-gray-700">
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
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Card Description *
                                </label>
                                <TextEditor
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
                                    <BeatLoader />
                                ) : (
                                    <FileUploadInput
                                        accept="image/*"
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
                        <div className="pt-4 border-t flex justify-center">
                            <PrimaryButton type="submit" className="w-full text-center">{isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>

            {/* Data Section */}
            <div className="max-w-4xl mx-auto p-4">
                {data?.map((item: any) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between border p-4 mb-4 rounded-lg shadow-md bg-white"
                    >
                        {/* Left Side: Image */}
                        {item.image?.url && (
                            <img
                                src={item.image.url}
                                alt={item.image.filename}
                                className="w-24 h-24 object-cover rounded-md mr-4"
                            />
                        )}
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">{item.title}</h2>
                            <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }}></p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => { setSelectedItem(item), scrollTOForm() }}
                                className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                <BsPencilSquare className="mr-1 text-2xl" /> Update
                            </button>
                            <button
                                onClick={() => deleteItem(item.id)}
                                className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                <MdDelete className="mr-1 text-2xl" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};
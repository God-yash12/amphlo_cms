

import InputField from "../../../ui/input/input";
import PrimaryButton from "../../../ui/buttons/primary-button";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { ErrorMessage } from "../../../ui/typographs/error-message";
import { UsePortalHeroService } from "../../services/portal/portal-hero-service";
import { FileUploadInput } from "../../../ui/input/file-upload-input copy";
import { BeatLoader, PropagateLoader } from "react-spinners";

// const routes = ["/about", "/countries", "/features", "/contact"] as const;

export const PortalHeroSection = () => {
    const { form, onSubmit, image, isLoading, mutation } = UsePortalHeroService();
    const errorMessage = form.formState.errors

    if (isLoading) return <PropagateLoader className="text-center" />


    return (
        <div id="hero" className="container bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
            {/* Header */}
            <div className="col-span-1 text-left flex flex-col gap-3">
                <Header className="text-left text-gray-800">Portal Hero Section</Header>
                <Paragraph className="text-left">Customize Portal Hero section, where title, subtitle and image are required.</Paragraph>
            </div>

            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 col-span-2 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
                {/* Title Input */}
                <div className="space-y-2">
                    <label className="block text-sm  text-gray-700 font-semibold">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <InputField
                        label="Title *"
                        variant="outlined"
                        size="lg"
                        placeholder="Title"
                        {...form.register("title")}
                    />
                    {errorMessage.title && <ErrorMessage>{errorMessage.title.message}</ErrorMessage>}

                </div>

                {/* subtitle Editor */}
                <div className="w-auto space-y-2">
                    <label className="block text-sm text-gray-700 font-semibold">
                        SubTitle <span className="text-red-500">*</span>
                    </label>
                    <InputField
                        label="SubTitle *"
                        variant="outlined"
                        size="lg"
                        placeholder="Subtitle"
                        {...form.register("subTitle")}
                    />
                    {errorMessage.subTitle && <ErrorMessage>{errorMessage.subTitle.message}</ErrorMessage>}
                </div>

                <div className="space-y-2" >
                    <label className="block text-sm text-gray-700 font-semibold">
                        Image <span className="text-red-500">*</span>
                    </label>

                    <FileUploadInput
                        accept="image/*"
                        onChange={(files) => {
                            form.setValue("imageId", files ? files[0].id : null);
                        }}
                        initialFiles={image ? [{
                            id: image.id,
                            url: image.url,
                            originalName: image.filename
                        }] : []}
                    />

                    {errorMessage.imageId && <ErrorMessage>{errorMessage.imageId.message}</ErrorMessage>}
                </div>


                {/* Submit Button */}
                <div className="pt-4 border-t flex justify-center">
                    <PrimaryButton type="submit" className="w-full text-center">{mutation.isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
                </div>
            </form>
        </div>
    );
};

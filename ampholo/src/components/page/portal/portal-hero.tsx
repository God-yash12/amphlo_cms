

import InputField from "../../../ui/input/input";
import PrimaryButton from "../../../ui/buttons/primary-button";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { ErrorMessage } from "../../../ui/typographs/error-message";
import { UsePortalHeroService } from "../../services/portal/portal-hero-service";
import { FileUploadInput } from "../../../ui/input/file-upload-input copy";

// const routes = ["/about", "/countries", "/features", "/contact"] as const;

export const PortalHeroSection = () => {
    const { form, onSubmit, image, isLoading } = UsePortalHeroService();
    const errorMessage = form.formState.errors

    if (isLoading) return <div className="text-center text-gray-800">Loading...</div>


    return (
        <div id="hero" className="flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col gap-3">
                <Header className="text-center text-gray-800">Portal Hero Section</Header>
                <Paragraph>Customize Portal Hero section</Paragraph>
            </div>

            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {/* Title Input */}
                <div>
                    <InputField
                        label="Title"
                        variant="outlined"
                        size="lg"
                        placeholder="Title"
                        {...form.register("title")}
                    />
                    {errorMessage.title && <ErrorMessage>{errorMessage.title.message}</ErrorMessage>}

                </div>

                {/* subtitle Editor */}
                <div className="w-auto">
                    <InputField
                        label="SubTitle"
                        variant="outlined"
                        size="lg"
                        placeholder="Subtitle"
                        {...form.register("subTitle")}
                    />
                </div>
                {errorMessage.subTitle && <ErrorMessage>{errorMessage.subTitle.message}</ErrorMessage>}
                <FileUploadInput
                    accept="image/*"
                    onChange={(files) => {
                        form.setValue("imageId", files[0].id);
                    }}
                    initialFiles={image ? [{
                        id: image.id,
                        url: image.url,
                        originalName: image.filename
                    }] : []}
                />

                {errorMessage.imageId && <ErrorMessage>{errorMessage.imageId.message}</ErrorMessage>}



                {/* Submit Button */}
                <PrimaryButton type="submit" className="w-full text-center">Update</PrimaryButton>
            </form>
        </div>
    );
};

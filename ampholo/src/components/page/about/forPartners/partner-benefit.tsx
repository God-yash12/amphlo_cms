import InputField from "../../../../ui/input/input";
import PrimaryButton from "../../../../ui/buttons/primary-button";
import Header from "../../../../ui/typographs/header/header";
import Paragraph from "../../../../ui/typographs/paragraph";
import { TextEditor } from "../../../../ui/editor/text-editor";
import { FileUploadInput } from "../../../../ui/input/file-upload-input copy";
import { ErrorMessage } from "../../../../ui/typographs/error-message";
import { PartnerBenefitService } from "../../../services/about/for-partner/partner-benefit-service";


export const PartnerBenefitSection = () => {
  const { form, onSubmit } = PartnerBenefitService()
  const errorMessage = form.formState.errors

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Header className="text-3xl font-bold text-gray-900 mb-4">
            Partner Benefit Cards Management
          </Header>
          <Paragraph className="text-gray-600">
            Customize and manage your website's Partners Benefit Cards Management section Cards
          </Paragraph>
        </div>

        {/* Form Section */}
        <div className="mx-auto">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white rounded-xl shadow-lg p-8 space-y-8"
          >
            {/* Title Input Section */}
            <div className="space-y-4">
              <div className="relative">
                <InputField
                  label="Showcase Your Feature's Card Headline"
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
                  Card Description
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
              <FileUploadInput
                accept="image/*"
                onChange={(files) => form.setValue('image', files[0].id)}
              />
              {errorMessage.image && <ErrorMessage>{errorMessage.image.message}</ErrorMessage>}
              
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <PrimaryButton
                type="submit"
                className="w-full py-3 transition-all duration-200 hover:transform hover:scale-[1.02]"
              >
                Save Changes
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};



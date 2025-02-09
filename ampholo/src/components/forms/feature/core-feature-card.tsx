import InputField from "../../../ui/input/input";
import PrimaryButton from "../../../ui/buttons/primary-button";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { TextEditor } from "../../../ui/editor/text-editor";
import { useState } from "react";
import FileUploadInputField from "../../../ui/input/file-upload-input";
import { CoreFeaturesFormService } from "../../services/form-service/features/core-feature-card";
import { ErrorMessage } from "../../../ui/typographs/error-message";

export const CorefeatureCards = () => {
  const { register, handleSubmit, setValue, errors, } = CoreFeaturesFormService();
  const [editorContent, setEditorContent] = useState("");


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Header className="text-3xl font-bold text-gray-900 mb-4">
            Core Features Cards Management
          </Header>
          <Paragraph className="text-gray-600">
            Customize and manage your website's Core features section Cards to highlight your main offerings
          </Paragraph>
        </div>

        {/* Form Section */}
        <div className="mx-auto">
          <form
            onSubmit={handleSubmit}
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
                  {...register("title")}
                />
                {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
              </div>

              {/* Description Editor Section */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Description
                </label>
                <TextEditor
                  placeholder="Describe your key features in detail..."
                  value={editorContent}
                  onChange={(content) => {
                    setEditorContent(content);
                    setValue("description", content);
                  }}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

              </div>
              <FileUploadInputField 
              onUploadSuccess={(fileId) => setValue('image', fileId)}
              />
                {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
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

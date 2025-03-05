import InputField from "../../../ui/input/input";
import PrimaryButton from "../../../ui/buttons/primary-button";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { TextEditor } from "../../../ui/editor/text-editor";
import { ErrorMessage } from "../../../ui/typographs/error-message";
import { UseCoreFeatureService } from "../../services/feature/core-feature-service";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BeatLoader } from "react-spinners";

export const CoreFeature = () => {
  const { form, onSubmit, isLoading, mutation } = UseCoreFeatureService();

  if (isLoading) return <PropagateLoader className="text-center" />

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Header className="text-3xl font-bold text-gray-900 mb-4">
            Core Features Management
          </Header>
          <Paragraph className="text-gray-600">
            Customize and manage your website's Core Features section to highlight your main offerings
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
                  label="Showcase Your Feature's Headline"
                  placeholder="Enter a compelling title for your features section"
                  className="w-full transition-all duration-200"
                  size="lg"
                  {...form.register("title")}
                />
                {form.formState.errors.title && <ErrorMessage>{form.formState.errors.title.message}</ErrorMessage>}
              </div>
              <div className="relative">
                <InputField
                  label="Showcase Your Feature's Headline"
                  placeholder="Enter a compelling main title for your features section"
                  className="w-full transition-all duration-200"
                  size="lg"
                  {...form.register("mainTitle")}
                />
                {form.formState.errors.mainTitle && <ErrorMessage>{form.formState.errors.mainTitle.message}</ErrorMessage>}
              </div>

              {/* Description Editor Section */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feature Description
                </label>
                <TextEditor
                  placeholder="Describe your key features in detail..."
                  value={form.watch("description")}
                  onChange={(content) => {
                    form.setValue("description", content);
                  }}
                />
                {form.formState.errors.description && <ErrorMessage>{form.formState.errors.description.message}</ErrorMessage>}

              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">

              <PrimaryButton type="submit" className="w-full text-center">{mutation.isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


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
    <div>
      <div className="container bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
        {/* Header Section */}
        <div className="col-span-1 max-w-2xl mx-auto text-left mb-12">
          <Header className="text-3xl font-bold text-gray-900 mb-4">
            Core Features Management
          </Header>
          <Paragraph className="text-gray-600 text-left">
            Customize and manage your website's Features page core feature section to highlight your main offerings.
          </Paragraph>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 col-span-2">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=""
          >
            {/* Title Input Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm md:text-base text-gray-700 font-semibold">
                  Title <span className="text-red-500">*</span>
                </label>
                <InputField
                  label="Headline *"
                  placeholder="Enter a compelling title for your features section"
                  className="w-full transition-all duration-200"
                  size="lg"
                  {...form.register("title")}
                />
                {form.formState.errors.title && <ErrorMessage>{form.formState.errors.title.message}</ErrorMessage>}
              </div>
              <div className="space-y-2">
                <label className="block text-sm md:text-base text-gray-700 font-semibold">
                Subtitle <span className="text-red-500">*</span>
                </label>
                <InputField
                  label="Showcase Your Feature's Subtitle *"
                  placeholder="Enter a compelling main title for your features section"
                  className="w-full transition-all duration-200"
                  size="lg"
                  {...form.register("mainTitle")}
                />
                {form.formState.errors.mainTitle && <ErrorMessage>{form.formState.errors.mainTitle.message}</ErrorMessage>}
              </div>

              {/* Description Editor Section */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Feature Description *
                </label>
                <TextEditor
                  value={form.watch("description")}
                  onChange={(content) => {
                    form.setValue("description", content);
                  }}
                />
                {form.formState.errors.description && <ErrorMessage>{form.formState.errors.description.message}</ErrorMessage>}

              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t flex justify-center">
              <PrimaryButton type="submit" className="w-full text-center">{mutation.isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


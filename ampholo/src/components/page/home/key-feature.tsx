import InputField from "../../../ui/input/input";
import PrimaryButton from "../../../ui/buttons/primary-button";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { UseKeyFeatureService } from "../../services/home/key-features-service";
import { TextEditor } from "../../../ui/editor/text-editor";
import { ErrorMessage } from "../../../ui/typographs/error-message";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BeatLoader } from "react-spinners";

const KeyFeatures = () => {
  const { form, onSubmit, isLoading, isPending } = UseKeyFeatureService();

  if (isLoading) return <PropagateLoader className="text-center" />

  return (
    <div className="flex flex-col gap-10 bg-gradient-to-b from-gray-50 to-white">
      <div className="">
        {/* Header Section */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Header className="text-3xl font-bold text-gray-900 mb-4">
            Key Features Management
          </Header>
          <Paragraph className="text-gray-600">
            Customize and manage your website's key features section to highlight your main offerings
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
                  label="Showcase Your Feature's Headline *"
                  placeholder="Enter a compelling title for your features section"
                  className="w-full transition-all duration-200"
                  size="lg"
                  {...form.register("title")}
                />
                {form.formState.errors.title && <ErrorMessage>{form.formState.errors.title.message}</ErrorMessage>}
              </div>

              {/* Description Editor Section */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
            <div className="pt-6">
            <PrimaryButton type="submit" className="w-full text-center">{isPending ? <div><BeatLoader /></div> : <div>Save Changes</div> }</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KeyFeatures;
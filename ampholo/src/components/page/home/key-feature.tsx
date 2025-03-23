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

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <PropagateLoader color="#6366F1" />
    </div>
  );

  return (
    <div id="key-features" className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
      {/* Header Section */}
      <div className="col-span-1 flex flex-col justify-between">
        <div>
          <Header className="text-gray-800 font-bold text-xl md:text-2xl sm:text-left mb-4">
            Key Features Management
          </Header>
          <Paragraph className="text-gray-500 text-sm md:text-base text-left">
            Customize and manage your website's key features section to highlight your main offerings, title, and description.
          </Paragraph>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6 col-span-2 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
        {/* Title Input */}
        <div className="space-y-2">
          <label className="block text-sm md:text-base font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <InputField
            label=""
            variant="outlined"
            size="lg"
            placeholder="Enter a compelling title for your features section"
            className="w-full"
            {...form.register("title", { required: "Title is required" })}
          />
          {form.formState.errors.title && <ErrorMessage className="text-red-500 text-xs md:text-sm">{form.formState.errors.title.message}</ErrorMessage>}
        </div>

        {/* Description Editor */}
        <div className="space-y-2">
          <label className="block text-sm md:text-base font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <div className="border rounded-md">
            <TextEditor
              value={form.watch("description") ?? ""}
              onChange={(content) => {
                form.setValue("description", content);
              }}
            />
          </div>
          {form.formState.errors.description && <ErrorMessage className="text-red-500 text-xs md:text-sm">{form.formState.errors.description.message}</ErrorMessage>}
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t flex justify-center">
          <PrimaryButton
            type="submit"
            disabled={isPending}
            className="px-4 md:px-6 py-3"
          >
            {isPending ? <BeatLoader size={8} color="#ffffff" /> : "Save Changes"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default KeyFeatures;
import InputField from "../../../ui/input/input";
import { TextEditor } from "../../../ui/editor/text-editor";
import PrimaryButton from "../../../ui/buttons/primary-button";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { FileUploadInput } from "../../../ui/input/file-upload-input copy";
import SecondaryButton from "../../../ui/buttons/secondary-button";
import { TransformService } from "../../services/home/transform-service";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BeatLoader } from "react-spinners";
import { MdDelete } from "react-icons/md";
import { ErrorMessage } from "../../../ui/typographs/error-message";

const routes = ["/about", "/countries", "/features", "/contact-us"] as const;

export const Transform = () => {
  const { form, onSubmit, image, fields, append, remove, isLoading, isPending } = TransformService();
  const errorMessage = form.formState.errors;

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <PropagateLoader color="#6366F1" />
    </div>
  );

  return (
    <div id="transform" className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
      {/* Header */}
      <div className="col-span-1 flex flex-col justify-between">
        <div>
          <Header className="text-gray-800 font-bold text-xl md:text-2xl sm:text-left mb-4">
            Home Transform Section
          </Header>
          <Paragraph className="text-gray-500 text-sm md:text-base text-left">
            Customize the Transform section, Add title, description, image, and buttons.
          </Paragraph>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6 col-span-2 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 ">
        {/* Title Input */}
        <div className="space-y-2">
          <label className="block text-sm md:text-base font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <InputField
            label=""
            variant="outlined"
            size="lg"
            placeholder="Enter your heading"
            className="w-full"
            {...form.register("title", { required: "Title is required" })}
          />
          {errorMessage.title && <ErrorMessage className="text-red-500 text-xs md:text-sm">{errorMessage.title.message}</ErrorMessage>}
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
          {errorMessage.description && <ErrorMessage className="text-red-500 text-xs md:text-sm">{errorMessage.description.message}</ErrorMessage>}
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm md:text-base font-medium text-gray-700">
            Image <span className="text-red-500">*</span>
          </label>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 md:p-4">
            <FileUploadInput
              accept="image/*"
              onChange={(files) => form.setValue("imageId", files[0].id)}
              initialFiles={image ? [{
                id: image.id,
                url: image?.url,
                originalName: image.filename
              }] : []}
            />
          </div>
          {errorMessage.imageId && <ErrorMessage className="text-red-500 text-xs md:text-sm">{errorMessage.imageId.message}</ErrorMessage>}
        </div>

        {/* Button Configuration */}
        <div className="space-y-3 md:space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="bg-gray-50 border border-gray-200 rounded-md p-3 md:p-4">
              <div className="flex justify-between items-center mb-2 md:mb-3">
                <h4 className="text-sm font-medium text-gray-700">Button {index + 1}</h4>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <MdDelete className="text-2xl" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
                <div className="col-span-2">
                  <InputField
                    label="Button Name"
                    variant="outlined"
                    size="md"
                    placeholder="Button Text"
                    className="w-full"
                    {...form.register(`buttons.${index}.name`)}
                  />
                </div>

                <div>
                  <select
                    value={form.watch(`buttons.${index}.route`)}
                    onChange={(e) => form.setValue(`buttons.${index}.route`, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="">Select page</option>
                    {routes.map((route) => (
                      <option key={route} value={route}>
                        {route}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}

          {/* Add Button */}
          {fields.length < 2 && (
            <div className="flex justify-center mt-3">
              <SecondaryButton
                onClick={() => append({ name: "", route: "" })}
                className="flex items-center gap-1 px-2 py-1 text-xs md:text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
                Add Button
              </SecondaryButton>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t flex justify-center">
          <PrimaryButton
            type="submit"
            disabled={isPending}
            className="px-4 md:px-6 py-2"
          >
            {isPending ? <BeatLoader size={8} color="#ffffff" /> : "Save Changes"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};
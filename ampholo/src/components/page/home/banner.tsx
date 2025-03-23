import InputField from "../../../ui/input/input";
import { TextEditor } from "../../../ui/editor/text-editor";
import PrimaryButton from "../../../ui/buttons/primary-button";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import SecondaryButton from "../../../ui/buttons/secondary-button";
import { BannerService } from "../../services/home/banner-service";
import { FileUploadInput } from "../../../ui/input/file-upload-input copy";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BeatLoader } from "react-spinners";
import { ErrorMessage } from "../../../ui/typographs/error-message";
import { FormProvider } from "react-hook-form";

const routes = ["/about", "/countries", "/features", "/contact-us"] as const;


export const Banner = () => {
  const { form, onSubmit, image, isLoading, fields, append, remove, isPending } = BannerService();
  const errorMessage = form.formState.errors;

  if (isLoading) return <PropagateLoader className="text-center" />;

  return (
    <div id="banner" className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border border-gray-300 grid lg:grid-cols-3 gap-6">

      {/* Header Section (1/3) */}
      <div className="col-span-1 flex flex-col justify-between">
        <div>
          <Header className="text-gray-800 font-bold text-xl md:text-2xl">Home Banner Section</Header>
          <Paragraph className="text-gray-500 text-sm text-left md:text-base mt-2">
            Customize banner section to highlight key features and improve user engagement.
            Upload an image, add a title, description, and configure buttons for better navigation.
          </Paragraph>
        </div>
      </div>

      {/* Form Section (2/3) */}
      <div className="col-span-2">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 ">

            {/* Title Input */}
            <div className="space-y-2">
              <label className="block text-sm md:text-base font-semibold text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <InputField
                placeholder="Enter banner title"
                className="w-full"
                {...form.register("title", { required: "Title is required" })}
              />
              {errorMessage.title && <ErrorMessage>{errorMessage.title.message}</ErrorMessage>}
            </div>

            {/* Description Editor */}
            <div className="space-y-2">
              <label className="block text-sm md:text-base font-semibold text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <div className="border rounded-md">
                <TextEditor
                  value={form.watch("description") ?? ""}
                  onChange={(content) => form.setValue("description", content)}
                />
              </div>
              {errorMessage.description && <ErrorMessage>{errorMessage.description.message}</ErrorMessage>}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm md:text-base font-semibold text-gray-700">
                Banner Image <span className="text-red-500">*</span>
              </label>
              <FileUploadInput
                onChange={(files) => form.setValue("imageId", files[0].id)}
                initialFiles={image ? [{ id: image.id, url: image.url, originalName: image.filename }] : []}
              />
              {errorMessage.imageId && <ErrorMessage>{errorMessage.imageId.message}</ErrorMessage>}
            </div>

            {/* Button Configuration */}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-3 md:mb-4">
                <h3 className=" text-gray-800 text-sm md:text-base font-semibold">Call-to-Action Buttons</h3>
                {fields.length < 2 && (
                  <SecondaryButton
                    onClick={() => append({ name: "", route: '' })}
                    className="flex items-center gap-1 px-2 py-1 text-xs md:text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                    Add Button
                  </SecondaryButton>
                )}
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
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
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t flex justify-center">
              <PrimaryButton className="px-4 md:px-6 py-3" type="submit" disabled={isPending}>
                {isPending ? <BeatLoader size={8} color="#ffffff" /> : "Save Changes"}
              </PrimaryButton>
            </div>

          </form>
        </FormProvider>
      </div>
    </div>
  );
};


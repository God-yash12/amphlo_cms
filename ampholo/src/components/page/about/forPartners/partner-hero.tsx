import InputField from "../../../../ui/input/input";
import { TextEditor } from "../../../../ui/editor/text-editor";
import PrimaryButton from "../../../../ui/buttons/primary-button";
import Header from "../../../../ui/typographs/header/header";
import Paragraph from "../../../../ui/typographs/paragraph";
import SecondaryButton from "../../../../ui/buttons/secondary-button";
import { PartnerHeroService } from "../../../services/about/for-partner/partner-hero-service";
import { ErrorMessage } from "../../../../ui/typographs/error-message";
import { FileUploadInput } from "../../../../ui/input/file-upload-input copy";
import { BeatLoader, PropagateLoader } from "react-spinners";

const routes = ["/about", "/countries", "/features", "/contact-us"] as const;

export const PartnersHeroSection = () => {
  const { form, onSubmit, fields, append, remove, image, isLoading, isPending } = PartnerHeroService();
  const errorMessage = form.formState.errors;


  if (isLoading) return <PropagateLoader className="text-center" />


  return (
    <div id="hero" className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
        {/* Header Section */}
        <div className="text-center mb-5 col-span-1">
          <Header className="text-gray-800 text-left">Partner Hero Section</Header>
          <Paragraph className="text-gray-600 text-left">Customize the Hero section below.</Paragraph>
        </div>

        {/* Form Section */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 col-span-2  bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 ">
          {/* Title Input */}
          <div className="space-y-3">
            <label className="block text-sm md:text-base font-semibold text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>

            <InputField
              label="Title *"
              variant="outlined"
              size="lg"
              placeholder="Enter Hero Title"
              {...form.register("title", { required: "Title is required" })}
            />
            {errorMessage && <ErrorMessage>{errorMessage.title?.message}</ErrorMessage>}
          </div>


          {/* Description Editor */}
          <div className="w-auto space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <TextEditor
              value={form.watch("description") ?? ""}
              onChange={(content) => {
                form.setValue("description", content);
              }}
            />
            {errorMessage && <ErrorMessage>{errorMessage.description?.message}</ErrorMessage>}
          </div>

          {/* File Upload */}
          <div className="w-auto space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image *
            </label>
            <FileUploadInput
              accept="image/*"
              onChange={(files) => form.setValue('image', files[0].id)}
              initialFiles={image ? [{
                id: image?.id,
                url: image?.url,
                originalName: image?.filename
              }] : []}
            />
            {errorMessage.image && <ErrorMessage>{errorMessage.image.message}</ErrorMessage>}
          </div>

          {/* Button Configuration Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 text-sm md:text-base">Call-to-Action Buttons</h3>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-center">
                <InputField
                  label={`Button Name ${index + 1}`}
                  variant="outlined"
                  size="lg"
                  placeholder="Enter button name"
                  className="flex-1"
                  {...form.register(`buttons.${index}.name`)}
                />
                {errorMessage.buttons?.[index]?.name && <ErrorMessage>{errorMessage.buttons[index].name?.message}</ErrorMessage>}
                <select
                  value={form.watch(`buttons.${index}.route`) || ""}
                  onChange={(e) => form.setValue(`buttons.${index}.route`, e.target.value)}
                  className="p-2 border rounded-md flex-1"
                >
                  <option value="">Select a route</option>
                  {routes.map((route) => (
                    <option key={route} value={route}>{route}</option>
                  ))}
                </select>
                {errorMessage.buttons?.[index]?.route && <ErrorMessage>{errorMessage.buttons[index].route.message}</ErrorMessage>}

                {fields.length > 1 && (
                  <SecondaryButton onClick={() => remove(index)} className="text-sm">Delete</SecondaryButton>
                )}
              </div>
            ))}

            {/* Add Button */}
            {fields.length < 2 && (
              <SecondaryButton onClick={() => append({ name: '', route: '' })} className="text-sm">
                + Add Button
              </SecondaryButton>
            )}
          </div>

          {/* Submit Button */}

          <div className="pt-4 border-t flex justify-center">
            <PrimaryButton type="submit" className="w-full text-center">{isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

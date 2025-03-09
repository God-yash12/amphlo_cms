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
import { ErrorMessage } from "../../../ui/typographs/error-message";

const routes = ["/about", "/countries", "/features", "/contact-us"] as const;

export const Transform = () => {
  const { form, onSubmit, image, fields, append, remove, isLoading, isPending } = TransformService();
  const errorMessage = form.formState.errors;
  if (isLoading) return <PropagateLoader className="text-center" />

  return (
    <div id="hero" className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <Header className="text-center text-gray-800">Home Transform Section</Header>
        <Paragraph>Customize Transform section</Paragraph>
      </div>

      {/* Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Title Input */}
        <div>
          <InputField
            label="Title *"
            variant="outlined"
            size="lg"
            placeholder="Title"
            {...form.register("title", { required: "Title is required" })}
          />
           {errorMessage.title && <ErrorMessage className="text-red-500">{errorMessage.title.message}</ErrorMessage>}
        </div>

        {/* Description Editor */}
        <div className="space-y-2 w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Feature Description *
          </label>
          <TextEditor
            value={form.watch("description")}
            onChange={(content) => form.setValue("description", content)}
          />
           {errorMessage.description && <ErrorMessage className="text-red-500">{errorMessage.description.message}</ErrorMessage>}
        </div>
        <div className="space-y-2 w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image *
          </label>
        <FileUploadInput
          onChange={(files) => form.setValue("imageId", files[0].id)}
          initialFiles={image ? [{
            id: image.id,
            url: image.url,
            originalName: image.filename
          }] : []}
        />
         {errorMessage.imageId && <ErrorMessage className="text-red-500">{errorMessage.imageId.message}</ErrorMessage>}
        </div>



        {/* Button Configuration */}
        <div className="flex flex-col gap-4 ">
          {fields.map((field, index) => (
            <section key={field.id} className="space-x-5">
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Button {index + 1}
                </label>
                <div className="flex gap-2">
                  <InputField
                    label="Button Name"
                    variant="outlined"
                    size="lg"
                    placeholder="Enter button name"
                    className="flex-1 w-full"
                    {...form.register(`buttons.${index}.name`)}
                  />
                  <select
                    value={form.watch(`buttons.${index}.route`)}
                    onChange={(e) => form.setValue(`buttons.${index}.route`, e.target.value)}
                    className=" p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select a route</option>
                    {routes.map((route) => (
                      <option key={route} value={route}>
                        {route}
                      </option>
                    ))}
                  </select>
                  {
                    fields.length > 1 && (
                      <SecondaryButton onClick={() => remove(index)}>Delete</SecondaryButton>
                    )
                  }
                </div>
              </div>
            </section>
          ))}
        </div>

        {
          fields.length < 2 && (
            <SecondaryButton onClick={() => append({ name: '', route: '' })}>Add Button</SecondaryButton>
          )
        }
        {/* Submit Button */}
        <PrimaryButton type="submit" className="w-full text-center">{isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
      </form>
    </div>
  );
};

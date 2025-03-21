import InputField from "../../../ui/input/input";
import SecondaryButton from "../../../ui/buttons/secondary-button";
import { MdDelete } from "react-icons/md";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { TextEditor } from "../../../ui/editor/text-editor";
import PrimaryButton from "../../../ui/buttons/primary-button";
import { ErrorMessage } from "../../../ui/typographs/error-message";
import { UsePortalFeatureServices } from "../../services/portal/portal-feature-service";
import { FileUploadInput } from "../../../ui/input/file-upload-input copy";
import { BeatLoader, PropagateLoader } from "react-spinners";

export const PortalFeature = () => {
  const { form, onSubmit, append, remove, fields, image, isLoading, isPending } = UsePortalFeatureServices();
  const errorMessage = form.formState.errors;
  if (isLoading) return <PropagateLoader className="text-center" />


  return (
    <div className="container bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
      {/* Header */}
      <div className="col-span-1 flex flex-col gap-3 mb-6">
        <Header className="text-left text-gray-800 text-2xl font-bold">
          Portal Fearure Section
        </Header>
        <Paragraph className="text-left text-gray-600">
          Customize Portal Feature section, where Main title, subtitle, description and image, also Feature title and lists are required.
        </Paragraph>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 col-span-2 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
        <div className="space-y-2" >
          <label className="block text-sm  text-gray-700 font-semibold">
            SubTitle  <span className="text-red-500">*</span>
          </label>
          {/* Title and Main Title */}
          <InputField
            label="Portal Feature SubTitle *"
            placeholder="Enter Portal Feature Title"
            className="w-full"
            {...form.register("title")}
          />
          {errorMessage.title && <ErrorMessage>{errorMessage.title.message}</ErrorMessage>}
        </div>
        <div className="space-y-2">
          <label className="block text-sm  text-gray-700 font-semibold">
            Main Title <span className="text-red-500">*</span>
          </label>
          {/* Main Title */}
          <InputField
            label="Portal Feature Main Title *"
            placeholder="Enter Portal Feature Main Title"
            className="w-full"
            {...form.register("mainTitle")}
          />
          {errorMessage.mainTitle && <ErrorMessage>{errorMessage.mainTitle.message}</ErrorMessage>}
        </div>

        {/* Description */}
        <div className="w-auto space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Feature Description *
          </label>
          <TextEditor
            value={form.watch("description") ?? ""}
            onChange={(content) => {
              form.setValue("description", content);
            }}
          />
          {errorMessage.description && <ErrorMessage>{errorMessage.description.message}</ErrorMessage>}
        </div>

        {/* File Upload */}
        <div className="w-auto space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Feature Image *
          </label>
          <FileUploadInput
            onChange={(files) => form.setValue("imageId", files ? files[0].id : null)}
            initialFiles={image ? [{
              id: image.id,
              url: image.url,
              originalName: image.filename
            }] : []}
          />
        </div>
        {/* List Title and List Items */}
        <h3 className="font-semibold text-gray-800 text-sm md:text-base mt-9">Add Feature Title and Lists </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
          <InputField
            label="Title of List"
            placeholder="Enter list title"
            {...form.register("listTitle")}
          />
          {errorMessage.listTitle && <ErrorMessage>{errorMessage.listTitle.message}</ErrorMessage>}

          <SecondaryButton
            onClick={(e) => {
              e.preventDefault();
              append({ list: "" });
            }}
            className="w-full md:w-auto"
          >
            + Add List
          </SecondaryButton>
        </div>

        {fields.map((input, index) => (
          <div key={input.id} className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            <InputField
              label={`List ${index + 1}`}
              placeholder="Enter list item"
              {...form.register(`listItem.${index}.list`)}
            />
            <MdDelete
              onClick={() => remove(index)}
              className="cursor-pointer text-3xl text-gray-800 hover:text-red-700"
            />
          </div>
        ))}

        <div className="pt-4 border-t flex justify-center">
          <PrimaryButton type="submit" className="w-full text-center">{isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
        </div>
      </form>
    </div>
  );
};


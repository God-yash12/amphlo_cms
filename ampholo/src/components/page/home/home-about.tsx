import InputField from "../../../ui/input/input";
import SecondaryButton from "../../../ui/buttons/secondary-button";
import { MdDelete } from "react-icons/md";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { TextEditor } from "../../../ui/editor/text-editor";
import PrimaryButton from "../../../ui/buttons/primary-button";
import { UseHomeAboutServices } from "../../services/home/home-about-service";
import { ErrorMessage } from "../../../ui/typographs/error-message";
import { FileUploadInput } from "../../../ui/input/file-upload-input copy";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BeatLoader } from "react-spinners";

const HomeAbout = () => {
  const { form, onSubmit, fields, append, remove, image, isLoading, isPending } = UseHomeAboutServices();

  if (isLoading) return <PropagateLoader className="text-center" />

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col gap-3 mb-6">
        <Header className="text-center text-gray-800 text-2xl font-bold">
          Home About Section
        </Header>
        <Paragraph className="text-center text-gray-600">
          Customize the About section of your website.
        </Paragraph>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title and Main Title */}
          <InputField
            label="About Amphlo"
            placeholder="Enter about Amphlo"
            {...form.register("title")}
          />
          {form.formState.errors.title && <ErrorMessage>{form.formState.errors.title.message}</ErrorMessage>}

          <InputField
            label="Main Title"
            placeholder="Enter main title"
            {...form.register("mainTitle")}
          />
          {form.formState.errors.mainTitle && <ErrorMessage>{form.formState.errors.mainTitle.message}</ErrorMessage>}
        </div>

        {/* Description */}
        <div className="w-full">
          <TextEditor
            value={form.watch("description") ?? ""}
            onChange={(content: string) => {
              form.setValue("description", content);
            }}
            placeholder="Write about AMPHLO"
          />
          {form.formState.errors.description && <ErrorMessage>{form.formState.errors.description.message}</ErrorMessage>}
        </div>

        {/* File Upload */}
        <FileUploadInput
          onChange={(files) => form.setValue("image", files[0].id)}
          initialFiles={image ? [{
            id: image.id,
            url: image.url,
            originalName: image.filename
          }] : []}
        />

        {/* List Title and List Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Title of List"
            placeholder="Enter list title"
            {...form.register("listTitle")}
          />
          {form.formState.errors.listTitle && <ErrorMessage>{form.formState.errors.listTitle.message}</ErrorMessage>}

          <SecondaryButton
            onClick={(e) => {
              e.preventDefault();
              append({ list: "" });
            }}
            className="w-full md:w-auto"
          >
            Add List
          </SecondaryButton>
        </div>

        {fields.map((input, index) => (
          <div key={input.id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label={`List ${index + 1}`}
              placeholder="Enter list item"
              {...form.register(`listItem.${index}.list`)}
            />
            <MdDelete
              onClick={() => remove(index)}
              className="cursor-pointer text-2xl text-red-500 hover:text-red-700"
            />
          </div>
        ))}

<PrimaryButton type="submit" className="w-full text-center">{isPending ? <div><BeatLoader /></div> : <div>Save Changes</div> }</PrimaryButton>
      </form>
    </div>
  );
};

export default HomeAbout;

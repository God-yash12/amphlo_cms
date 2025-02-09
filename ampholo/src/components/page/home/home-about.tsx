import InputField from "../../../ui/input/input";
import SecondaryButton from "../../../ui/buttons/secondary-button";
import { MdDelete } from "react-icons/md";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { TextEditor } from "../../../ui/editor/text-editor";
import FileUploadInputField from "../../../ui/input/file-upload-input";
import PrimaryButton from "../../../ui/buttons/primary-button";
import { UseHomrAboutServices } from "../../services/home/home-about-service";
import { ErrorMessage } from "../../../ui/typographs/error-message";
import { useFieldArray } from "react-hook-form";

const HomeAbout = () => {
  const { form, onSubmit } = UseHomrAboutServices();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "listItem",
  });

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
        <FileUploadInputField onUploadSuccess={(fileId) => form.setValue("image", fileId)} />

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
          <div key={input.id} className="flex flex-col md:flex-row gap-4 items-center">
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

        <PrimaryButton type="submit" className="w-full">
          Submit
        </PrimaryButton>
      </form>
    </div>
  );
};

export default HomeAbout;

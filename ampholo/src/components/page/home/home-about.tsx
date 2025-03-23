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
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
      {/* Header */}
      <div className="col-span-1 flex flex-col gap-3 mb-6">
        <Header className="text-left text-gray-800 text-2xl font-bold">
          Home About Section
        </Header>
        <Paragraph className=" text-gray-600 text-left">
          Customize the About section of your website. Add short why amphlo, main title, description, image and lists.
        </Paragraph>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 col-span-2 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title and Main Title */}
          <div className="space-y-2">
            <label className="block text-sm md:text-base font-semibold text-gray-700">
              About Amphlo  <span className="text-red-500">*</span>
            </label>

            <InputField
              label="About Amphlo *"
              placeholder="Enter about Amphlo"
              {...form.register("title")}
            />
            {form.formState.errors.title && <ErrorMessage>{form.formState.errors.title.message}</ErrorMessage>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm md:text-base font-semibold text-gray-700">
              Main title   <span className="text-red-500">*</span>
            </label>

            <InputField
              label="Main Title *"
              placeholder="Enter main title"
              {...form.register("mainTitle")}
            />
            {form.formState.errors.mainTitle && <ErrorMessage>{form.formState.errors.mainTitle.message}</ErrorMessage>}
          </div>
        </div>

        {/* Description */}
        <div className="w-auto space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Feature Description *
          </label>
          <TextEditor
            value={form.watch("description")}
            onChange={(content) => form.setValue("description", content)}
          />
          {form.formState.errors.description && <ErrorMessage>{form.formState.errors.description.message}</ErrorMessage>}
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Feature Image *
          </label>

          <FileUploadInput
            onChange={(files) => form.setValue("image", files[0].id)}
            initialFiles={image ? [{
              id: image.id,
              url: image.url,
              originalName: image.filename
            }] : []}
          />
          {form.formState.errors.image && <ErrorMessage>{form.formState.errors.image.message}</ErrorMessage>}
        </div>

        {/* List Title and List Items */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Lists Title and Taglines *
          </label>
        </div>
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

        <div className="pt-4 border-t flex justify-center sm:w-full ">
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

export default HomeAbout;

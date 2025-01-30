import InputField from "../../../ui/input/input";
import SecondaryButton from "../../../ui/buttons/secondary-button";
import { MdDelete } from "react-icons/md";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { TextEditor } from "../../../ui/editor/text-editor";
import FileUploadInputField from "../../../ui/input/file-upload-input";
import PrimaryButton from "../../../ui/buttons/primary-button";
import { UseHomrAboutServices } from "../../services/home-service/home-about-service";
import { ErrorMessage } from "../../../ui/typographs/error-message";

const HomeAbout = () => {
  const {
    register,
    onSubmit,
    handleSubmit,
    setValue,
    errors,
    deleteListInputs,
    deleteListInput,
    showInputOnClick,
    setEditorContent,
    editorContent,
    showInput,
    handleInputChange,
  } = UseHomrAboutServices();

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* About Amphlo and Main Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="About Amphlo"
            placeholder="Enter about Amphlo"
            {...register("title")}
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
          <InputField
            label="Main Title"
            placeholder="Enter main title"
            {...register("mainTitle")}
          />
          {errors.mainTitle && <ErrorMessage>{errors.mainTitle.message}</ErrorMessage>}
        </div>

        {/* Text Editor */}
        <div className="w-full">
          <TextEditor
            value={editorContent}
            onChange={(content: string) => {
              setEditorContent(content);
              setValue("description", content);
            }}
            placeholder="Write about AMPHLO"
          />
        </div>

        <FileUploadInputField
          onUploadSuccess={(fileId) => setValue("image", fileId)}
        />

        {/* Title of List and Add Lists Button */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <InputField
            label="Title of List"
            placeholder="Enter list title"
            className="flex-1"
            {...register("listTitle")}
          />
          {errors.listTitle && <ErrorMessage>{errors.listTitle.message}</ErrorMessage>}

          <SecondaryButton onClick={showInputOnClick} className="w-full md:w-auto">
            Add Lists
          </SecondaryButton>
        </div>

        {showInput.map((input, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-4 items-center">
            <InputField
              label={`List ${index + 1}`}
              value={input}
              placeholder="Enter list item"
              className="flex-1"
              {...register('listItems')}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <MdDelete
              onClick={() => deleteListInput(index)}
              className="cursor-pointer text-2xl text-red-500 hover:text-red-700"
            />
          </div>
        ))}

        {/* Button to delete all input fields */}
        {showInput.length > 0 && (
          <div>
            <SecondaryButton onClick={deleteListInputs} className="mt-4 hover:bg-red-200">
              Delete All Lists
            </SecondaryButton>
          </div>
        )}

        <PrimaryButton type="submit" className="w-full"
        >
          Submit
        </PrimaryButton>
      </form>
    </div>
  );
};

export default HomeAbout;

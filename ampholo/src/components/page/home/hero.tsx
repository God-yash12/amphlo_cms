/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import InputField from "../../../ui/input/input";
import FileUploadInput from "../../../ui/buttons/file-upload";
import { TextEditor } from "../../../ui/editor/text-editor";
import PrimaryButton from "../../../ui/buttons/primary-button";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { HeroService } from "../../services/home-service/hero-service";
import { updateEditorContent } from "../../helpers/text-editor-helper";
import { handleFileUpload } from "../../helpers/file-upload-helper";

type Button = { name: string; route: string };

const Hero = () => {
  const { register, handleSubmit, setValue, reset, onSubmit } = HeroService();
  const [editorContent, setEditorContent] = useState("");

  const [buttons, setButtons] = useState<Button[]>([
    { name: "", route: "" },
    { name: "", route: "" },
  ]);

  const routes = ["/about", "/countries", "/features", "/contact"];

  // Update button name or route
  const handleButtonChange = (index: number, field: "name" | "route", value: string) => {
    const updatedButtons = [...buttons];
    updatedButtons[index][field] = value;
    setButtons(updatedButtons);
  };

  // Handle editor content changes
  const handleEditorChange = (content: string) => {
    updateEditorContent(content, setEditorContent, setValue )
  };

  // Custom submit handler to ensure all data is included
  const handleFormSubmit = async (data: any) => {
    const formData = {
      ...data,
      description: editorContent,
      buttons: buttons
    };
    await onSubmit(formData);

    // Reset the form after submission
    resetForm();
  };

  // Function to reset the form
  const resetForm = () => {
    // Reset react-hook-form state
    reset({
      title: "",
      description: "",
      image: null,
      buttons: [{ name: "", route: "" }, { name: "", route: "" }],
    });

    // Reset local state
    setEditorContent("");
    setButtons([
      { name: "", route: "" },
      { name: "", route: "" },
    ]);

    // Reset file input 
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ""; 
    }
  };

  return (
    <div id="hero" className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <Header className="text-center text-gray-800">Hero Section</Header>
        <Paragraph>Customize Hero section</Paragraph>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col items-center gap-6">
        {/* Title Input */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
          <InputField
            label="Title"
            variant="outlined"
            size="lg"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
          />
          <FileUploadInput
            accept="image/*"
            onChange={(event) => handleFileUpload(event, setValue, "image")}
            children={"Upload Hero Image"}
          />
        </div>

        {/* Description Editor */}
        <div className="w-auto">
          <TextEditor
            placeholder="Write Hero Description"
            value={editorContent}
            onChange={handleEditorChange}
            onBlur={() => {
              setValue("description", editorContent, {
                shouldValidate: true
              });
            }}
          />
        </div>

        {/* Button Configuration */}
        <div className="flex flex-col gap-4 w-full max-w-md">
          {buttons.map((button, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Button {index + 1}
              </label>
              <div className="flex gap-2">
                <InputField
                  label="Button Name"
                  variant="outlined"
                  size="lg"
                  placeholder="Enter button name"
                  value={button.name}
                  onChange={(e) => handleButtonChange(index, "name", e.target.value)}
                  className="flex-1"
                />
                <select
                  value={button.route}
                  onChange={(e) => handleButtonChange(index, "route", e.target.value)}
                  className="block p-2 border border-gray-300 rounded-md flex-1"
                >
                  <option value="">Select a route</option>
                  {routes.map((route) => (
                    <option key={route} value={route}>
                      {route}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </div>
  );
};

export default Hero;
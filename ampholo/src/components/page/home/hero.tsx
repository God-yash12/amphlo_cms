import { useState } from "react";
import InputField from "../../../ui/input/input";
import { TextEditor } from "../../../ui/editor/text-editor";
import PrimaryButton from "../../../ui/buttons/primary-button";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { HeroService } from "../../services/home-service/hero-service";
import FileUploadInputField from "../../../ui/input/file-upload-input";

type Button = { name: string; route: string };

const Hero = () => {
  const { register, handleSubmit, setValue } = HeroService();
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


  return (
    <div id="hero" className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <Header className="text-center text-gray-800">Hero Section</Header>
        <Paragraph>Customize Hero section</Paragraph>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Title Input */}
        <div>
          <InputField
            label="Title"
            variant="outlined"
            size="lg"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
          />

        </div>

        {/* Description Editor */}
        <div className="w-auto">
          <TextEditor
            placeholder="Write Hero Description"
            value={editorContent}
            onChange={(content) => {
              setEditorContent(content)
              setValue("description", content);
            }}
          />
        </div>
        <FileUploadInputField
          onUploadSuccess={(fileId) => setValue('image', fileId)}
        />

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
        <PrimaryButton type="submit" className="w-full text-center">Submit</PrimaryButton>
      </form>
    </div>
  );
};

export default Hero;
import { useEffect, useState } from "react";
import { TextEditor } from "../../../ui/editor/text-editor";
import InputField from "../../../ui/input/input";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import FileUploadInputField from "../../../ui/input/file-upload-input";
import PrimaryButton from "../../../ui/buttons/primary-button";
import { TransformService } from "../../services/home-service/transform-service";

type Button = { name: string; route: string };

const Banner = () => {
  const { register, handleSubmit, errors, setValue } = TransformService();
  const [editorContent, setEditorContent] = useState("");
  const [buttons, setButtons] = useState<Button[]>([
    { name: "", route: "" },
    { name: "", route: "" },
  ]);
  const routes = ["/about", "/countries", "/features", "/contact"];

  useEffect(() => {
    const validButtons = buttons.filter(
      (btn) => btn.name.trim() && btn.route.trim()
    );
    setValue("buttons", validButtons); 
  }, [buttons, setValue]);

  const handleButtonChange = (
    field: "name" | "route",
    value: string,
    index: number
  ) => {
    const updatedButtons = [...buttons];
    updatedButtons[index][field] = value;
    setButtons(updatedButtons);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="text-center mb-8">
        <Header className="text-gray-800 text-3xl font-extrabold">
          Home Transform your consultancy Section
        </Header>
        <Paragraph className="text-gray-600 mt-2">
          Customize the Transform your consultancy section of your website with ease.
        </Paragraph>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md mx-auto">
        <div className="mb-6">
          <InputField
            label="Transform Title"
            placeholder="Enter Transform Title"
            {...register("title")}
            className="w-full"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transform Description
          </label>
          <TextEditor
            placeholder="Describe your key features in detail..."
            value={editorContent}
            onChange={(content) => {
              setEditorContent(content);
              setValue("description", content);
            }}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-6">
          <FileUploadInputField
            onUploadSuccess={(fileId) => setValue("image", fileId)}
          />
        </div>

         {/* Button Configuration */}
         <div className="flex flex-col gap-4 max-w-md mb-5">
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
                  onChange={(e) => handleButtonChange("name", e.target.value, index)}
                  className="flex-1"
                />
                <select
                  value={button.route}
                  onChange={(e) => handleButtonChange("route", e.target.value, index)}
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

        <PrimaryButton
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Save Changes
        </PrimaryButton>
      </form>
    </div>
  );
};

export default Banner;

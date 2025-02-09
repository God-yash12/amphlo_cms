import InputField from "../../../ui/input/input";
import { TextEditor } from "../../../ui/editor/text-editor";
import PrimaryButton from "../../../ui/buttons/primary-button";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import FileUploadInputField from "../../../ui/input/file-upload-input";
import { useFieldArray } from "react-hook-form";
import SecondaryButton from "../../../ui/buttons/secondary-button";
import { UseHeroService } from "../../services/feature/hero-service";

const routes = ["/about", "/countries", "/features", "/contact"] as const;

const Hero = () => {
  const { form, onSubmit } = UseHeroService();

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "buttons"
  });

  return (
    <div id="hero" className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <Header className="text-center text-gray-800">Hero Section</Header>
        <Paragraph>Customize Hero section</Paragraph>
      </div>

      {/* Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Title Input */}
        <div>
          <InputField
            label="Title"
            variant="outlined"
            size="lg"
            placeholder="Title"
            {...form.register("title", { required: "Title is required" })}
          />

        </div>

        {/* Description Editor */}
        <div className="w-auto">
          <TextEditor
            placeholder="Write Hero Description"
            value={form.watch("description") ?? ""}
            onChange={(content) => {
              form.setValue("description", content);
            }}
          />
        </div>
        <FileUploadInputField
          onUploadSuccess={(fileId) => form.setValue('image', fileId)}
        />

        {/* Button Configuration */}
        <div className="flex flex-col gap-4 ">
          {fields.map((field, index) => (
            <section className="space-x-5">
              <div key={field.id} className="flex flex-col gap-2">
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
        <PrimaryButton type="submit" className="w-full text-center">Update</PrimaryButton>
      </form>
    </div>
  );
};

export default Hero;
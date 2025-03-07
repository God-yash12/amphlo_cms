import InputField from "../../../ui/input/input";
import { TextEditor } from "../../../ui/editor/text-editor";
import PrimaryButton from "../../../ui/buttons/primary-button";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { HeroService } from "../../services/home/hero-service";
import SecondaryButton from "../../../ui/buttons/secondary-button";
import { FileUploadInput } from "../../../ui/input/file-upload-input copy";
import { BeatLoader, PropagateLoader } from "react-spinners";

const routes = ["/about", "/countries", "/features", "/contact-us"] as const;

const Hero = () => {
  const { form, onSubmit, fields, append, remove, image, isLoading, isPending } = HeroService();

  if (isLoading) return <PropagateLoader className="text-center" />

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
            label="Title *"
            variant="outlined"
            size="lg"
            placeholder="Title"
            {...form.register("title", { required: "Title is required" })}
          />
        </div>

        {/* Description Editor */}
        <div className="w-auto">
          <TextEditor
            value={form.watch("description") ?? ""}
            onChange={(content) => {
              form.setValue("description", content);
            }}
          />
        </div>

        <FileUploadInput
          accept="image/*"
          onChange={(files) => {
            form.setValue("imageId", files.length > 0 ? files[0].id : null);
          }}
          initialFiles={image ? [{
            id: image.id,
            url: image?.url,
            originalName: image.filename
          }] : []}
        />

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
            <SecondaryButton onClick={() => append({ name: "", route: '' })}>Add Button</SecondaryButton>
          )
        }
        {/* Submit Button */}
        <PrimaryButton type="submit" className="w-full text-center">{isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
      </form>
    </div>
  );
};

export default Hero;
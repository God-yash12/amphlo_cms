import InputField from "../../../ui/input/input";
import PrimaryButton from "../../../ui/buttons/primary-button";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { useFieldArray } from "react-hook-form";
import SecondaryButton from "../../../ui/buttons/secondary-button";
import { UseHeroService } from "../../services/feature/hero-service";
import { ErrorMessage } from "../../../ui/typographs/error-message";
import { FileUploadInput } from "../../../ui/input/file-upload-input copy";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BeatLoader } from "react-spinners";

const routes = ["/about", "/countries", "/features", "/contact"] as const;

const Hero = () => {
  const { form, onSubmit, image, isLoading, mutation } = UseHeroService();
  const errorMessage = form.formState.errors

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "buttons"
  });

  if (isLoading) return <PropagateLoader className="text-center" />

  return (
    <div id="hero">
      <div className="container bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
        {/* Header */}
        <div className="col-span-1 flex flex-col gap-3">
          <Header className=" text-gray-800 text-left">Hero Section</Header>
          <Paragraph className="text-left">Customize Hero section of about Portal page, where Title, SubTitle and image are required, buttons are optional to add.</Paragraph>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="col-span-2 flex flex-col gap-5  bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-sm md:text-base text-gray-700 font-semibold">
              Title <span className="text-red-500">*</span>
            </label>
            <InputField
              label="Title *"
              variant="outlined"
              size="lg"
              placeholder="Title"
              {...form.register("title")}
            />
            {errorMessage.title && <ErrorMessage>{errorMessage.title.message}</ErrorMessage>}

          </div>

          {/* Description Editor */}
          <div className="w-auto">
            <label className="block text-sm md:text-base text-gray-700 font-semibold">
              SubTitle <span className="text-red-500">*</span>
            </label>
            <InputField
              label="SubTitle *"
              variant="outlined"
              size="lg"
              placeholder="Subtitle"
              {...form.register("description")}
            />
            {errorMessage.description && <ErrorMessage>{errorMessage.description.message}</ErrorMessage>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm md:text-base text-gray-700 font-semibold">
              Image <span className="text-red-500">*</span>
            </label>

            <FileUploadInput
              accept="image/*"
              onChange={(files) => form.setValue('image', files[0].id)}
              initialFiles={image ? [{
                id: image.id,
                url: image.url,
                originalName: image.filename
              }] : []}
            />
            {errorMessage.image && <ErrorMessage>{errorMessage.image.message}</ErrorMessage>}
          </div>

          {/* Button Configuration */}
          <div className="flex flex-col gap-4 ">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base">Call-to-Action Buttons</h3>
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
          <div className="pt-4 border-t flex justify-center">
          <PrimaryButton type="submit" className="w-full text-center">{mutation.isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;
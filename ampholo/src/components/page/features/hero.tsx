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
    <div id="hero" className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
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
              {...form.register("title")}
            />
            {errorMessage.title && <ErrorMessage>{errorMessage.title.message}</ErrorMessage>}

          </div>

          {/* Description Editor */}
          <div className="w-auto">
            <InputField
              label="SubTitle"
              variant="outlined"
              size="lg"
              placeholder="Subtitle"
              {...form.register("description")}
            />
          </div>
          {errorMessage.description && <ErrorMessage>{errorMessage.description.message}</ErrorMessage>}
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

          <PrimaryButton type="submit" className="w-full text-center">{mutation.isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default Hero;
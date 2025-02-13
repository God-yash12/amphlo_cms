import { useParams } from "react-router-dom";
import InputField from "../../../../ui/input/input";
import { TextEditor } from "../../../../ui/editor/text-editor";
import PrimaryButton from "../../../../ui/buttons/primary-button";
import Header from "../../../../ui/typographs/header/header";
import Paragraph from "../../../../ui/typographs/paragraph";
import SecondaryButton from "../../../../ui/buttons/secondary-button";
import { ErrorMessage } from "../../../../ui/typographs/error-message";
import { CountryHeroService } from "../../../services/countries/country-hero-service";
import { FileUploadInput } from "../../../../ui/input/file-upload-input copy";
const routes = ["/about", "/countries", "/features", "/contact-us"] as const;


export const CountryHero = () => {
  const { form, onSubmit, fields, append, remove } = CountryHeroService();
  const errorMessage = form.formState.errors


  const { countryName } = useParams();

  return (
    <div id="hero" className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 ">
        {/* Header Section */}
        <div className="text-center mb-5">
          <Header className="text-gray-800">Country {countryName} Hero Section</Header>
          <Paragraph className="text-gray-600">Customize the Country Hero section below.</Paragraph>
        </div>


        {/* Form Section */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            label="Country Name"
            size="lg"
            value={countryName}
            placeholder="Enter Country Name"
            {...form.register("countryName")}

          />
          {errorMessage && <ErrorMessage>{errorMessage.countryName?.message}</ErrorMessage>}
          {/* Title Input */}
          <InputField
            label="Title"
            variant="outlined"
            size="lg"
            placeholder="Enter Hero Title"
            {...form.register("title")}
          />
          {errorMessage && <ErrorMessage>{errorMessage.title?.message}</ErrorMessage>}


          {/* Description Editor */}
          <TextEditor
            placeholder="Write Hero Description"
            value={form.watch("description") ?? ""}
            onChange={(content) => form.setValue("description", content)}
          />
          {errorMessage && <ErrorMessage>{errorMessage.description?.message}</ErrorMessage>}

          {/* File Upload */}
          <FileUploadInput
            onChange={(fileId) => form.setValue('image', fileId[0].id)}
          />
          {errorMessage && <ErrorMessage>{errorMessage.image?.message}</ErrorMessage>}

          {/* Button Configuration Section */}
          <div className="space-y-4">
            <Header className="text-gray-700">Hero Buttons</Header>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-center">
                <InputField
                  label={`Button Name ${index + 1}`}
                  variant="outlined"
                  size="lg"
                  placeholder="Enter button name"
                  className="flex-1"
                  {...form.register(`buttons.${index}.name`)}
                />
                {errorMessage.buttons?.[index]?.name && <ErrorMessage>{errorMessage.buttons[index].name?.message}</ErrorMessage>}
                <select
                  value={form.watch(`buttons.${index}.route`) || ""}
                  onChange={(e) => form.setValue(`buttons.${index}.route`, e.target.value)}
                  className="p-2 border rounded-md flex-1"
                >
                  <option value="">Select a route</option>
                  {routes.map((route) => (
                    <option key={route} value={route}>{route}</option>
                  ))}
                </select>
                {errorMessage.buttons?.[index]?.route && <ErrorMessage>{errorMessage.buttons[index].route.message}</ErrorMessage>}

                {fields.length > 1 && (
                  <SecondaryButton onClick={() => remove(index)} className="text-sm">Delete</SecondaryButton>
                )}
              </div>
            ))}

            {/* Add Button */}
            {fields.length < 2 && (
              <SecondaryButton onClick={() => append({ name: '', route: '' })} className="text-sm">
                + Add Button
              </SecondaryButton>
            )}
          </div>

          {/* Submit Button */}
          <PrimaryButton type="submit" className="w-full text-center">Update</PrimaryButton>
        </form>
      </div>
    </div>
  );
};

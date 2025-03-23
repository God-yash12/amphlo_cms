import InputField from "../../../../ui/input/input";
import { TextEditor } from "../../../../ui/editor/text-editor";
import PrimaryButton from "../../../../ui/buttons/primary-button";
import Header from "../../../../ui/typographs/header/header";
import Paragraph from "../../../../ui/typographs/paragraph";
import { useFieldArray } from "react-hook-form";
import SecondaryButton from "../../../../ui/buttons/secondary-button";
import { ErrorMessage } from "../../../../ui/typographs/error-message";
import { BecamePartnerService } from "../../../services/about/for-partner/became-partner-service";
import { BeatLoader, PropagateLoader } from "react-spinners";

const routes = ["/about", "/countries", "/features", "/contact-us"] as const;

export const JoinNowPartnerSection = () => {
  const { form, onSubmit, isLoading, isPending } = BecamePartnerService();
  const errorMessage = form.formState.errors;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "buttons",
  });

  if (isLoading) return <PropagateLoader className="text-center" />

  return (
    <div id="hero" className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
      {/* Header Section */}
      <div className="text-center mb-6 col-span-1">
        <Header className="text-gray-800 text-left">Partner Join Network Section</Header>
        <Paragraph className="text-left">explain how someone became partner with you as agent or university. Add the process of become you partner, Add title and description.</Paragraph>
      </div>

      {/* Form Section */}
      <form onSubmit={form.handleSubmit(onSubmit)} className=" bg-white rounded-xl shadow-lg p-8 space-y-8 col-span-2">
        {/* Title Input */}
        <div className=" space-y-2">
          <label className="block text-sm md:text-base font-semibold text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <InputField
            label="Title *"
            variant="outlined"
            size="lg"
            placeholder="Enter the section title"
            {...form.register("title", { required: "Title is required" })}
          />
          {errorMessage?.title && <ErrorMessage>{errorMessage.title.message}</ErrorMessage>}
        </div>

        {/* Description Editor */}
        <div className="w-auto space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description *
          </label>
          <TextEditor
            value={form.watch("description") ?? ""}
            onChange={(content) => form.setValue("description", content)}
          />
          {errorMessage?.description && <ErrorMessage>{errorMessage.description.message}</ErrorMessage>}
        </div>

        {/* Button Configuration */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base">Call-to-Action Buttons</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-md bg-gray-50">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Button Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Button {index + 1}
                  </label>
                  <InputField
                    label="Button Name"
                    variant="outlined"
                    size="lg"
                    placeholder="Enter button name"
                    {...form.register(`buttons.${index}.name`, { required: "Button name is required" })}
                  />
                  {errorMessage?.buttons?.[index]?.name && (
                    <ErrorMessage>{errorMessage.buttons[index].name.message}</ErrorMessage>
                  )}
                </div>

                {/* Route Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Select Route</label>
                  <select
                    value={form.watch(`buttons.${index}.route`) || ""}
                    onChange={(e) => form.setValue(`buttons.${index}.route`, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select a route</option>
                    {routes.map((route) => (
                      <option key={route} value={route}>
                        {route}
                      </option>
                    ))}
                  </select>
                  {errorMessage?.buttons?.[index]?.route && (
                    <ErrorMessage>{errorMessage.buttons[index].route.message}</ErrorMessage>
                  )}
                </div>

                {/* Remove Button */}
                <div className="flex items-end">
                  {fields.length > 1 && (
                    <SecondaryButton onClick={() => remove(index)}>
                      Remove
                    </SecondaryButton>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Button */}
        {fields.length < 5 && (
          <SecondaryButton onClick={() => append({ name: "", route: "" })}>
            Add Button
          </SecondaryButton>
        )}

        {/* Submit Button */}
        <div className="pt-4 border-t flex justify-center">
          <PrimaryButton type="submit" className="w-full text-center">{isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

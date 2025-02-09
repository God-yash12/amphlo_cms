import InputField from "../../../ui/input/input"
import { TextEditor } from "../../../ui/editor/text-editor"
import Header from "../../../ui/typographs/header/header"
import Paragraph from "../../../ui/typographs/paragraph"
import FileUploadInputField from "../../../ui/input/file-upload-input"
import { WhyAmphloService } from "../../services/home/why-amphlo-service"
import { ErrorMessage } from "../../../ui/typographs/error-message"
import PrimaryButton from "../../../ui/buttons/primary-button"
import { useFieldArray } from "react-hook-form"
import SecondaryButton from "../../../ui/buttons/secondary-button"
import { Textarea } from "@material-tailwind/react"


const WhyAmphlo = () => {
  const { form, onSubmit } = WhyAmphloService()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'lists',
  })

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-6">
        <Header className="text-2xl font-bold text-gray-800">Why Choose AMPHLO</Header>
        <Paragraph className="text-gray-600">Customize the reasons for choosing AMPHLO in this section.</Paragraph>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <InputField
            label="Why AMPHLO"
            placeholder="Enter reasons for choosing AMPHLO"
            size="lg"
            {...form.register("title")}
            aria-invalid={form.formState.errors.title ? "true" : "false"}
          />
          {form.formState.errors.title && <ErrorMessage>{form.formState.errors.title.message}</ErrorMessage>}

          <InputField
            label="Main Title"
            placeholder="Enter the main title"
            size="lg"
            {...form.register("mainTitle")}
            aria-invalid={form.formState.errors.mainTitle ? "true" : "false"}
          />
          {form.formState.errors.mainTitle && <ErrorMessage>{form.formState.errors.mainTitle.message}</ErrorMessage>}
        </div>
        <div>
          <TextEditor
            value={form.watch('description') ?? ""}
            onChange={(content) => {
              form.setValue("description", content);
            }}
          />
          {form.formState.errors.description && <ErrorMessage>{form.formState.errors.description.message}</ErrorMessage>}
        </div>

        <FileUploadInputField
          onUploadSuccess={(fileId) => form.setValue("image", fileId)}
        />

        {/* List Item Process */}
        <section className="space-y-5">
          <Header>Add Lists</Header>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-5">
              <InputField
                label="Process Title"
                placeholder="Process Title"
                {...form.register(`lists.${index}.listTitle`)}
              />
              {/* @ts-ignore */}
              <Textarea
                label="Process Description"
                placeholder="Process Description"
                {...form.register(`lists.${index}.listDescription`)}
              />
              {fields.length > 1 && (
                <SecondaryButton onClick={() => remove(index)} className="text-sm space-x-3 cursor-pointer"> Delete </SecondaryButton>
              )}
            </div>

          ))}
          {
            fields.length < 5 && (
              <div>
                <SecondaryButton
                  onClick={(e) => {
                    e.preventDefault();
                    append({ listTitle: '', listDescription: '' });
                  }}
                >
                  Add List
                </SecondaryButton>
              </div>
            )
          }
        </section>

        <PrimaryButton type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">
          Submit
        </PrimaryButton>
      </form>
    </div>
  )
}

export default WhyAmphlo

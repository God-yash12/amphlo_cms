import InputField from "../../../ui/input/input"
import { TextEditor } from "../../../ui/editor/text-editor"
import Header from "../../../ui/typographs/header/header"
import Paragraph from "../../../ui/typographs/paragraph"
import { WhyAmphloService } from "../../services/home/why-amphlo-service"
import { ErrorMessage } from "../../../ui/typographs/error-message"
import PrimaryButton from "../../../ui/buttons/primary-button"
import SecondaryButton from "../../../ui/buttons/secondary-button"
import { FileUploadInput } from "../../../ui/input/file-upload-input copy"
import PropagateLoader from "react-spinners/PropagateLoader"
import { BeatLoader } from "react-spinners"

const WhyAmphlo = () => {
  const { form, onSubmit, fields, append, image, isLoading, isPending } = WhyAmphloService()

  if (isLoading) return <PropagateLoader className="text-center" />

  return (
    <div className="flex flex-col gap-12">
      <div className="text-center mb-6">
        <Header className="text-2xl font-bold text-gray-800">Why Choose AMPHLO</Header>
        <Paragraph className="text-gray-600">Customize the reasons for choosing AMPHLO in this section.</Paragraph>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <InputField
            label="Why AMPHLO *"
            placeholder="Enter reasons for choosing AMPHLO"
            size="lg"
            {...form.register("title")}
          // aria-invalid={form.formState.errors.title ? "true" : "false"}
          />
          {form.formState.errors.title && <ErrorMessage>{form.formState.errors.title.message}</ErrorMessage>}

          <InputField
            label="Main Title *"  
            placeholder="Enter the main title"
            size="lg"
            {...form.register("mainTitle")}
          // aria-invalid={form.formState.errors.mainTitle ? "true" : "false"}
          />
          {form.formState.errors.mainTitle && <ErrorMessage>{form.formState.errors.mainTitle.message}</ErrorMessage>}
        </div>
        <div>
          <div className="space-y-2 w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feature Description *
            </label>
            <TextEditor
              value={form.watch("description")}
              onChange={(content) => form.setValue("description", content)}
            />
          </div>
          {form.formState.errors.description && <ErrorMessage>{form.formState.errors.description.message}</ErrorMessage>}
        </div>

        <FileUploadInput
          onChange={(files) => form.setValue("imageId", files[0].id)}
          initialFiles={image ? [{
            id: image.id,
            url: image.url,
            originalName: image.filename
          }] : []}
        />

        {/* List Item Process */}
        <section className="space-y-5">
          <Header>Add Lists</Header>
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-5">
              <InputField
                label="Process Title *"
                placeholder="Process Title"
                {...form.register(`lists.${index}.listTitle`)}
              />
            </div>

          ))}
          {
            fields.length < 5 && (
              <div>
                <SecondaryButton
                  onClick={(e) => {
                    e.preventDefault();
                    append({ listTitle: '' });
                  }}
                >
                  + Add List
                </SecondaryButton>
              </div>
            )
          }
        </section>

        <PrimaryButton type="submit" disabled={isPending} className="w-full text-center">{isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
      </form>
    </div>
  )
}

export default WhyAmphlo

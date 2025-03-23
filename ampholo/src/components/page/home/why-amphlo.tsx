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
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
      <div className="col-span-1 text-center mb-6 ">
        <Header className="text-2xl font-bold text-gray-800 text-left">Why Choose AMPHLO</Header>
        <Paragraph className="text-gray-600 text-left mt-3">Customize the reasons for choosing AMPHLO in this section. Title, description, Process Title and Lists and image are required and main title is optional. </Paragraph>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 col-span-2 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 ">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="block text-sm md:text-base font-semibold text-gray-700">
              Why Amphlo Title <span className="text-red-500">*</span>
            </label>
            <InputField
              // label="Why AMPHLO *"
              placeholder="Enter reasons for choosing AMPHLO"
              size="lg"
              {...form.register("title")}
            // aria-invalid={form.formState.errors.title ? "true" : "false"}
            />
            {form.formState.errors.title && <ErrorMessage>{form.formState.errors.title.message}</ErrorMessage>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm md:text-base font-semibold text-gray-700">
              Main Title <span className="text-red-500">*</span>
            </label>
            <InputField
              // label="Main Title *"
              placeholder="Enter the main title"
              size="lg"
              {...form.register("mainTitle")}
            // aria-invalid={form.formState.errors.mainTitle ? "true" : "false"}
            />
            {form.formState.errors.mainTitle && <ErrorMessage>{form.formState.errors.mainTitle.message}</ErrorMessage>}
          </div>
        </div>
        <div>
          <div className="space-y-2 w-auto">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Feature Description *
            </label>
            <TextEditor
              value={form.watch("description")}
              onChange={(content) => form.setValue("description", content)}
            />
          </div>
          {form.formState.errors.description && <ErrorMessage>{form.formState.errors.description.message}</ErrorMessage>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Image *
          </label>

          <FileUploadInput
            onChange={(files) => form.setValue("imageId", files[0].id)}
            initialFiles={image ? [{
              id: image.id,
              url: image.url,
              originalName: image.filename
            }] : []}
          />
          {form.formState.errors.imageId && <ErrorMessage>{form.formState.errors.imageId.message}</ErrorMessage>}
        </div>

        {/* List Item Process */}
        <section className="space-y-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2 mt-10">
            Add Process Title and  Lists *
          </label>
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

        <div className="pt-4 border-t flex justify-center">
            <PrimaryButton
              type="submit"
              disabled={isPending}
              className="px-4 md:px-6 py-4"
            >
              {isPending ? <BeatLoader size={8} color="#ffffff" /> : "Save Changes"}
            </PrimaryButton>
          </div>
      </form>
    </div>
  )
}

export default WhyAmphlo

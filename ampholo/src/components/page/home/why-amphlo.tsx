import InputField from "../../../ui/input/input"
import { TextEditor } from "../../../ui/editor/text-editor"
import { useState } from "react"
import Header from "../../../ui/typographs/header/header"
import Paragraph from "../../../ui/typographs/paragraph"
import FileUploadInputField from "../../../ui/input/file-upload-input"
import { WhyAmphloService } from "../../services/home-service/why-amphlo-service"
import { ErrorMessage } from "../../../ui/typographs/error-message"
import PrimaryButton from "../../../ui/buttons/primary-button"


const WhyAmphlo = () => {
  const [editorContent, setEditorContent] = useState("")

  const { register, handleSubmit, errors, setValue } = WhyAmphloService()

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-6">
        <Header className="text-2xl font-bold text-gray-800">Why Choose AMPHLO</Header>
        <Paragraph className="text-gray-600">Customize the reasons for choosing AMPHLO in this section.</Paragraph>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <InputField
            label="Why AMPHLO"
            placeholder="Enter reasons for choosing AMPHLO"
            size="lg"
            {...register("title")}
            aria-invalid={errors.title ? "true" : "false"}
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}

          <InputField
            label="Main Title"
            placeholder="Enter the main title"
            size="lg"
            {...register("mainTitle")}
            aria-invalid={errors.mainTitle ? "true" : "false"}
          />
          {errors.mainTitle && <ErrorMessage>{errors.mainTitle.message}</ErrorMessage>}
        </div>
        <div>
          <TextEditor
            value={editorContent}
            onChange={(content) => {
              setEditorContent(content);
              setValue("description", content);
            }}
          />
          {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
        </div>

        <FileUploadInputField
          onUploadSuccess={(fileId) => setValue("image", fileId)}
        />
        <PrimaryButton type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">
          Submit
        </PrimaryButton>
      </form>
    </div>
  )
}

export default WhyAmphlo

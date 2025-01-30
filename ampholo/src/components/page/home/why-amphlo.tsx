
import InputField from "../../../ui/input/input"
import { TextEditor } from "../../../ui/editor/text-editor"
import { updateEditorContent } from "../../helpers/text-editor-helper"
import { useState } from "react"
import { Textarea } from "@material-tailwind/react"
import Header from "../../../ui/typographs/header/header"
import Paragraph from "../../../ui/typographs/paragraph"
import FileUploadInputField from "../../../ui/input/file-upload-input"
import { WhyAmphloService } from "../../services/home-service/why-amphlo-service"
import { ErrorMessage } from "../../../ui/typographs/error-message"
import PrimaryButton from "../../../ui/buttons/primary-button"
import { handleFileUpload } from "../../helpers/file-upload-helper"


const WhyAmphlo = () => {
  const [editorContent, setEditorContent] = useState("")

  const { register, handleSubmit, onSubmit, errors, setValue } = WhyAmphloService()

  return (
    <div>
      <div className="flex flex-col gap-3">
        <Header className="text-center text-gray-800">Home Why Choosing AMPHLO Section</Header>
        <Paragraph>Customize Why choose AMPHLO section</Paragraph>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputField
            label="Why AMPHLO"
            placeholder="Why Choose AMPHLO"
            size="lg"
            {...register("whyAMPHLO")}
          />
          {errors.whyAMPHLO && <ErrorMessage>{errors.whyAMPHLO.message}</ErrorMessage>}
          <InputField
            label="Main Title"
            placeholder="Main Title ..."
            size="lg"
            {...register("mainTitle")}
          />
          {errors.mainTitle && <ErrorMessage>{errors.mainTitle.message}</ErrorMessage>}
        </div>
        <TextEditor
          value={editorContent}
          onChange={(content) => updateEditorContent(content, setEditorContent, setValue)}
          onBlur={() => setValue('description', editorContent, { shouldValidate: true })}
        />

        {/* features */}

        <section>
          <InputField
            label="Student Management"
            placeholder="Student Management"
            size="lg"
            {...register("studentManagementTitle")}
          />
          {errors.studentManagementTitle && <ErrorMessage>{errors.studentManagementTitle.message}</ErrorMessage>}
          <Textarea
            label="Description"
            placeholder="Description of Student Management"
            variant="outlined"
            {...register("studentManagementDescription")}
          />
          {errors.studentManagementDescription && <ErrorMessage>{errors.studentManagementDescription.message}</ErrorMessage>}
        </section>

        {/* CRM Theme */}
        <section>
          <InputField
            label="CRM Themes"
            placeholder="CRM Themes"
            size="lg"
            {...register("CRMThemeTitle")}
          />
          {errors.CRMThemeTitle && <ErrorMessage>{errors.CRMThemeTitle.message}</ErrorMessage>}

          <Textarea
            label="Description"
            placeholder="Description of CRM Themes"
            variant="outlined"
            size="lg"
            {...register('CRMThemeDescription')}
          />
          {errors.CRMThemeDescription && <ErrorMessage>{errors.CRMThemeDescription.message}</ErrorMessage>}
        </section>

        <section>
          <InputField
            label="Courses"
            placeholder="Courses"
            size="lg"
            {...register('coursesTitle')}
          />
          {errors.coursesTitle && <ErrorMessage>{errors.coursesTitle.message}</ErrorMessage>}

          <Textarea
            label="Description"
            placeholder="Description of Courses"
            variant="outlined"
            size="lg"
            {...register("coursesDescription")} />
          {errors.coursesDescription && <ErrorMessage>{errors.coursesDescription.message}</ErrorMessage>}
        </section>
        <FileUploadInputField
          accept="image/*"
          onFileChange={(e) => handleFileUpload(e, setValue, "image", { multiple: false })}
          {...register('image')}
        />
        {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}

        <PrimaryButton type="submit" className="w-full">Submit</PrimaryButton>
      </form>
    </div>
  )
}

export default WhyAmphlo

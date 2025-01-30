import { useState } from "react"
import FileUploadInput from "../../../ui/buttons/file-upload"
import { TextEditor } from "../../../ui/editor/text-editor"
import InputField from "../../../ui/input/input"
import Header from "../../../ui/typographs/header/header"
import Paragraph from "../../../ui/typographs/paragraph"
import { updateEditorContent } from "../../helpers/text-editor-helper"
import PrimaryButton from "../../../ui/buttons/primary-button"
import { CounterService } from "../../services/home-service/counter-service"
import { handleFileUpload } from "../../helpers/file-upload-helper"
import { Textarea } from "@material-tailwind/react"

const Counters = () => {

  const [editorContent, setEditorContent] = useState("")
  const { register, handleSubmit, onSubmit, setValue } = CounterService()

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col gap-3">
        <Header className="text-center text-gray-800">Home Counter Section</Header>
        <Paragraph>Customize Counter section</Paragraph>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-10 ">
        <div className="flex flex-col lg:flex-row  gap-4 lg:gap-10">
          <InputField
            label="Title"
            size="lg"
            placeholder="Enter Counter Title"
            {...register("title")}
          />
          <FileUploadInput
            accept="image/*"
            onChange={(e) => handleFileUpload(e, setValue, "image")}
            children={"Upload Counter Background Image"}
          />
        </div>

        <div className="w-auto">
          <TextEditor
            placeholder="Write Counter Description"
            value={editorContent}
            onChange={
              (content) => updateEditorContent(content, setEditorContent, setValue)}
            onBlur={() => { setValue('description', editorContent, { shouldValidate: true }) }}
          />
        </div>

        {/* Counters */}
        <div className="flex flex-col gap-8">
          <Paragraph className="text-gray-800">
            Counter Numbers and Description
          </Paragraph>
          <div className="flex flex-col lg:flex-row gap-5">
            {/* countries */}
            <section className="flex flex-col gap-6">
              <InputField
                label="Country "
                type="number"
                {...register("countryCount")}
              />

              <Textarea
                label="country Count SubTitle"
                variant="outlined"
                placeholder="enter text"
                {...register("countryCountSubTitle")}
              />
            </section>

            {/* Agents */}
            <section className="flex flex-col gap-6">
              <InputField
                label="Sub-agents "
                type="number"
                {...register("agentCount")}
              />
              <Textarea 
               label="Enter agent Subtitle"
               variant="outlined"
               placeholder="Enter agent Subtitle"
               {...register("agentCountSubTitle")}
              />
            </section>

          </div>
          <div className="flex flex-col lg:flex-row gap-5">
            {/* student enrolled */}
            <section className="flex flex-col gap-6">
              <InputField
                label="students Entrolled "
                type="number"
                {...register("studentsCount")}

              />
               <Textarea 
               label="Enter students Entrolled Subtitle"
               variant="outlined"
               placeholder="Enter students Entrolled Subtitle"
               {...register("studentsCountSubTitle")}
              />
            </section>
            {/* average partner rating */}
            <section className="flex flex-col gap-6">
              <InputField
                label="Average Partner Rating "
                type="number"
                {...register("partnerRatingCount")}
              />
             <Textarea 
               label="Enter Partner Rating  Subtitle"
               variant="outlined"
               placeholder="Enter Partner Rating  Subtitle"
               {...register("partnerRatingSubTitle")}
              />
            </section>

          </div>

        </div>
        <PrimaryButton type="submit">
          Submit
        </PrimaryButton>
      </form>



    </div>
  )
}

export default Counters

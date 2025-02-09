import { useState } from "react";
import { TextEditor } from "../../../ui/editor/text-editor";
import InputField from "../../../ui/input/input";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import PrimaryButton from "../../../ui/buttons/primary-button";
import { CounterService } from "../../services/home/counter-service";

const Counters = () => {
  const [editorContent, setEditorContent] = useState("");
  const { register, handleSubmit, onSubmit, setValue } = CounterService();

  return (
    <div className="flex flex-col items-center gap-8 p-6 bg-gray-50 rounded-lg shadow-sm">
      <div className="flex flex-col gap-2 text-center">
        <Header className="text-gray-800 text-2xl font-bold">Home Counter Section</Header>
        <Paragraph className="text-gray-600">Customize Counter section</Paragraph>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-6 w-full max-w-4xl"
      >
        {/* Counter Information Section */}
        <div className="w-full bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Counter Information</h2>
          <div className="flex flex-col gap-4">
            <InputField
              label="Title"
              size="lg"
              placeholder="Enter Counter Title"
              {...register("title")}
            />
            <TextEditor
              placeholder="Write Counter Description"
              value={editorContent}
              onChange={(content) => {
                setEditorContent(content);
                setValue("description", content);
              }}
            />
          </div>
        </div>

        {/* Counter Numbers and Descriptions Section */}
        <div className="w-full bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Counter Numbers and Descriptions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Country Section */}
            <section className="flex flex-col gap-4">
              <InputField
                label="Country"
                type="number"
                {...register("countryCount")}
              />
              <textarea
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter country subtitle"
                {...register("countryCountSubTitle")}
              />
            </section>

            {/* Sub-agents Section */}
            <section className="flex flex-col gap-4">
              <InputField
                label="Sub-agents"
                type="number"
                {...register("agentCount")}
              />
              <textarea
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter agent subtitle"
                {...register("agentCountSubTitle")}
              />
            </section>

            {/* Students Enrolled Section */}
            <section className="flex flex-col gap-4">
              <InputField
                label="Students Enrolled"
                type="number"
                {...register("studentsCount")}
              />
              <textarea
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter students enrolled subtitle"
                {...register("studentsCountSubTitle")}
              />
            </section>

            {/* Average Partner Rating Section */}
            <section className="flex flex-col gap-4">
              <InputField
                label="Average Partner Rating"
                type="number"
                {...register("partnerRatingCount")}
              />
              <textarea
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter partner rating subtitle"
                {...register("partnerRatingSubTitle")}
              />
            </section>
          </div>
        </div>

        {/* Submit Button */}
        <PrimaryButton type="submit" className="mt-6 w-full">
          Submit
        </PrimaryButton>
      </form>
    </div>
  );
};

export default Counters;
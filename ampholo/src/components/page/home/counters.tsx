import { TextEditor } from "../../../ui/editor/text-editor";
import InputField from "../../../ui/input/input";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import PrimaryButton from "../../../ui/buttons/primary-button";
import { useCounterService } from "../../services/home/counter-service";
import { ErrorMessage } from "../../../ui/typographs/error-message";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BeatLoader } from "react-spinners";

const Counters = () => {
  const { form, onSubmit, isLoading, isPending } = useCounterService();
  const errorMessage = form.formState.errors;

  if (isLoading) return <PropagateLoader className="text-center" />

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
      {/* Header Section */}
      <div className="col-span-1 text-center">
        <Header className="text-3xl text-left font-extrabold text-gray-800 mb-2">
          Home Counter Section
        </Header>
        <Paragraph className="text-gray-600 text-left">
          Customize the Counter section with accurate details and descriptions. Title,  Description, Counters numbers and Descriptions are required.
        </Paragraph>
      </div>

      {/* Form Section */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-8 col-span-2"
      >
        {/* Counter Information */}
        <div className="bg-white p-6 rounded-xl shadow-md">

          <div className="space-y-4">
            <div className="space-y-3">
              <label className="block text-sm md:text-base text-gray-700 font-semibold">
                Title <span className="text-red-500">*</span>
              </label>
              <InputField
                label="Title *"
                size="lg"
                placeholder="Enter Counter Title"
                {...form.register("title")}
              />
              {errorMessage.title && <ErrorMessage className="text-red-500">{errorMessage.title.message}</ErrorMessage>}
            </div>

            <div className="space-y-2 w-auto">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Feature Description *
              </label>
              <TextEditor
                value={form.watch("description")}
                onChange={(content) => form.setValue("description", content)}
              />
              {errorMessage.description && <ErrorMessage className="text-red-500">{errorMessage.description.message}</ErrorMessage>}
            </div>
          </div>
        </div>

        {/* Counter Numbers and Descriptions */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Counter Numbers and Descriptions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Country Section */}
            <section className="space-y-4">
              <InputField
                label="Country Count"
                placeholder="Enter Country Count"
                {...form.register("countryCount", { valueAsNumber: true })}
              />
              {errorMessage.countryCount && <ErrorMessage className="text-red-500">{errorMessage.countryCount.message}</ErrorMessage>}
              <textarea
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter country subtitle"
                {...form.register("countryCountSubTitle")}
              />
              {errorMessage.countryCountSubTitle && <ErrorMessage className="text-red-500">{errorMessage.countryCountSubTitle.message}</ErrorMessage>}
            </section>

            {/* Sub-agents Section */}
            <section className="space-y-4">
              <InputField
                label="Sub-agents Count"
                placeholder="Enter Sub-agents Count"
                {...form.register("agentCount", { valueAsNumber: true })}
              />
              {errorMessage.agentCount && <ErrorMessage className="text-red-500">{errorMessage.agentCount.message}</ErrorMessage>}
              <textarea
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter sub-agents subtitle"
                {...form.register("agentCountSubTitle")}
              />
              {errorMessage.agentCountSubTitle && <ErrorMessage className="text-red-500">{errorMessage.agentCountSubTitle.message}</ErrorMessage>}
            </section>

            {/* Students Enrolled Section */}
            <section className="space-y-4">
              <InputField
                label="Students Enrolled"
                placeholder="Enter Students Enrolled Count"
                {...form.register("studentsCount", { valueAsNumber: true })}
              />
              {errorMessage.studentsCount && <ErrorMessage className="text-red-500">{errorMessage.studentsCount.message}</ErrorMessage>}
              <textarea
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter students enrolled subtitle"
                {...form.register("studentsCountSubTitle")}
              />
              {errorMessage.studentsCountSubTitle && <ErrorMessage className="text-red-500">{errorMessage.studentsCountSubTitle.message}</ErrorMessage>}
            </section>

            {/* Average Partner Rating Section */}
            <section className="space-y-4">
              <InputField
                label="Average Partner Rating"
                placeholder="Enter Partner Rating"
                {...form.register("partnerRatingCount", { valueAsNumber: true })}
              />
              {errorMessage.partnerRatingCount && <ErrorMessage className="text-red-500">{errorMessage.partnerRatingCount.message}</ErrorMessage>}
              <textarea
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter partner rating subtitle"
                {...form.register("partnerRatingSubTitle")}
              />
              {errorMessage.partnerRatingSubTitle && <ErrorMessage className="text-red-500">{errorMessage.partnerRatingSubTitle.message}</ErrorMessage>}
            </section>
          </div>
        </div>

        {/* Submit Button */}

        <div className="pt-4 border-t flex justify-center">
          <PrimaryButton
            type="submit"
            disabled={isPending}
            className="px-4 md:px-6 py-2"
          >
            {isPending ? <BeatLoader size={8} color="#ffffff" /> : "Save Changes"}
          </PrimaryButton>
        </div>

      </form>
    </div>
  );
};

export default Counters;

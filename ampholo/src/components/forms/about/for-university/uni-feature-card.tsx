import { useRef } from "react";
import InputField from "../../../../ui/input/input";
import PrimaryButton from "../../../../ui/buttons/primary-button";
import Header from "../../../../ui/typographs/header/header";
import Paragraph from "../../../../ui/typographs/paragraph";
import { TextEditor } from "../../../../ui/editor/text-editor";
import { UniFeatureCardService } from "../../../services/form-service/for-univerity/uni-feature-card";
import { ErrorMessage } from "../../../../ui/typographs/error-message";
import SecondaryButton from "../../../../ui/buttons/secondary-button";
import { BeatLoader, PulseLoader } from "react-spinners";
import DOMPurify from "dompurify";
import { FormProvider } from "react-hook-form";


export const UniAboutFeatureCard = () => {
  const { form, onSubmit, data, selectedFeatureCard, loading, isLoading, setSelectedFeatureCard, deleteCard, deletingCardId, isPending } = UniFeatureCardService()
  const errorMessage = form.formState.errors

  const formRef = useRef<HTMLDivElement>(null)

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <div ref={formRef} className="container mx-auto px-4 py-5">
        <div className="container bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">


          {/* Header Section */}
          <div className="col-span-1 max-w-2xl mx-auto text-left mb-12">
            <Header className="text-3xl text-left font-bold text-gray-900 mb-4">
              {selectedFeatureCard ? "Update Feature Card" : "About Features Cards Management"}
            </Header>
            <Paragraph className="text-gray-600 text-left">
              Customize and manage your website's About Features Cards Management section Cards of Universities feature page.
            </Paragraph>
          </div>

          {/* Form Section */}
          <div className="col-span-2 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
            <FormProvider {...form} >
              <form
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {/* Title Input Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm  text-gray-700 font-semibold">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <InputField
                      label="Showcase Your Feature's Card Headline *"
                      placeholder="Enter a compelling title for your features section"
                      className="w-full transition-all duration-200"
                      size="lg"
                      {...form.register("title")}
                    />
                    {errorMessage.title && <ErrorMessage>{errorMessage.title.message}</ErrorMessage>}
                  </div>

                  {/* Description Editor Section */}
                  <div className="space-y-2">
                    <label className="block text-sm  text-gray-700 font-semibold">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <TextEditor
                      placeholder="Describe your key features in detail..."
                      value={form.watch('description') ?? ""}
                      onChange={(content) => {
                        form.setValue("description", content);
                      }}
                    />
                    {errorMessage.description && <ErrorMessage>{errorMessage.description.message}</ErrorMessage>}
                  </div>

                </div>

                {/* Submit Button */}
                <div className="pt-5 border-t flex justify-center">
                  <PrimaryButton
                    type="submit"
                    disabled={isLoading}
                    className={`w-full px-10 text-center ${selectedFeatureCard ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
                      }`}
                  >
                    {isLoading ? (
                      <div><BeatLoader /></div>
                    ) : (
                      <div>{selectedFeatureCard ? "UPDATE" : "SUBMIT"}</div>
                    )}
                  </PrimaryButton>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>

        {/* feature card list */}
        <div className="mt-12 p-10">
          <h2 className="text-2xl font-bold mb-4">Existing Feature Cards</h2>

          {loading ? (
            <BeatLoader />
          ) : (data?.length ?? 0) > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(data ?? []).map((card) => (
                <div key={card.id} className="p-6 bg-white shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <Paragraph className="text-left">
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(card.description) }}></div>
                  </Paragraph>

                  {card.image?.url && (
                    <img src={card.image.url} alt="Feature Image" className="w-20 h-20 object-cover mt-2" />
                  )}

                  <div className="flex space-x-4 mt-4">
                    <SecondaryButton disabled={isPending} onClick={() => { setSelectedFeatureCard(card); scrollToForm(); }}>
                      Edit
                    </SecondaryButton>
                    <SecondaryButton onClick={() => deleteCard(card.id)}>
                      {deletingCardId === card.id ? <PulseLoader /> : "Delete"}
                    </SecondaryButton>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Paragraph>No data</Paragraph>
          )}
        </div>


      </div>
    </div>
  );
};



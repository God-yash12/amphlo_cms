import InputField from "../../../../ui/input/input";
import PrimaryButton from "../../../../ui/buttons/primary-button";
import Header from "../../../../ui/typographs/header/header";
import Paragraph from "../../../../ui/typographs/paragraph";
import { TextEditor } from "../../../../ui/editor/text-editor";
import { UniFeatureCardService } from "../../../services/form-service/for-univerity/uni-feature-card";
import { ErrorMessage } from "../../../../ui/typographs/error-message";
import SecondaryButton from "../../../../ui/buttons/secondary-button";
import { FileUploadInput } from "../../../../ui/input/file-upload-input copy";
import { BeatLoader } from "react-spinners";

export const UniAboutFeatureCard = () => {
  const { form, onSubmit, imagePreview, data, selectedFeatureCard, setSelectedFeatureCard, deleteMutation, isPending } = UniFeatureCardService()
  const errorMessage = form.formState.errors

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="max-w-2xl mx-auto text-center mb-12">

          <Header className="text-3xl font-bold text-gray-900 mb-4">
            {selectedFeatureCard ? "Update Feature Card" : "About Features Cards Management"}
          </Header>
          <Paragraph className="text-gray-600">
            Customize and manage your website's About Features Cards Management section Cards
          </Paragraph>
        </div>

        {/* Form Section */}
        <div className="mx-auto">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white rounded-xl shadow-lg p-8 space-y-8"
          >
            {/* Title Input Section */}
            <div className="space-y-4">
              <div className="relative">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Description *
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

              <div className="w-auto space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image *
                </label>
                <FileUploadInput
                  onChange={(files) => form.setValue('image', files[0].id)}
                />
                {errorMessage.image && <ErrorMessage>{errorMessage.image.message}</ErrorMessage>}
                {imagePreview && (
                  <div>
                    <label>Current Image</label>
                    <img src={imagePreview} alt="Current Hero" width="200" />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">

              <PrimaryButton type="submit" className="w-full text-center">{isPending ? <div><BeatLoader /></div> : <div>Submit</div>}</PrimaryButton>
            </div>
          </form>
        </div>

        {/* feature card list */}

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Existing Feature Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data && data?.map((card) => (
              <div key={card.id} className="p-6 bg-white shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
                {card.image?.url && <img src={card.image.url} alt="Feature Image" className="w-20 h-20 object-cover mt-2" />}
                <div className="flex space-x-4 mt-4">
                  <SecondaryButton
                    onClick={() => setSelectedFeatureCard(card)}
                  >
                    Edit
                  </SecondaryButton>
                  <SecondaryButton
                    onClick={() => deleteMutation.mutate(card.id)}
                  >
                    Delete
                  </SecondaryButton>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};



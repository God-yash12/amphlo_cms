import InputField from "../../../../ui/input/input";
import PrimaryButton from "../../../../ui/buttons/primary-button";
import Header from "../../../../ui/typographs/header/header";
import Paragraph from "../../../../ui/typographs/paragraph";
import { TextEditor } from "../../../../ui/editor/text-editor";
import { FileUploadInput } from "../../../../ui/input/file-upload-input copy";
import { ErrorMessage } from "../../../../ui/typographs/error-message";
import { PartnerBenefitService } from "../../../services/about/for-partner/partner-benefit-service";
import { BeatLoader, PropagateLoader } from "react-spinners";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

// interface ItemProps {
//   id: number;
//   title: string;
//   description: string;
//   image?: {
//     url: string;
//     filename: string;
//   };
// }

export const PartnerBenefitSection = () => {
  const { form, onSubmit, isLoading, data, deleteItem, selectedItem, setSelectedItem, isPending } = PartnerBenefitService()
  const errorMessage = form.formState.errors
  if (isLoading) return <PropagateLoader className="text-center" />
  return (
    <div className=" bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Header className="text-3xl font-bold text-gray-900 mb-4">
            {selectedItem ? "Update Item" : "Partner Benefit Cards Management"}
          </Header>
          <Paragraph className="text-gray-600">
            Customize and manage your website's Partners Benefit Cards Management section Cards
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
                  label="Showcase Your Feature's Card Headline"
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
                  Card Description
                </label>
                <TextEditor
                  value={form.watch('description') ?? ""}
                  onChange={(content) => {
                    form.setValue("description", content);
                  }}
                />
                {errorMessage.description && <ErrorMessage>{errorMessage.description.message}</ErrorMessage>}
              </div>
              <FileUploadInput
                accept="image/*"
                onChange={(files) => form.setValue('image', files[0].id)}
              // initialFiles={
              //   selectedItem?.image
              //     ? [
              //       {
              //         id: selectedItem.image.id,
              //         url: selectedItem.image.url,
              //         originalName: selectedItem.image.filename,
              //       }
              //     ]
              //     : []
              // }
              />
              {errorMessage.image && <ErrorMessage>{errorMessage.image.message}</ErrorMessage>}

            </div>

            {/* Submit Button */}
            <div className="pt-6">

              <PrimaryButton type="submit" className="w-full text-center">{isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}</PrimaryButton>
            </div>
          </form>
        </div>

        {/* data */}
        <div className="max-w-4xl mx-auto p-4">
          {data?.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-4 mb-4 rounded-lg shadow-md bg-white"
            >
              {/* Left Side: Image */}
              {item.image?.url && (
                <img
                  src={item.image.url}
                  alt={item.image.filename}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />
              )}
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600">{item.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <BsPencilSquare className="mr-1 text-2xl" /> Update
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <MdDelete className="mr-1 text-2xl" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};



import PrimaryButton from "../../../../ui/buttons/primary-button";
import FileUploadInputField from "../../../../ui/input/file-upload-input";
import Header from "../../../../ui/typographs/header/header";
import Paragraph from "../../../../ui/typographs/paragraph";
import { UseGalleryService } from "../../../services/about/for-partner/partner-gallery";
import { UseFileSubmit } from "../../../services/file-upload/file-upload-service";


export const PartnerGallery = () => {
  const { form, onSubmit } = UseGalleryService();
  const { mutate: uploadFiles } = UseFileSubmit();

  const handleFileUpload = (files: any[]) => {
    if (files.length) {
      uploadFiles(files, {
        onSuccess: (response) => {
          form.setValue(
            "image",
            Array.isArray(response) ? response.map((file) => file.id) : [response.id]
          );
        },
        onError: () => {
          console.error("Failed to upload files.");
        },
      });
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <Header className="text-3xl font-bold text-gray-900 mb-4">
          Partner Gallery Section
        </Header>
        <Paragraph className="text-gray-600">
          Customize and manage your website's partner Gallery section
        </Paragraph>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FileUploadInputField
          multiple={true}
          onUploadedFiles={handleFileUpload}
        />
        <PrimaryButton
          type="submit"
          className="w-full mt-4"
        >
          Save Changes
        </PrimaryButton>
      </form>
    </div>
  );
};

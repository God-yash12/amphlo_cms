import { BeatLoader, PropagateLoader } from "react-spinners";
import PrimaryButton from "../../../../ui/buttons/primary-button";
import { FileUploadInput } from "../../../../ui/input/file-upload-input copy";
import Header from "../../../../ui/typographs/header/header";
import Paragraph from "../../../../ui/typographs/paragraph";
import { UseGalleryService } from "../../../services/about/for-partner/partner-gallery";


export const PartnerGallery = () => {
  const { form, onSubmit, isLoading, mutation } = UseGalleryService();

  if (isLoading) return <PropagateLoader className="text-center" />

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
        <FileUploadInput
          multiple={true}
          maxFiles={5}
          accept="image/*"
          onChange={(files) => {
            form.setValue("galleryIds", files.map((file) => file.id));
            }}
        />
        
        <PrimaryButton type="submit" className="w-full text-center">{mutation.isPending ? <div><BeatLoader /></div> : <div>Save Changes</div> }</PrimaryButton>
      </form>
    </div>
  );
};

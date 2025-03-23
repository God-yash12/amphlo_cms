import { BeatLoader } from "react-spinners";
import PrimaryButton from "../../../../ui/buttons/primary-button";
import { FileUploadInput } from "../../../../ui/input/file-upload-input copy";
import Header from "../../../../ui/typographs/header/header";
import Paragraph from "../../../../ui/typographs/paragraph";
import { UseGalleryService } from "../../../services/about/for-partner/partner-gallery";


export const PartnerGallery = () => {
  const { form, onSubmit, data, mutation, handleRemoveImage } = UseGalleryService();


  const galleryData = Array.isArray(data) ? data : data?.data || [];
  const galleryImages = galleryData.flatMap((gallery: { files: any; }) => (
    gallery.files
  ) || []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800">
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 lg:p-8 border-1 border-blue-gray-800 grid lg:grid-cols-3 gap-6">
        {/* Header Section */}
        <div className="col-span-1 max-w-2xl mx-auto text-center mb-12">
          <Header className="text-3xl text-left font-bold text-gray-900 mb-4">
            Partner Gallery Section
          </Header>
          <Paragraph className="text-gray-600 text-left">
            Customize and manage Gallery section, showcase your proud moment from here.
          </Paragraph>
        </div>

        {/* Image Upload Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 col-span-2 bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 ">
          <div className="w-auto space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images *
            </label>
            <FileUploadInput
              multiple={true}
              maxFiles={5}
              accept="image/*"
              onChange={(files) => {
                form.setValue("galleryIds", files.map((file) => file.id));
              }}
            />
          </div>

          <div className="pt-4">
            <PrimaryButton type="submit" className="w-full text-center mt-5">
              {mutation.isPending ? <div><BeatLoader /></div> : <div>Save Changes</div>}
            </PrimaryButton>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.length > 0 ? (
          galleryImages.map((image: any) => {
            console.log(image.id)
            return (
              <div key={image.id} className="relative group">
                <img
                  src={image.url}
                  alt={image.filename}
                  className="w-full h-40 object-cover rounded-lg shadow-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(image.id)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-opacity duration-200"
                  aria-label="Remove image"
                >
                  x
                </button>
              </div>
            )
          })
        ) : (
          <p className="text-center text-gray-500 col-span-full">No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

import { Textarea } from "@material-tailwind/react";
import InputField from "../../../ui/input/input";
import FileUploadInput from "../../../ui/buttons/file-upload";
import { handleFileUpload } from "../../helpers/file-upload-helper";
import PrimaryButton from "../../../ui/buttons/primary-button";
import Header from "../../../ui/typographs/header/header";
import Paragraph from "../../../ui/typographs/paragraph";
import { UseKeyFeatureService } from "../../services/home-service/key-features-service";
import { ErrorMessage } from "../../../ui/typographs/error-message";

const KeyFeatures = () => {

  const { register, handleSubmit, onSubmit, errors, setValue } = UseKeyFeatureService()

  return (
    <div className="bg-gray-50 min-h-screen p-6 flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center mb-8">
        <Header className="text-gray-800">Home Key Features</Header>
        <Paragraph>Customize Key Features Section</Paragraph>
      </div>

      {/* Form Section */}
      <form 
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="flex flex-col lg:flex-row justify-between gap-5 ">
          <InputField
            label="Enter Main Title"
            placeholder="Enter Title"
            className="w-full"
            size="lg"
            {...register("title")}
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
          
          <InputField
            label="Enter Card Title"
            placeholder="Enter Card Title"
            className="w-full"          
            {...register("cardTitle")}
          />
          {errors.cardTitle && <ErrorMessage>{errors.cardTitle.message}</ErrorMessage>}
        </div>

        <Textarea
          label="Enter Key Features Description"
          variant="outlined"
          placeholder="Enter Key Features Description"
          className="w-full"
          {...register("description")}
        />
        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

        <Textarea
          label="Enter Card Description"
          variant="outlined"
          placeholder="Enter Card Description"
          className="w-full"
          {...register("cardDescription")}
        />
        {errors.cardDescription && <ErrorMessage>{errors.cardDescription.message}</ErrorMessage>}

        {/* File Upload */}
        <FileUploadInput
          accept="image/*"
          onChange={(e) => handleFileUpload(e, setValue, 'image')}
          className="w-full"
          
        >
          Upload Card Icons
        </FileUploadInput >
        {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}

        {/* Submit Button */}
        <PrimaryButton type="submit" className="w-full flex justify-center">
          Submit
        </PrimaryButton>
      </form>
    </div>
  );
};

export default KeyFeatures;
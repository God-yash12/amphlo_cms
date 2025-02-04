import { Textarea } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import FileUploadInputField from "../../ui/input/file-upload-input";
import InputField from "../../ui/input/input";

 {/* Render Cards */}
 {cards.map((card, index) => (
    <div key={index} className="flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <InputField
          label="Enter Card Title"
          placeholder="Enter Card Title"
          className="w-full"
          value={card.title}
          onChange={(e) => handleCardChange(index, 'title', e.target.value)}
        />

        <Textarea
          label="Enter Card Description"
          variant="outlined"
          placeholder="Enter Card Description"
          className="w-full"
          value={card.description}
          onChange={(e) => handleCardChange(index, 'description', e.target.value)}
        />

        {/* File Upload */}
        <FileUploadInputField
          onUploadSuccess={(fileId) => handleCardChange(index, 'imageId', fileId)}
        />
        {/* Delete Single Card */}
        <MdDelete
          onClick={() => deleteSingleCard(index)}
          className="cursor-pointer text-4xl text-red-500 hover:text-red-700"
        />
      </div>
    </div>
  ))}

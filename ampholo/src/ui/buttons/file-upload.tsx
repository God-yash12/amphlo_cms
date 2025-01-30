import React, { ChangeEvent, useRef, useState } from "react";
import { ButtonProps } from "@material-tailwind/react";

interface FileUploadInputProps extends Omit<ButtonProps, "onChange"> {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFileUpload?: (fileId: string) => void; 
  accept?: string;
  multiple?: boolean;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({
  onChange,
  accept,
  multiple,
  children,
  ...rest
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const fileNames = files.map((file) => file.name);
      setFileNames(fileNames);
      onChange?.(event); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        {...rest}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleFileClick}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>
        {children}
      </button>
      {fileNames.length > 0 && (
        <div className="mt-4 text-center">
          <p className="font-semibold">Selected Files:</p>
          <ul className="list-disc list-inside">
            {fileNames.map((name, index) => (
              <li key={index} className="text-gray-700">
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploadInput;
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { UseFileSubmit } from '../../components/services/file-upload/file-upload-service';
import { useFormContext } from 'react-hook-form';

interface FileEntry {
  id: number;
  url: string;
  originalName: string;
}

interface FileUploadProps {
  resetOnSuccess?: boolean,
  accept?: string;
  maxFiles?: number;
  maxFileSize?: number;
  onChange: (files: FileEntry[]) => void;
  className?: string;
  multiple?: boolean;
  initialFiles?: FileEntry[];
}

export const FileUploadInput: React.FC<FileUploadProps> = ({
  // accept = '*',
  resetOnSuccess = true,
  maxFiles = 1,
  initialFiles = [],
  multiple,
  maxFileSize = 10 * 1024 * 1024,
  onChange,
  className = '',
}) => {
  const form = useFormContext();

  const [files, setFiles] = useState<FileEntry[]>(initialFiles);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadFile, isPending } = UseFileSubmit();

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (!event.target.files?.length) return;

    const selectedFiles = Array.from(event.target.files);

    if ((selectedFiles.length + files.length) > maxFiles) {
      setUploadError(`You can only upload ${maxFiles} file${maxFiles > 1 ? 's' : ''}.`);
      return;
    }

    // check for file size
    const validFiles = selectedFiles.filter(file => file.size <= maxFileSize);

    if (validFiles.length !== selectedFiles.length) {
      setUploadError(`Some files were filtered due to size or max file limit (max ${maxFileSize / 1024 / 1024}MB per file).`);
      return;
    }

    try {
      const response = await uploadFile(validFiles);

      const updatedFiles: FileEntry[] = [
        ...files,
        ...response
      ];

      setFiles(updatedFiles);

      onChange(updatedFiles);
    } catch (error) {
      console.log(error, "image upload error")
      setUploadError('Failed to upload some files. Please try again.');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  useEffect(() => {
    setFiles(initialFiles);
  }, []);

  // trigger reet file on form ubmit
  useEffect(() => {
    if (form?.formState?.isSubmitSuccessful && resetOnSuccess && !form?.formState?.isSubmitting) {
      form.reset()
      setFiles([]);
    }
  }, [form?.formState?.isSubmitSuccessful])

  return (
    <div className={`space-y-4 ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        // accept={accept}
        multiple={multiple}
        className="hidden"
        disabled={isPending || files.length >= maxFiles}
      // {...form.register('image')}
      />
      <div
        onClick={triggerFileInput}
        className="border-2 border-dashed border-blue-300 hover:border-blue-500 transition-colors duration-300 p-6 rounded-xl text-center group relative"
        role="button"
        tabIndex={0}
        aria-label="Upload files"
      >
        {isPending && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        <div className="flex flex-col items-center space-y-3">
          <Upload className="h-10 w-10 text-blue-500 group-hover:text-blue-600 transition-colors" />
          <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
            Click to upload
          </p>
        </div>
      </div>

      {uploadError && (
        <p className="text-red-500 text-sm">{uploadError}</p>
      )}

      {files.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold text-gray-700">
              {files.length} File{files.length > 1 ? 's' : ''} Selected
            </h4>
            <button
              // onClick={clearAllFiles}
              className="text-red-500 hover:text-red-700 text-sm"
              aria-label="Clear all files"
              disabled={isPending}
            >
              Clear All
            </button>
          </div>
          <ul className="space-y-2">
            {files.map((fileEntry, index) => (
              <li
                key={`${fileEntry.originalName}-${index}`}
                className="flex items-center justify-between bg-white shadow-sm rounded-md p-3 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={fileEntry.url}
                    alt={fileEntry.originalName}
                    className="w-10 h-10 rounded-md"
                  />
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px]">
                      {fileEntry.originalName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {/* {(fileEntry.file.size / 1024).toFixed(1)} KB •{' '} */}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 bg-red-50 rounded-full p-1 hover:bg-red-100 transition-colors"
                  aria-label="Remove file"
                  disabled={isPending}
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

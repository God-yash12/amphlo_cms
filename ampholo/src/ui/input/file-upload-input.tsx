import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { UseFileSubmit } from '../../components/services/file-upload/file-upload-service';

interface FileEntry {
  file: File;
  id?: number;
  url?: string;
  previewUrl: string;
  status: 'pending' | 'success' | 'error';
}

interface FileUploadProps {
  accept?: string;
  maxFiles?: number;
  maxFileSize?: number;
  onFileChange?: (files: File[]) => void;
  onUploadSuccess?: (fileId: number) => void;
  onUploadedFiles?: (files: FileEntry[]) => void;
  className?: string;
  multiple?: boolean;
}

const getFileIcon = (fileEntry: FileEntry) => {
  const { file, url, previewUrl } = fileEntry;
  const type = file.type;

  if (url) {
    return (
      <img
        src={url}
        alt="Uploaded preview"
        className="h-12 w-12 object-cover rounded-md"
      />
    );
  }

  if (type.startsWith('image/')) {
    return (
      <img
        src={previewUrl}
        alt="Local preview"
        className="h-12 w-12 object-cover rounded-md"
      />
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6 text-blue-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
};

const FileUploadInputField: React.FC<FileUploadProps> = ({
  accept = '*',
  maxFiles = 5,
  multiple,
  maxFileSize = 10 * 1024 * 1024,
  onFileChange,
  onUploadSuccess,
  onUploadedFiles,
  className = '',
}) => {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadFile, isPending } = UseFileSubmit();
  const resolvedMaxFiles = multiple ? maxFiles : 1;

  useEffect(() => {
    return () => {
      // Cleanup object URLs
      files.forEach((fileEntry) => {
        if (fileEntry.previewUrl) {
          URL.revokeObjectURL(fileEntry.previewUrl);
        }
      });
    };
  }, [files]);

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (!event.target.files?.[0]) return;

    const selectedFiles = Array.from(event.target.files);
    const validFiles = selectedFiles
      .filter((file) => file.size <= maxFileSize)
      .slice(0, resolvedMaxFiles - files.length);

    if (validFiles.length !== selectedFiles.length) {
      setUploadError(
        `Some files were filtered due to size or max file limit (max ${resolvedMaxFiles} files).`
      );
    }

    const newFiles: FileEntry[] = validFiles.map((file) => ({
      file,
      previewUrl: file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : '',
      status: 'pending',
    }));

    setFiles((prev) => {
      const updatedFiles = [...prev, ...newFiles];
      onFileChange?.(updatedFiles.map((f) => f.file));
      onUploadedFiles?.(updatedFiles);
      return updatedFiles;
    });

    try {
      await Promise.all(
        newFiles.map(async (fileEntry) => {
          try {
            const response = await uploadFile(fileEntry.file);
            setFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.file === fileEntry.file
                  ? {
                      ...f,
                      id: response.id,
                      url: response.url,
                      status: 'success',
                    }
                  : f
              )
            );
            onUploadSuccess?.(response.id);
          } catch (error) {
            setFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.file === fileEntry.file ? { ...f, status: 'error' } : f
              )
            );
            throw error;
          }
        })
      );
    } catch (error) {
      setUploadError('Failed to upload some files. Please try again.');
    }
  };

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    if (fileToRemove.previewUrl) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFileChange?.(updatedFiles.map((f) => f.file));
    onUploadedFiles?.(updatedFiles);
  };

  const clearAllFiles = () => {
    files.forEach((fileEntry) => {
      if (fileEntry.previewUrl) {
        URL.revokeObjectURL(fileEntry.previewUrl);
      }
    });
    setFiles([]);
    onFileChange?.([]);
    onUploadedFiles?.([]);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />
      <div
        onClick={triggerFileInput}
        className="cursor-pointer border-2 border-dashed border-blue-300 hover:border-blue-500 transition-colors duration-300 p-6 rounded-xl text-center group relative"
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
          <span className="text-xs text-gray-500">
            Max {resolvedMaxFiles} file{resolvedMaxFiles > 1 ? 's' : ''} •{' '}
            {maxFileSize / 1024 / 1024}MB per file
          </span>
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
              onClick={clearAllFiles}
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
                key={`${fileEntry.file.name}-${index}`}
                className="flex items-center justify-between bg-white shadow-sm rounded-md p-3 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(fileEntry)}
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px]">
                      {fileEntry.file.name}
                      {fileEntry.status === 'error' && (
                        <span className="text-red-500 ml-2">(Failed)</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(fileEntry.file.size / 1024).toFixed(1)} KB •{' '}
                      {fileEntry.status}
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

export default FileUploadInputField;
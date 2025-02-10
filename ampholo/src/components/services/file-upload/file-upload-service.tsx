import { useMutation } from "@tanstack/react-query";
import { UseAxiosPrivate } from "../../../auth/home_auth";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface FileUploadResponse {
  id: number;
  url: string;
}

export const UseFileSubmit = () => {
  const axiosPrivate = UseAxiosPrivate();

  return useMutation<FileUploadResponse, AxiosError, File | File[]>({
    mutationFn: async (input: File | File[]) => {
      const formData = new FormData();

      if (Array.isArray(input)) {
        // Handle multiple files
        input.forEach((file, index) => {
          formData.append(`images[${index}]`, file);
        });
      } else {
        // Handle single file
        formData.append("image", input);
      }

      const response = await axiosPrivate.post<FileUploadResponse>(
        "/file-upload",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    },
    onError: (error) => {
      const message = (error.response?.data as { message?: string })?.message || error.message;
      toast.error(`File upload failed: ${message}`);
    }

  });
};
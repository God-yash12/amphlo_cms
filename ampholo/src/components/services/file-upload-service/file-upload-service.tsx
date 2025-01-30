import { useMutation } from "@tanstack/react-query";
import { UseAxiosPrivate } from "../../../auth/home_auth";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface FileUploadResponse {
  id: number;
}

export const UseFileSubmit = () => {
  const axiosPrivate = UseAxiosPrivate();

  return useMutation<FileUploadResponse, AxiosError, File>({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);

     const response = await axiosPrivate.post<FileUploadResponse>("/file-upload", formData);
      return response.data;
    },
    onError: (error) => {
      const message = error.response?.data?.message || error.message;
      toast.error(`File upload failed: ${message}`);
    }
  });
};
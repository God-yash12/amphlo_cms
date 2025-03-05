import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../auth/home_auth";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface FileUploadResponse {
  id: number;
  url: string;
  originalName: string;
}

export const UseFileSubmit = () => {
  const axiosPrivate = useAxios();

  return useMutation<FileUploadResponse[], AxiosError, File[]>({
    mutationFn: async (input: File[]) => {

      const formData = new FormData();
      input.forEach((file) => {
        formData.append(`files`, file);
      });

      const apiUrl = import.meta.env.VITE_BASE_URL;
      if (!apiUrl) {
        console.error("API URL is not defined in environment variables");
        throw new Error("API configuration error");
      }
      console.log("Attempting upload to:", `${apiUrl}/file-upload`);

      const response = await axiosPrivate.post<FileUploadResponse[]>(`file-upload/`, 
        formData,
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              console.log(`Upload progress: ${percentCompleted}%`);
            }
        }
      }
      );
      return response.data;
    },
    onSuccess: () => {
      console.log("File Uploaded")
    },
    onError: (error: any) => {
      console.error("Upload failed with error:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);
      console.error("Request details:", error.config);
      
      let message = "File upload failed";
      
      if (error.code === 'ERR_NETWORK') {
        message = "Network error. The server may be unreachable or the API URL may be incorrect.";
      } else if (error.response) {
        // Server responded with an error
        if (error.response.status === 401 || error.response.status === 403) {
          message = "Authentication error. You may need to log in again.";
        } else if (error.response.status === 413) {
          message = "The file is too large for the server to accept.";
        } else if (error.response.status >= 500) {
          message = "Server error. Please try again later.";
        } else {
          message = error.response.data?.message || `Error ${error.response.status}: ${error.message}`;
        }
      } else if (error.request) {
        // Request was made but no response received
        message = "No response from server. Please check your connection and try again.";
      }
      
      toast.error(message);
    }

  });
};
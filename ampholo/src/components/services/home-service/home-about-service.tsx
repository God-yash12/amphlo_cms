import { useForm } from "react-hook-form"
import { UseAxiosPrivate } from "../../../auth/home_auth";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { HomeAboutValidation } from "../../validations/home-about-validation";


interface HomeAboutProps {
  title: string;
  mainTitle?: string;
  description: string;
  listTitle?: string;
  listItem?: string[];
  imageId?: number;
}

export const UseHomrAboutServices = () => {
  const axiosPrivate = UseAxiosPrivate()
  const [editorContent, setEditorContent] = useState("");
  const [showInput, setShowInput] = useState<string[]>([]);
  const [fileUploads, setFileUploads] = useState<File[]>([]);

  // Add a new input field
  const showInputOnClick = () => {
    setShowInput([...showInput, ""]);

  };

  // Delete a specific input field and its associated file upload
  const deleteListInput = (index: number) => {
    const updatedInputs = showInput.filter((_, i) => i !== index);
    const updatedFiles = fileUploads.filter((_, i) => i !== index);
    setShowInput(updatedInputs);
    setFileUploads(updatedFiles);
  };

  // Delete all input fields and file uploads
  const deleteListInputs = () => {
    setShowInput([]);
  };

  // Handle input field changes
  const handleInputChange = (index: number, value: string) => {
    const updatedInputs = [...showInput];
    updatedInputs[index] = value;
    setShowInput(updatedInputs);
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(HomeAboutValidation),
    defaultValues: {
      title: "",
      mainTitle: "",
      description: "",
      listTitle: "",
      listItems: [],
      image: 0
    }
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: HomeAboutProps) => {
      const response = await axiosPrivate.patch('home-about', data)
      return response;
    },
    onSuccess: () => {
      toast.success('About customized successful')
    },
    onError: (error: any) => {
      toast.error(`Failed to customize About Page`, error.message)
    }
  })

  const onSubmit = async (data: HomeAboutProps) => {
    const payload = {
      ...data,
      listItem: showInput.filter((item) => item.trim() !== ""), 
    };
    await mutateAsync(payload);
  };

  return {
    register,
    handleSubmit,
    setValue,
    reset,
    errors,
    onSubmit,
    deleteListInput,
    deleteListInputs,
    handleInputChange,
    editorContent,
    setEditorContent,
    showInputOnClick,
    showInput,
    setShowInput,
    fileUploads,
  }
}
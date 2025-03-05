
import { UseFormSetValue } from "react-hook-form";

export const handleFileUpload = <T extends Record<string, any>>(
  event: React.ChangeEvent<HTMLInputElement>,
  setValue: UseFormSetValue<T>,
  fieldName: keyof T,
  options?: { 
    multiple?: boolean; 
    shouldValidate?: boolean; 
    shouldDirty?: boolean 
  }
) => {
  const { 
    multiple = false, 
    shouldValidate = true, 
    shouldDirty = true 
  } = options || {};

  if (event.target.files && event.target.files.length > 0) {
    if (multiple) {
      // Handle multiple file upload
      const files = Array.from(event.target.files); 
      {/* @ts-ignore */}
      setValue(fieldName, files as any, {
        shouldValidate,
        shouldDirty,
      });
    } else {
      // Handle single file upload
      const file = event.target.files[0];
      {/* @ts-ignore */}
      setValue(fieldName, file as any, {
        shouldValidate,
        shouldDirty,
      });
    }
  }
};


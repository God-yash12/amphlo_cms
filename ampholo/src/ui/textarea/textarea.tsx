import { Textarea, TextareaProps } from "@material-tailwind/react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface CustomTextareaProps extends Omit<TextareaProps, "error"> {
  label?: string;
  required?: boolean;
  errorMessage?: string;
  className?: string;
}

export const TextareaField = forwardRef<HTMLDivElement, CustomTextareaProps>(
  ({ label, required = false, placeholder = "Enter text...", className, errorMessage, onChange, ...rest }, ref) => {
    return (
      <div>
        {/* @ts-ignore */}
        <Textarea
          label={label}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
          className={twMerge(
            errorMessage ? "border-red-500 focus:border-red-500" : "",
            className
          )}
          size="lg"
          containerProps={{ ref }}
          {...rest}
        />

        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);

TextareaField.displayName = 'TextareaField';
import { forwardRef } from 'react';
import { Input, InputProps } from '@material-tailwind/react';
import { twMerge } from 'tailwind-merge';


interface CustomInputProps extends Omit<InputProps, 'crossOrigin'> {
    label?: string;
    required?: boolean;
    className?: string;
}

const InputField = forwardRef<HTMLInputElement, CustomInputProps>(
    ({ label, required, className, placeholder, type, variant, ...rest }, ref) => {
        const baseClass = "w-auto";
        return (
            <div>
                {/* @ts-ignore */}
                <Input
                    ref={ref}
                    label={label}
                    type={type}
                    variant={variant || "outlined"}
                    className={twMerge(baseClass, className)}
                    required={required}
                    placeholder={placeholder}
                    {...rest}
                />
            </div>
        );
    }
);

export default InputField;
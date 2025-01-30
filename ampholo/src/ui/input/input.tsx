import { forwardRef } from 'react';
import { Input, InputProps } from '@material-tailwind/react';
import { twMerge } from 'tailwind-merge';


interface CustomInputProps extends Omit<InputProps, 'crossOrigin'> {
    label?: string;
    required?: boolean;
    className?: string;
}

const InputField = forwardRef<HTMLInputElement, CustomInputProps>(
    ({ label, required, className, placeholder, variant, ...rest }, ref) => {
        const baseClass = "w-80 lg:w-96 md:lg:96 h-[48px]";
        return (
            <div>
                <Input
                    ref={ref}
                    label={label}
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
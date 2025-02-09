import { Button, ButtonProps } from "@material-tailwind/react";
import React from "react";
import { twMerge } from "tailwind-merge";

const SecondaryButton: React.FC<ButtonProps> = ({ children, className, size, ...rest }) => {
  const baseClass = "w-auto rounded-full"
  return (
    <div>
      {/* @ts-ignore */}
      <Button
        variant="outlined"
        className={twMerge(baseClass, className)}
        size={size || "md"}
        {...rest}
      >
        {children}
      </Button>
    </div>
  );
};

export default SecondaryButton;
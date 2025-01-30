import { Button, ButtonProps } from "@material-tailwind/react";
import React from "react";
import { twMerge } from "tailwind-merge";

const PrimaryButton: React.FC<ButtonProps> = ({ type, children, className, ...rest }) => {

  const baseClass = "w-44 rounded-full"

  return (
    <Button
    type={type}
      variant="gradient" 
      className={twMerge(baseClass, className)}
      {...rest} 
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
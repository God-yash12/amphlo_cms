import { Button, ButtonProps } from "@material-tailwind/react";
import React from "react";
import { twMerge } from "tailwind-merge";

const PrimaryButton: React.FC<ButtonProps> = ({ type, children, className, ...rest }) => {

  const baseClass = "w-44 rounded-full"

  return (
    <div>
      {/* @ts-ignore */}
      <Button
        type={type}
        variant="gradient"
        className={twMerge(baseClass, className)}
        {...rest}
      >
        {children}
      </Button>
    </div>
  );
};

export default PrimaryButton;
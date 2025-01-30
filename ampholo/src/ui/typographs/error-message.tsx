import React from "react";
import { twMerge } from "tailwind-merge";

interface ErrorMessageProps {
    children?: string; 
  className?: string; 
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, className }) => {
  if (!children) return null; 

  return (
    <p className={twMerge(`text-red-500 text-sm mt-1 ${className}`)}>
      {children}
    </p>
  );
};


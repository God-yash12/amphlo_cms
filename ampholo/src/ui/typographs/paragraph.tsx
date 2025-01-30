import React from "react";
import { twMerge } from "tailwind-merge";

interface HeaderProp {
    children: React.ReactNode;
    className?: string; 
    
}


const Paragraph: React.FC<HeaderProp> = ({children, className}) => {
   const baseClass = "text-sm lg:text-md text-gray-500 text-center"
  return (
    <div className={twMerge(baseClass, className)}>
      {children}
    </div>
  )
}

export default Paragraph

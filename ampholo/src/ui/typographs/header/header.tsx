import React from "react";
import { twMerge } from 'tailwind-merge';

interface HeaderProp {
    children: React.ReactNode;
    className?: string; 
}

const Header: React.FC<HeaderProp> = ({ children, className }) => {
    const baseClass = "text-xl lg:text-3xl text-gray-800 leading-5 tracking-wide font-bold font-poppins";

    return (
        <div className={twMerge(baseClass, className)}>
            {children}
        </div>
    );
};

export default Header;
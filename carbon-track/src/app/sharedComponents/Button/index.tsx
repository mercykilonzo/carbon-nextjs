import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => (
  <button
    className={`bg-[#F79B72] text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-[#c76c4c] transition-colors cursor-pointer ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
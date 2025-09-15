import React from "react";

interface SuccessToastProps {
  message: string;
  type?: "success" | "error";
}

const SuccessToast: React.FC<SuccessToastProps> = ({
  message,
  type = "success",
}) => {
  const baseStyle =
    "fixed top-6 right-6 px-6 py-3 rounded-lg z-50 min-w-[220px] font-bold text-center shadow-lg transition";
  const successStyle =
    "bg-[#2A4759] text-white dark:bg-[#F8B88F] dark:text-[#2A4759]";
  const errorStyle =
    "bg-red-600 text-white dark:bg-red-800 dark:text-[#F8B88F]";
  return (
    <div className={`${baseStyle} ${type === "success" ? successStyle : errorStyle}`}>
      {message}
    </div>
  );
};

export default SuccessToast;
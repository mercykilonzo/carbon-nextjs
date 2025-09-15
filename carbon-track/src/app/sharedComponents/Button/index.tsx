// import React from "react";

// type ButtonVariant = "primary" | "secondary" | "create" | "save" | "default";

// const buttonVariants: Record<ButtonVariant, string> = {
//   primary:
//     "bg-[#2A4759] text-white font-bold hover:bg-[#F79B72] transition-colors dark:bg-[#F8B88F] dark:text-[#2A4759] dark:hover:bg-[#F79B72]",
//   secondary:
//     "w-full p-3 bg-[#F79B72] text-white rounded-md font-bold mt-2 hover:bg-[#F8B88F] transition disabled:opacity-60 drop-shadow-lg dark:bg-[#2A4759] dark:text-white dark:hover:bg-[#F8B88F]",
//   create:
//     "bg-[#2A4759] p-4 text-white font-bold text-[20px] hover:bg-[#F79B72] transition-colors flex items-center gap-2 dark:bg-[#F8B88F] dark:text-[#2A4759] dark:hover:bg-[#F79B72]",
//   save:
//     "bg-[#F79B72] text-white font-bold hover:bg-[#2A4759] transition-colors dark:bg-[#2A4759] dark:text-white dark:hover:bg-[#F79B72]",
//   default:
//     "bg-[#F79B72] text-white dark:bg-[#2A4759] dark:text-white",
// };

// export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   buttonText: string;
//   variant: ButtonVariant;
//   onclickHandler?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
//   icon?: React.ReactNode;
//   type?: "button" | "submit" | "reset";
//   disabled?: boolean;
//   className?: string;
// }

// const Button: React.FC<ButtonProps> = ({
//   buttonText,
//   variant,
//   onclickHandler,
//   icon,
//   type = "button",
//   disabled = false,
//   className = "",
//   ...props
// }) => {
//   const variantStyle = buttonVariants[variant] || buttonVariants.default;
//   return (
//     <button
//       className={`${variantStyle} px-[12px] rounded-md border-none cursor-pointer ${className}`}
//       onClick={onclickHandler}
//       type={type}
//       disabled={disabled}
//       {...props}
//     >
//       {icon && <span className="mr-2">{icon}</span>}
//       {buttonText}
//     </button>
//   );
// };

// export default Button;

import React from "react";

type ButtonVariant = "primary" | "secondary" | "create" | "save" | "default";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#2A4759] text-white font-bold hover:bg-[#F79B72] transition-colors dark:bg-[#F8B88F] dark:text-[#2A4759] dark:hover:bg-[#F79B72]",
  secondary:
    "w-full p-3 bg-[#F79B72] text-white rounded-md font-bold mt-2 hover:bg-[#F8B88F] transition disabled:opacity-60 drop-shadow-lg dark:bg-[#2A4759] dark:text-white dark:hover:bg-[#F8B88F]",
  create:
    "bg-[#2A4759] p-4 text-white font-bold text-[20px] hover:bg-[#F79B72] transition-colors flex items-center gap-2 dark:bg-[#F8B88F] dark:text-[#2A4759] dark:hover:bg-[#F79B72]",
  save:
    "bg-[#F79B72] text-white font-bold hover:bg-[#2A4759] transition-colors dark:bg-[#2A4759] dark:text-white dark:hover:bg-[#F79B72]",
  default:
    "bg-[#F79B72] text-white dark:bg-[#2A4759] dark:text-white",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText: string;
  variant: ButtonVariant;
  onclickHandler?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  buttonText,
  variant,
  onclickHandler,
  icon,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) => {
  const variantStyle = buttonVariants[variant] || buttonVariants.default;
  return (
    <button
      className={`${variantStyle} px-[12px] rounded-md border-none cursor-pointer ${className}`}
      onClick={onclickHandler}
      type={type}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {buttonText}
    </button>
  );
};

export default Button;
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50";
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    outline:
      "bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-100 focus:ring-gray-500",
  };
  return (
    <button
      {...props}
      className={`${baseStyles} ${variantStyles[variant]} ${props.className}`}
    >
      {children}
    </button>
  );
};

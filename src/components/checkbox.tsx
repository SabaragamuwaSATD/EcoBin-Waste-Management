import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  return (
    <input
      type="checkbox"
      {...props}
      className={`form-checkbox h-5 w-5 text-blue-600 ${props.className}`}
    />
  );
};

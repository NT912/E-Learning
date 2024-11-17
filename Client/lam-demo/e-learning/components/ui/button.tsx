import React from "react";

interface ButtonProps {
  label: string; 
  onClick?: () => void; 
  type?: "button" | "submit" | "reset"; 
  variant?: "primary" | "secondary" | "danger"; 
  disabled?: boolean;
  className?: string; 
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) => {
  // Định nghĩa các kiểu nút
  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case "primary":
        return "bg-blue-500 text-white hover:bg-blue-600";
      case "secondary":
        return "bg-gray-500 text-white hover:bg-gray-600";
      case "danger":
        return "bg-red-500 text-white hover:bg-red-600";
      default:
        return "bg-blue-500 text-white hover:bg-blue-600";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md transition-all duration-200 ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : getVariantClasses(variant)
      } ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;

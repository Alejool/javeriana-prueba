import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "glass";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  icon,
  iconPosition = "left",
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-600 active:bg-primary-600 shadow-sm hover:shadow-md dark:bg-primary-500 dark:hover:bg-primary-600",
    secondary:
      "bg-secondary-600 text-neutral-900 hover:bg-secondary-600  active:bg-secondary-700 shadow-sm hover:shadow-md dark:bg-secondary-400 dark:hover:bg-secondary-500",
    outline:
      "border border-primary text-primary hover:bg-primary-50 dark:hover:bg-gray-900 active:bg-primary-100 dark:border-primary-300 dark:text-primary-300 dark:hover:bg-primary-950/30",
    ghost:
      "text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700",
    danger:
      "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm hover:shadow-md dark:bg-red-500 dark:hover:bg-red-600",
    glass:
      "bg-white/10 dark:bg-black/20 text-white hover:bg-white/20 dark:hover:bg-black/30 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary-500/50",
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2.5',
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && icon && iconPosition === "left" && (
        <span className="flex items-center justify-center">{icon}</span>
      )}
      {children}
      {!isLoading && icon && iconPosition === "right" && (
        <span className="flex items-center justify-center">{icon}</span>
      )}
    </button>
  );
};

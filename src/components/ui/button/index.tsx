import { cn } from "@/utils/cn";
import React from 'react';

// Define available variants and sizes for consistent usage across components
type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

// Extend native button attributes to inherit standard props (type, onClick, etc.)
interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export default function CustomButton({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading,
  disabled,
  ...props 
}: Readonly<CustomButtonProps>) {
    
  // Unified base styles for every button
  const baseStyles = "cursor-pointer inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Color configuration based on theme variables defined in tailwind.config.js
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover shadow-md",
    secondary: "bg-soft-bg text-foreground border border-border hover:bg-background shadow-sm",
    danger: "bg-secondary text-white hover:opacity-90 shadow-md",
    ghost: "bg-transparent text-foreground hover:bg-background"
  };

  // Dimensional configuration to ensure consistent sizing across the UI
  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-sm",
    md: "px-5 py-2.5 text-sm rounded-md",
    lg: "px-7 py-3 text-base rounded-lg"
  };

  return (
    <button
      disabled={disabled || isLoading}
      // Use cn utility to merge and override classes dynamically
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 animate-spin">🌀</span> // loading
      ) : null}
      {children}
    </button>
  );
}

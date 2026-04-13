import React from "react";

// Define badge variants for different status levels
type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

// Standard Badge props extending native div attributes
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function Badge({
  variant = "default",
  children,
  className = "",
  size = "md",
  ...props
}: Readonly<BadgeProps>) {
  // Base styling for a compact, rounded label
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors duration-200 uppercase"; // transition-colors duration-200 is for smooth transition when changing variant

  // Semantic color mapping based on status
  const variants = {
    default: "bg-background text-foreground border border-border",
    success: "bg-green-100 text-green-800 border border-green-200",
    warning: "bg-amber-100 text-amber-800 border border-amber-200",
    danger:
      "bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-20",
    info: "bg-primary bg-opacity-10 text-primary border border-primary border-opacity-20",
  };

  const sizes = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-2.5 py-0.5",
    lg: "text-base px-3 py-1",
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

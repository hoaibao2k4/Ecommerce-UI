import React from "react";

type InputSize = "sm" | "md" | "lg";

interface CustomInputProps {
  label?: string;
  error?: string;
  isLoading?: boolean;
  size?: InputSize;
  as?: "input" | "textarea";
  rows?: number;
}

type InputOrTextareaProps = CustomInputProps &
  (
    | (React.InputHTMLAttributes<HTMLInputElement> & { as?: "input" })
    | (React.TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" })
  );

const CustomInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputOrTextareaProps
>(
  (
    {
      label,
      error,
      isLoading,
      size = "md",
      className = "",
      as = "input",
      ...props
    },
    ref,
  ) => {
    const sizes = {
      sm: "px-3 py-2 text-xs rounded-sm",
      md: "px-4 py-2.5 text-sm rounded-md",
      lg: "px-5 py-3.5 text-base rounded-lg",
    };

    const commonClasses = `
    w-full bg-soft-bg border text-foreground 
    placeholder:text-muted focus:ring-2 focus:ring-primary focus:border-transparent 
    transition-all duration-200 outline-none
    ${sizes[size as keyof typeof sizes]}
    ${error ? "border-secondary focus:ring-secondary" : "border-border"} 
    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-foreground transition-all duration-200"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {as === "textarea" ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={`${commonClasses} resize-none`}
              disabled={isLoading || props.disabled}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              className={commonClasses}
              disabled={isLoading || props.disabled}
              {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            />
          )}

          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-primary">
              🌀
            </div>
          )}
        </div>

        {error && (
          <p className="text-[11px] font-medium text-secondary animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";

export default CustomInput;

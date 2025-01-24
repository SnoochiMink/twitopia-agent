import * as React from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-lg group bg-gradient-to-br from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 ease-out transform hover:scale-105",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
GradientButton.displayName = "GradientButton";

export { GradientButton };

import React from "react";
import { cn } from "@/lib/utils";

interface StepContainerProps {
  children: React.ReactNode;
  className?: string;
  isVisible: boolean;
  animate?: "slide" | "fade" | "scale";
}

export const StepContainer = ({
  children,
  className,
  isVisible,
  animate = "fade",
}: StepContainerProps) => {
  const animationClasses = {
    slide: isVisible ? "animate-slide-in" : "animate-slide-out",
    fade: isVisible ? "animate-fade-in" : "animate-fade-out",
    scale: isVisible ? "animate-scale-in" : "opacity-0 scale-95",
  };

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out absolute top-0 left-0 w-full",
        animationClasses[animate],
        !isVisible && "pointer-events-none",
        className
      )}
      style={{
        opacity: isVisible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};

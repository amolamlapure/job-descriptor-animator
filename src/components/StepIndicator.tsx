
import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type StepStatus = "upcoming" | "active" | "completed";

interface StepIndicatorProps {
  step: number;
  status: StepStatus;
  label: string;
  isLastStep?: boolean;
}

export const StepIndicator = ({
  step,
  status,
  label,
  isLastStep = false,
}: StepIndicatorProps) => {
  return (
    <div className="flex flex-col items-center relative">
      <div
        className={cn("step-indicator", {
          active: status === "active",
          completed: status === "completed",
        })}
      >
        {status === "completed" ? (
          <Check className="h-4 w-4" />
        ) : (
          <span>{step}</span>
        )}
      </div>
      {!isLastStep && (
        <div
          className={cn("step-connector", {
            active: status === "active" || status === "completed",
          })}
        ></div>
      )}
      <span
        className={cn(
          "text-xs mt-2 text-muted-foreground transition-colors duration-200",
          {
            "text-foreground font-medium": status === "active",
            "text-foreground/80": status === "completed",
          }
        )}
      >
        {label}
      </span>
    </div>
  );
};


import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  isNextDisabled?: boolean;
  isPreviousHidden?: boolean;
  nextLabel?: string;
}

export const StepNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isNextDisabled = false,
  isPreviousHidden = false,
  nextLabel = "Next",
}: StepNavigationProps) => {
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between items-center pt-8 mt-4">
      <Button
        variant="ghost"
        onClick={onPrevious}
        className={cn(
          "gap-2 transition-all duration-300",
          isPreviousHidden && "opacity-0 pointer-events-none"
        )}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </Button>
      <Button
        onClick={onNext}
        disabled={isNextDisabled}
        className="gap-2 min-w-[100px] shadow-sm transition-all duration-200 hover:shadow"
      >
        <span>{isLastStep ? "Generate" : nextLabel}</span>
        {!isLastStep && <ArrowRight className="h-4 w-4" />}
      </Button>
    </div>
  );
};

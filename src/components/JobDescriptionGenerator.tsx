
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { StepIndicator } from "@/components/StepIndicator";
import { StepNavigation } from "@/components/StepNavigation";
import { StepContainer } from "@/components/StepContainer";
import { JobTitleStep } from "@/components/JobTitleStep";
import { SkillsStep } from "@/components/SkillsStep";
import { AdditionalInfoStep } from "@/components/AdditionalInfoStep";
import { CompanyInfoStep } from "@/components/CompanyInfoStep";
import { JobDescriptionResult } from "@/components/JobDescriptionResult";
import { useJobForm } from "@/context/JobFormContext";
import { useState as useAnimationState } from "react";

export const JobDescriptionGenerator = () => {
  const { 
    currentStep,
    setCurrentStep,
    formData,
    generateDescription,
  } = useJobForm();
  
  const [animatingStep, setAnimatingStep] = useAnimationState(currentStep);
  const [animationDirection, setAnimationDirection] = useAnimationState<"forward" | "backward">("forward");
  
  const isNextDisabled = (step: number) => {
    switch (step) {
      case 1:
        return !formData.jobTitle.trim();
      case 2:
        return formData.selectedSkills.length === 0;
      case 3:
        return false;
      case 4:
        return !formData.companyInfo.name.trim() || !formData.companyInfo.location.trim();
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setAnimationDirection("forward");
      
      if (currentStep === 4) {
        generateDescription();
      }
      
      // Small delay to allow animation to complete
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setAnimatingStep(currentStep + 1);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setAnimationDirection("backward");
      
      // Small delay to allow animation to complete
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setAnimatingStep(currentStep - 1);
      }, 300);
    }
  };

  const getStepStatus = (step: number) => {
    if (step < currentStep) return "completed";
    if (step === currentStep) return "active";
    return "upcoming";
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <Card className="glass-card overflow-hidden rounded-xl shadow-lg border-0 p-6 md:p-8">
        <div className="flex justify-between mb-8 relative">
          {[1, 2, 3, 4, 5].map((step) => (
            <StepIndicator
              key={step}
              step={step}
              status={getStepStatus(step)}
              label={
                step === 1
                  ? "Job Title"
                  : step === 2
                  ? "Skills"
                  : step === 3
                  ? "Additional Info"
                  : step === 4
                  ? "Company Info"
                  : "Result"
              }
              isLastStep={step === 5}
            />
          ))}
        </div>
        
        <div className="relative min-h-[400px] py-4">
          <StepContainer 
            isVisible={currentStep === 1} 
            animate={animationDirection === "forward" ? "slide" : "slide"}
          >
            <JobTitleStep />
          </StepContainer>
          
          <StepContainer 
            isVisible={currentStep === 2} 
            animate={animationDirection === "forward" ? "slide" : "slide"}
          >
            <SkillsStep />
          </StepContainer>
          
          <StepContainer 
            isVisible={currentStep === 3} 
            animate={animationDirection === "forward" ? "slide" : "slide"}
          >
            <AdditionalInfoStep />
          </StepContainer>
          
          <StepContainer 
            isVisible={currentStep === 4} 
            animate={animationDirection === "forward" ? "slide" : "slide"}
          >
            <CompanyInfoStep />
          </StepContainer>
          
          <StepContainer 
            isVisible={currentStep === 5} 
            animate="scale"
          >
            <JobDescriptionResult />
          </StepContainer>
        </div>
        
        <StepNavigation
          currentStep={currentStep}
          totalSteps={5}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isNextDisabled={isNextDisabled(currentStep)}
          isPreviousHidden={currentStep === 1}
        />
      </Card>
    </div>
  );
};


import React, { createContext, useContext, useState } from "react";
import { JobFormData, initialFormData, Skill } from "@/types/jobForm";
import { useJobFormActions } from "@/hooks/useJobFormActions";

interface JobFormContextType {
  currentStep: number;
  formData: JobFormData;
  generatedDescription: string;
  isGenerating: boolean;
  setCurrentStep: (step: number) => void;
  updateJobTitle: (title: string) => void;
  updateExperienceRange: (experience: string) => void;
  updateSuggestedSkills: (title: string) => void;
  toggleSkill: (skillId: string) => void;
  updateAdditionalInfo: (info: string) => void;
  updateCompanyInfo: (field: keyof JobFormData["companyInfo"], value: string) => void;
  generateDescription: () => void;
}

const JobFormContext = createContext<JobFormContextType | undefined>(undefined);

export const useJobForm = () => {
  const context = useContext(JobFormContext);
  if (!context) {
    throw new Error("useJobForm must be used within a JobFormProvider");
  }
  return context;
};

interface JobFormProviderProps {
  children: React.ReactNode;
}

export const JobFormProvider = ({ children }: JobFormProviderProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<JobFormData>(initialFormData);
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    updateJobTitle,
    updateExperienceRange,
    updateSuggestedSkills,
    toggleSkill,
    updateAdditionalInfo,
    updateCompanyInfo,
    generateDescription
  } = useJobFormActions(formData, setFormData, setGeneratedDescription, setIsGenerating);

  const value = {
    currentStep,
    formData,
    generatedDescription,
    isGenerating,
    setCurrentStep,
    updateJobTitle,
    updateExperienceRange,
    updateSuggestedSkills,
    toggleSkill,
    updateAdditionalInfo,
    updateCompanyInfo,
    generateDescription,
  };

  return <JobFormContext.Provider value={value}>{children}</JobFormContext.Provider>;
};


import { useCallback } from "react";
import { JobFormData, Skill } from "@/types/jobForm";
import { jobSkillsMap } from "@/data/jobSkillsData";

export function useJobFormActions(
  formData: JobFormData,
  setFormData: React.Dispatch<React.SetStateAction<JobFormData>>,
  setGeneratedDescription: React.Dispatch<React.SetStateAction<string>>,
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>
) {
  const updateJobTitle = useCallback((title: string) => {
    setFormData((prev) => ({
      ...prev,
      jobTitle: title,
    }));
  }, [setFormData]);

  const updateExperienceRange = useCallback((experience: string) => {
    setFormData((prev) => ({
      ...prev,
      experienceRange: experience,
    }));
  }, [setFormData]);

  const updateSuggestedSkills = useCallback((title: string) => {
    const normalizedTitle = title.trim();
    
    // Find the closest matching title in our map
    const matchingTitle = Object.keys(jobSkillsMap).find(
      (key) => key.toLowerCase() === normalizedTitle.toLowerCase()
    ) || Object.keys(jobSkillsMap).find(
      (key) => key.toLowerCase().includes(normalizedTitle.toLowerCase())
    );
    
    const skills = matchingTitle
      ? jobSkillsMap[matchingTitle]
      : [
          "Communication",
          "Teamwork",
          "Problem Solving",
          "Time Management",
          "Adaptability",
        ];
    
    const suggestedSkills = skills.map((skill) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: skill,
      selected: false,
    }));
    
    setFormData((prev) => ({
      ...prev,
      suggestedSkills,
      selectedSkills: [],
    }));
  }, [setFormData]);

  const toggleSkill = useCallback((skillId: string) => {
    setFormData((prev) => {
      const updatedSuggestedSkills = prev.suggestedSkills.map((skill) =>
        skill.id === skillId ? { ...skill, selected: !skill.selected } : skill
      );
      
      const selectedSkills = updatedSuggestedSkills.filter((skill) => skill.selected);
      
      return {
        ...prev,
        suggestedSkills: updatedSuggestedSkills,
        selectedSkills,
      };
    });
  }, [setFormData]);

  const updateAdditionalInfo = useCallback((info: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalInfo: info,
    }));
  }, [setFormData]);

  const updateCompanyInfo = useCallback((field: keyof JobFormData["companyInfo"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        [field]: value,
      },
    }));
  }, [setFormData]);

  const generateDescription = useCallback(() => {
    setIsGenerating(true);
    
    // Simulate description generation
    setTimeout(() => {
      const jobTitle = formData.jobTitle;
      const experienceLevel = formData.experienceRange;
      const company = formData.companyInfo.name;
      const location = formData.companyInfo.location;
      const companyAbout = formData.companyInfo.about;
      const skills = formData.selectedSkills.map(s => s.name).join(", ");
      const additionalInfo = formData.additionalInfo;
      
      let experienceText = "";
      switch (experienceLevel) {
        case "entry":
          experienceText = "0-2 years";
          break;
        case "mid":
          experienceText = "3-5 years";
          break;
        case "senior":
          experienceText = "5-8 years";
          break;
        case "expert":
          experienceText = "8+ years";
          break;
        default:
          experienceText = "";
      }
      
      const generatedDescription = `
# ${jobTitle} at ${company}
## ${location}${experienceText ? ` | ${experienceText} Experience` : ''}

### About ${company}
${companyAbout || "We are a dynamic company looking for talented individuals to join our team."}

### The Role
We are seeking an experienced ${jobTitle} to join our growing team. The ideal candidate will have ${experienceText ? `${experienceText} of experience` : 'relevant experience'} in ${skills}.

### Responsibilities
- Design, develop, and maintain high-quality applications
- Collaborate with cross-functional teams to define and implement innovative solutions
- Stay up-to-date with the latest industry trends and technologies

### Required Skills
${formData.selectedSkills.map(skill => `- ${skill.name}`).join("\n")}

### Additional Information
${additionalInfo}

### How to Apply
Please send your resume and cover letter to careers@${company.toLowerCase().replace(/\s+/g, "")}.com with the subject line "${jobTitle} Application".
      `;
      
      setGeneratedDescription(generatedDescription);
      setIsGenerating(false);
    }, 1500);
  }, [formData, setGeneratedDescription, setIsGenerating]);

  return {
    updateJobTitle,
    updateExperienceRange,
    updateSuggestedSkills,
    toggleSkill,
    updateAdditionalInfo,
    updateCompanyInfo,
    generateDescription
  };
}


import React, { createContext, useContext, useState, useCallback } from "react";

export type Skill = {
  id: string;
  name: string;
  selected: boolean;
};

export type JobFormData = {
  jobTitle: string;
  selectedSkills: Skill[];
  suggestedSkills: Skill[];
  additionalInfo: string;
  companyInfo: {
    name: string;
    location: string;
    about: string;
  };
};

const initialFormData: JobFormData = {
  jobTitle: "",
  selectedSkills: [],
  suggestedSkills: [],
  additionalInfo: "",
  companyInfo: {
    name: "",
    location: "",
    about: "",
  },
};

// Map of job titles to suggested skills
const jobSkillsMap: Record<string, string[]> = {
  "Software Engineer": [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C#",
    "SQL",
    "NoSQL",
    "Git",
    "AWS",
    "Docker",
    "Kubernetes",
    "Agile",
    "CI/CD",
  ],
  "Frontend Developer": [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React",
    "Vue.js",
    "Angular",
    "Responsive Design",
    "SASS/SCSS",
    "Webpack",
    "Jest",
    "UI/UX Principles",
  ],
  "Backend Developer": [
    "Node.js",
    "Python",
    "Java",
    "C#",
    "Go",
    "Ruby",
    "PHP",
    "Express",
    "Django",
    "Spring Boot",
    "SQL",
    "NoSQL",
    "REST APIs",
    "GraphQL",
    "Microservices",
  ],
  "Full Stack Developer": [
    "JavaScript",
    "TypeScript",
    "React",
    "Vue.js",
    "Angular",
    "Node.js",
    "Python",
    "SQL",
    "NoSQL",
    "Git",
    "AWS",
    "Docker",
    "REST APIs",
    "GraphQL",
  ],
  "UI/UX Designer": [
    "Figma",
    "Sketch",
    "Adobe XD",
    "InVision",
    "Prototyping",
    "Wireframing",
    "User Research",
    "Usability Testing",
    "Information Architecture",
    "Accessibility",
    "Design Systems",
    "HTML/CSS",
  ],
  "Data Scientist": [
    "Python",
    "R",
    "SQL",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "Statistics",
    "Data Visualization",
    "Jupyter Notebooks",
  ],
  "Product Manager": [
    "Product Strategy",
    "User Stories",
    "Agile/Scrum",
    "Market Research",
    "Competitive Analysis",
    "Roadmapping",
    "Stakeholder Management",
    "Data Analysis",
    "A/B Testing",
    "Wireframing",
    "User Journey Mapping",
    "Product Lifecycle",
  ],
  "DevOps Engineer": [
    "Linux",
    "AWS/Azure/GCP",
    "Docker",
    "Kubernetes",
    "Terraform",
    "Ansible",
    "Jenkins",
    "GitHub Actions",
    "CircleCI",
    "Monitoring",
    "Logging",
    "Security",
    "Networking",
    "Scripting",
  ],
};

interface JobFormContextType {
  currentStep: number;
  formData: JobFormData;
  generatedDescription: string;
  isGenerating: boolean;
  setCurrentStep: (step: number) => void;
  updateJobTitle: (title: string) => void;
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

  const updateJobTitle = useCallback((title: string) => {
    setFormData((prev) => ({
      ...prev,
      jobTitle: title,
    }));
  }, []);

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
  }, []);

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
  }, []);

  const updateAdditionalInfo = useCallback((info: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalInfo: info,
    }));
  }, []);

  const updateCompanyInfo = useCallback((field: keyof JobFormData["companyInfo"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        [field]: value,
      },
    }));
  }, []);

  const generateDescription = useCallback(() => {
    setIsGenerating(true);
    
    // Simulate description generation
    setTimeout(() => {
      const jobTitle = formData.jobTitle;
      const company = formData.companyInfo.name;
      const location = formData.companyInfo.location;
      const companyAbout = formData.companyInfo.about;
      const skills = formData.selectedSkills.map(s => s.name).join(", ");
      const additionalInfo = formData.additionalInfo;
      
      const generatedDescription = `
# ${jobTitle} at ${company}
## ${location}

### About ${company}
${companyAbout}

### The Role
We are seeking an experienced ${jobTitle} to join our growing team. The ideal candidate will have a strong background in ${skills}.

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
  }, [formData]);

  const value = {
    currentStep,
    formData,
    generatedDescription,
    isGenerating,
    setCurrentStep,
    updateJobTitle,
    updateSuggestedSkills,
    toggleSkill,
    updateAdditionalInfo,
    updateCompanyInfo,
    generateDescription,
  };

  return <JobFormContext.Provider value={value}>{children}</JobFormContext.Provider>;
};

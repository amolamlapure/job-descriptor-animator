
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

export const initialFormData: JobFormData = {
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

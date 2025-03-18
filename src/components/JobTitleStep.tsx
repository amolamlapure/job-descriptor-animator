
import React, { useEffect } from "react";
import { useJobForm } from "@/context/JobFormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const JobTitleStep = () => {
  const { formData, updateJobTitle, updateExperienceRange } = useJobForm();
  const [value, setValue] = React.useState(formData.jobTitle);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // Debounce the input value to avoid too many state updates
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateJobTitle(value);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [value, updateJobTitle]);

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-medium tracking-tight">What job are you hiring for?</h2>
        <p className="text-muted-foreground">
          Enter the job title and required experience to get started.
        </p>
      </div>
      
      <div className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            placeholder="e.g. Software Engineer, Product Manager, UX Designer"
            value={value}
            onChange={handleChange}
            className="w-full transition-all duration-200 focus-within:ring focus-within:ring-primary/20 text-lg"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="experienceRange">Experience Level</Label>
          <Select 
            value={formData.experienceRange} 
            onValueChange={updateExperienceRange}
          >
            <SelectTrigger id="experienceRange" className="w-full transition-all duration-200 focus-within:ring focus-within:ring-primary/20">
              <SelectValue placeholder="Select required experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
              <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
              <SelectItem value="senior">Senior Level (5-8 years)</SelectItem>
              <SelectItem value="expert">Expert Level (8+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="pt-4">
          <p className="text-sm text-muted-foreground">
            Popular choices: Software Engineer, Frontend Developer, Backend Developer, Full Stack Developer, 
            UI/UX Designer, Data Scientist, Product Manager, DevOps Engineer
          </p>
        </div>
      </div>
    </div>
  );
};


import React, { useEffect } from "react";
import { useJobForm } from "@/context/JobFormContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2 } from "lucide-react";

export const SkillsStep = () => {
  const { formData, updateSuggestedSkills, toggleSkill } = useJobForm();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading suggested skills
    const timeoutId = setTimeout(() => {
      updateSuggestedSkills(formData.jobTitle);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [formData.jobTitle, updateSuggestedSkills]);

  const handleSkillToggle = (skillId: string) => {
    toggleSkill(skillId);
  };

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-medium tracking-tight">Select Required Skills</h2>
        <p className="text-muted-foreground">
          We've suggested skills based on the job title "{formData.jobTitle}". 
          Select the skills that are required for this position.
        </p>
      </div>
      
      <div className="space-y-4 pt-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
            <span className="ml-2 text-muted-foreground">Finding relevant skills...</span>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              {formData.suggestedSkills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant={skill.selected ? "default" : "outline"}
                  className={`
                    py-2 px-3 text-sm cursor-pointer transition-all duration-200 
                    hover:shadow-sm ${skill.selected ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}
                  `}
                  onClick={() => handleSkillToggle(skill.id)}
                >
                  {skill.selected && <Check className="mr-1 h-3 w-3" />}
                  {skill.name}
                </Badge>
              ))}
            </div>
            
            <div className="pt-6">
              <h3 className="text-sm font-medium mb-3">Selected Skills ({formData.selectedSkills.length})</h3>
              {formData.selectedSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.selectedSkills.map((skill) => (
                    <Badge key={skill.id} className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No skills selected yet. Click on the skills above to select them.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

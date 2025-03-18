
import React from "react";
import { useJobForm } from "@/context/JobFormContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const AdditionalInfoStep = () => {
  const { formData, updateAdditionalInfo } = useJobForm();
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateAdditionalInfo(e.target.value);
  };

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-medium tracking-tight">Additional Information</h2>
        <p className="text-muted-foreground">
          Add any additional details that would help potential candidates understand the role better.
        </p>
      </div>
      
      <div className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="additionalInfo">Additional Requirements or Perks</Label>
          <Textarea
            id="additionalInfo"
            placeholder="List any other requirements, benefits, or important information about the role. For example: remote work policy, flexible hours, healthcare benefits, etc."
            value={formData.additionalInfo}
            onChange={handleChange}
            className="min-h-[200px] resize-none transition-all duration-200 focus-within:ring focus-within:ring-primary/20"
          />
        </div>
        
        <div className="pt-2">
          <p className="text-sm text-muted-foreground">
            Great additional information might include working hours, benefits package, growth opportunities, 
            company culture, or any unique aspects of the role.
          </p>
        </div>
      </div>
    </div>
  );
};

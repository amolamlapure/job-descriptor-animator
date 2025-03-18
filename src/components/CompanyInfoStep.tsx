import React from "react";
import { useJobForm } from "@/context/JobFormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const CompanyInfoStep = () => {
  const { formData, updateCompanyInfo } = useJobForm();
  
  const handleChange = (field: keyof typeof formData.companyInfo) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateCompanyInfo(field, e.target.value);
  };

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-medium tracking-tight">Company Information</h2>
        <p className="text-muted-foreground">
          Tell potential candidates about your company. This information will help create a more 
          personalized job description.
        </p>
      </div>
      
      <div className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            placeholder="e.g. Acme Corporation"
            value={formData.companyInfo.name}
            onChange={handleChange("name")}
            className="transition-all duration-200 focus-within:ring focus-within:ring-primary/20"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="companyLocation">Location</Label>
          <Input
            id="companyLocation"
            placeholder="e.g. San Francisco, CA or Remote"
            value={formData.companyInfo.location}
            onChange={handleChange("location")}
            className="transition-all duration-200 focus-within:ring focus-within:ring-primary/20"
          />
        </div>
        
        {/* About Company text area has been hidden */}
      </div>
    </div>
  );
};

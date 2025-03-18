
import React from "react";
import { JobDescriptionGenerator } from "@/components/JobDescriptionGenerator";
import { JobFormProvider } from "@/context/JobFormContext";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      <header className="pt-12 pb-8 px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full animate-fade-in">Job Description Generator</span>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight animate-scale-in text-foreground/90">
            Create the Perfect Job Description
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Craft professional job descriptions in minutes, not hours. Our step-by-step wizard
            guides you through the process to create compelling job listings.
          </p>
        </div>
      </header>
      
      <main className="flex-1 pb-16">
        <JobFormProvider>
          <JobDescriptionGenerator />
        </JobFormProvider>
      </main>
      
      <footer className="py-6 border-t border-border/40 bg-background">
        <div className="max-w-3xl mx-auto text-center text-sm text-muted-foreground">
          <p>Job Description Generator © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

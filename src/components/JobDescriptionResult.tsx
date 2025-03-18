
import React, { useEffect, useState, useRef } from "react";
import { useJobForm } from "@/context/JobFormContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, Check, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const JobDescriptionResult = () => {
  const { formData, generatedDescription, isGenerating } = useJobForm();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const descriptionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDescription);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Job description has been copied to your clipboard",
    });
  };

  const formatDescription = (text: string) => {
    // Split the text by newlines
    const lines = text.split("\n");
    
    // Render with proper formatting
    return lines.map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-2xl font-bold mb-2">
            {line.replace("# ", "")}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-xl font-semibold mb-2 text-primary">
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-lg font-medium mb-2 mt-4">
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 mb-1">
            {line.replace("- ", "")}
          </li>
        );
      } else if (line.trim() === "") {
        return <div key={index} className="h-2" />;
      } else {
        return <p key={index} className="mb-3">{line}</p>;
      }
    });
  };

  if (isGenerating) {
    return (
      <div className="py-8 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary/50 mb-4" />
        <h2 className="text-xl font-medium text-center mb-2">Generating Your Job Description</h2>
        <p className="text-muted-foreground text-center">
          We're crafting a detailed job description based on the information you provided.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium tracking-tight">Generated Job Description</h2>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>
        <p className="text-muted-foreground">
          Here's your completed job description. You can copy it or edit it further as needed.
        </p>
      </div>
      
      <Separator />
      
      <Card className="p-6 shadow-sm border border-border/50 bg-white">
        <div 
          ref={descriptionRef}
          className="prose max-w-none text-foreground animate-fade-in"
        >
          {formatDescription(generatedDescription)}
        </div>
      </Card>
    </div>
  );
};

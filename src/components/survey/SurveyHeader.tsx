
import React from 'react';

interface SurveyHeaderProps {
  title: string;
  description: string;
}

const SurveyHeader: React.FC<SurveyHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-foreground mb-4">
        {title}
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default SurveyHeader;

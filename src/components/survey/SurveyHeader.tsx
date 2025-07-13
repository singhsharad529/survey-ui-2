import React from 'react';

interface SurveyHeaderProps {
  title: string;
  description: string;
}

const SurveyHeader: React.FC<SurveyHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-12 fade-in-up">
      <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
        {title}
      </h1>
      <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default SurveyHeader;

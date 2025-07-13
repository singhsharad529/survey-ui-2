import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SurveyHeader from '@/components/survey/SurveyHeader';
import SuccessScreen from '@/components/survey/SuccessScreen';
import QuestionRenderer from '@/components/survey/QuestionRenderer';

interface Question {
  id: string;
  type: 'text' | 'radio' | 'checkbox' | 'dropdown' | 'textarea' | 'rating';
  question: string;
  options?: string[];
  required: boolean;
}

const PublicSurvey: React.FC = () => {
  const { surveyId } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [responses, setResponses] = useState<Record<string, any>>({});

  // Mock survey data
  const survey = {
    id: surveyId,
    title: 'Customer Satisfaction Survey',
    description: 'Help us improve our product by sharing your feedback. This survey takes approximately 3-5 minutes to complete.',
    questions: [
      {
        id: '1',
        type: 'radio' as const,
        question: 'How satisfied are you with our product overall?',
        options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
        required: true
      },
      {
        id: '2',
        type: 'checkbox' as const,
        question: 'Which features do you use most frequently? (Select all that apply)',
        options: ['Dashboard', 'Reports', 'Integration', 'Mobile App', 'API'],
        required: false
      },
      {
        id: '3',
        type: 'textarea' as const,
        question: 'What improvements would you like to see in our product?',
        required: false
      },
      {
        id: '4',
        type: 'rating' as const,
        question: 'How likely are you to recommend our product to others? (0-10)',
        required: true
      },
      {
        id: '5',
        type: 'text' as const,
        question: 'What is your primary use case for our product?',
        required: false
      }
    ] as Question[]
  };

  const handleInputChange = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Survey responses:', responses);
    setSubmitted(true);
  };

  if (submitted) {
    return <SuccessScreen surveyId={surveyId} />;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] py-12 px-4 fade-in-up">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <SurveyHeader title={survey.title} description={survey.description} />

        {/* Survey Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="professional-card">
            <CardContent className="p-8">
              <div className="space-y-10">
                {survey.questions.map((question, index) => (
                  <div key={question.id} className="pb-8 border-b border-[var(--border-color)] last:border-b-0">
                    <Badge variant="secondary" className="mb-3 text-sm tracking-wide">
                      Question {index + 1} of {survey.questions.length}
                    </Badge>
                    <Label className="text-[var(--text-primary)] text-md lg:text-lg font-semibold block mb-2">
                      {question.question}
                      {question.required && (
                        <span className="text-destructive ml-1 font-bold">*</span>
                      )}
                    </Label>
                    <QuestionRenderer
                      question={question}
                      value={responses[question.id]}
                      onChange={(value) => handleInputChange(question.id, value)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button type="submit" className="professional-button-primary text-md px-8 py-4 flex items-center justify-center space-x-3 mx-auto">
              <span>Submit Survey</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-[var(--border-color)]">
          <p className="text-sm text-[var(--text-muted)]">
            Powered by <strong>SurveyPro</strong> — Professional Survey Builder
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicSurvey;

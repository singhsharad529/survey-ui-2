
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
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
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SurveyHeader title={survey.title} description={survey.description} />

        {/* Survey Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardContent className="p-8">
              <div className="space-y-8">
                {survey.questions.map((question, index) => (
                  <div key={question.id} className="pb-8 border-b border-border last:border-b-0">
                    <div className="mb-4">
                      <Badge variant="secondary" className="mb-4">
                        Question {index + 1} of {survey.questions.length}
                      </Badge>
                    </div>
                    <Label className="text-lg font-semibold mb-4 block">
                      {question.question}
                      {question.required && <span className="text-destructive ml-1">*</span>}
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
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button type="submit" size="lg" className="px-12 py-4">
              <span>Submit Survey</span>
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Powered by SurveyPro - Professional Survey Builder
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicSurvey;

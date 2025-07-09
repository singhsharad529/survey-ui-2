
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'text':
        return (
          <Input
            type="text"
            placeholder="Your answer..."
            value={responses[question.id] || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            required={question.required}
            className="w-full"
          />
        );

      case 'textarea':
        return (
          <textarea
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            placeholder="Your answer..."
            value={responses[question.id] || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            required={question.required}
          />
        );

      case 'radio':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`${question.id}-${index}`}
                  name={`question-${question.id}`}
                  value={option}
                  checked={responses[question.id] === option}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                  className="h-4 w-4 text-primary focus:ring-primary border-border"
                  required={question.required}
                />
                <Label htmlFor={`${question.id}-${index}`} className="text-sm font-normal cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}-${index}`}
                  checked={(responses[question.id] || []).includes(option)}
                  onCheckedChange={(checked) => {
                    const currentValues = responses[question.id] || [];
                    if (checked) {
                      handleInputChange(question.id, [...currentValues, option]);
                    } else {
                      handleInputChange(question.id, currentValues.filter((v: string) => v !== option));
                    }
                  }}
                />
                <Label htmlFor={`${question.id}-${index}`} className="text-sm font-normal cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );

      case 'rating':
        return (
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 11 }, (_, i) => i).map((rating) => (
              <Button
                key={rating}
                type="button"
                variant={responses[question.id] === rating ? "default" : "outline"}
                size="sm"
                onClick={() => handleInputChange(question.id, rating)}
                className="w-12 h-12 p-0"
              >
                {rating}
              </Button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-primary-foreground" />
              </div>
              <CardTitle className="text-3xl mb-4">Thank You!</CardTitle>
              <CardDescription className="text-lg mb-6">
                Your responses have been successfully submitted. We appreciate your feedback!
              </CardDescription>
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Survey ID: {surveyId}
                </p>
                <p className="text-sm text-muted-foreground">
                  Submitted: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Survey Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {survey.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {survey.description}
          </p>
        </div>

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
                    {renderQuestion(question)}
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


import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface Question {
  id: string;
  type: 'text' | 'radio' | 'checkbox' | 'dropdown' | 'textarea' | 'rating';
  question: string;
  options?: string[];
  required: boolean;
}

interface QuestionRendererProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({ question, value, onChange }) => {
  const renderQuestion = () => {
    switch (question.type) {
      case 'text':
        return (
          <Input
            type="text"
            placeholder="Your answer..."
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={question.required}
            className="w-full"
          />
        );

      case 'textarea':
        return (
          <textarea
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            placeholder="Your answer..."
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
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
                  checked={value === option}
                  onChange={(e) => onChange(e.target.value)}
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
                  checked={(value || []).includes(option)}
                  onCheckedChange={(checked) => {
                    const currentValues = value || [];
                    if (checked) {
                      onChange([...currentValues, option]);
                    } else {
                      onChange(currentValues.filter((v: string) => v !== option));
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
                variant={value === rating ? "default" : "outline"}
                size="sm"
                onClick={() => onChange(rating)}
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

  return renderQuestion();
};

export default QuestionRenderer;

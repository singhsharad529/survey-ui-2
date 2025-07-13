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
          <input
            type="text"
            className="professional-input"
            placeholder="Your answer..."
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={question.required}
            aria-label={question.question}
          />
        );

      case 'textarea':
        return (
          <textarea
            className="professional-input resize-none min-h-[120px]"
            placeholder="Your answer..."
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={question.required}
            aria-label={question.question}
          />
        );

      case 'radio':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={`${question.id}-${index}`}
                  name={`question-${question.id}`}
                  value={option}
                  checked={value === option}
                  onChange={(e) => onChange(e.target.value)}
                  required={question.required}
                  className="h-4 w-4 text-[var(--primary-blue)] bg-[var(--bg-primary)] border-[var(--border-color)] rounded"
                />
                <Label htmlFor={`${question.id}-${index}`} className="text-[var(--text-primary)] cursor-pointer">
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
              <div key={index} className="flex items-center space-x-3">
                <Checkbox
                  id={`${question.id}-${index}`}
                  checked={(value || []).includes(option)}
                  onCheckedChange={(checked) => {
                    const current = value || [];
                    onChange(
                      checked ? [...current, option] : current.filter((v: string) => v !== option)
                    );
                  }}
                />
                <Label htmlFor={`${question.id}-${index}`} className="text-[var(--text-primary)] cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );

      case 'rating':
        return (
          <div className="flex flex-wrap gap-2 mt-1">
            {Array.from({ length: 11 }, (_, i) => i).map((rating) => (
              <button
                key={rating}
                type="button"
                className={`w-10 h-10 rounded-full border transition duration-200 font-semibold text-sm ${value === rating
                  ? 'bg-[var(--primary-blue)] text-white shadow-md'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border-[var(--border-color)] hover:bg-[var(--bg-primary)]'
                  }`}
                onClick={() => onChange(rating)}
                aria-label={`Rating ${rating}`}
              >
                {rating}
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="mt-2">{renderQuestion()}</div>;
};

export default QuestionRenderer;

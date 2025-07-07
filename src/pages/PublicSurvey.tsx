
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

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
          <input
            type="text"
            className="professional-input"
            placeholder="Your answer..."
            value={responses[question.id] || ''}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            required={question.required}
          />
        );

      case 'textarea':
        return (
          <textarea
            className="professional-input h-24 resize-none"
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
              <label key={index} className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={responses[question.id] === option}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                  className="mr-3"
                  required={question.required}
                />
                <span className="group-hover:opacity-80 transition-opacity" style={{ color: 'var(--text-primary)' }}>
                  {option}
                </span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  value={option}
                  checked={(responses[question.id] || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = responses[question.id] || [];
                    if (e.target.checked) {
                      handleInputChange(question.id, [...currentValues, option]);
                    } else {
                      handleInputChange(question.id, currentValues.filter((v: string) => v !== option));
                    }
                  }}
                  className="mr-3"
                />
                <span className="group-hover:opacity-80 transition-opacity" style={{ color: 'var(--text-primary)' }}>
                  {option}
                </span>
              </label>
            ))}
          </div>
        );

      case 'rating':
        return (
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 11 }, (_, i) => i).map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleInputChange(question.id, rating)}
                className={`w-12 h-12 border rounded-lg font-semibold transition-all ${
                  responses[question.id] === rating
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                }`}
                style={{
                  borderColor: responses[question.id] === rating ? 'var(--primary-blue)' : 'var(--border-color)',
                  background: responses[question.id] === rating ? 'var(--primary-blue)' : 'transparent',
                  color: responses[question.id] === rating ? 'white' : 'var(--text-primary)'
                }}
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

  if (submitted) {
    return (
      <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-8">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" 
                   style={{ background: 'var(--gradient-primary)' }}>
                <CheckCircle size={40} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Thank You!
              </h1>
              <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
                Your responses have been successfully submitted. We appreciate your feedback!
              </p>
              <div className="professional-card p-6">
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                  Survey ID: {surveyId}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                  Submitted: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '40px 0' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Survey Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            {survey.title}
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            {survey.description}
          </p>
        </div>

        {/* Survey Form */}
        <form onSubmit={handleSubmit}>
          <div className="professional-card p-8 mb-8">
            <div className="space-y-8">
              {survey.questions.map((question, index) => (
                <div key={question.id} className="pb-8 border-b last:border-b-0" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="mb-4">
                    <span className="text-sm font-medium px-3 py-1 rounded-full" 
                          style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                      Question {index + 1} of {survey.questions.length}
                    </span>
                  </div>
                  <label className="block text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                    {question.question}
                    {question.required && <span style={{ color: '#dc2626' }} className="ml-1">*</span>}
                  </label>
                  {renderQuestion(question)}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="professional-button-primary text-lg px-12 py-4 flex items-center space-x-3 mx-auto"
            >
              <span>Submit Survey</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Powered by SurveyPro - Professional Survey Builder
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicSurvey;

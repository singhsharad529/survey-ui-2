
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Eye, Share2, Settings, Plus, Edit3, Trash2, GripVertical } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Question {
  id: string;
  type: 'text' | 'radio' | 'checkbox' | 'dropdown' | 'textarea' | 'rating';
  question: string;
  options?: string[];
  required: boolean;
}

const SurveyPreview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const surveyData = location.state?.surveyData;

  // Mock generated questions based on input
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      type: 'radio',
      question: 'How satisfied are you with our product overall?',
      options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
      required: true
    },
    {
      id: '2',
      type: 'checkbox',
      question: 'Which features do you use most frequently? (Select all that apply)',
      options: ['Dashboard', 'Reports', 'Integration', 'Mobile App', 'API'],
      required: false
    },
    {
      id: '3',
      type: 'textarea',
      question: 'What improvements would you like to see in our product?',
      required: false
    },
    {
      id: '4',
      type: 'rating',
      question: 'How likely are you to recommend our product to others?',
      required: true
    }
  ]);

  const [surveySettings, setSurveySettings] = useState({
    title: 'Customer Satisfaction Survey',
    description: 'Help us improve our product by sharing your feedback.',
    allowAnonymous: surveyData?.anonymous || true,
    allowMultipleSubmissions: false
  });

  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);

  const handlePublish = () => {
    console.log('Publishing survey...', { questions, surveySettings });
    navigate('/dashboard');
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: 'text',
      question: 'New Question',
      required: false
    };
    setQuestions([...questions, newQuestion]);
    setEditingQuestion(newQuestion.id);
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleEditQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const renderQuestion = (question: Question, isPreview: boolean = false) => {
    const baseClasses = "block mb-2 font-medium";
    const labelStyle = { color: 'var(--text-primary)' };
    const inputStyle = { background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' };

    return (
      <div key={question.id} className="mb-6">
        <label className={baseClasses} style={labelStyle}>
          {question.question}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {question.type === 'text' && (
          <input 
            type="text" 
            className="professional-input" 
            placeholder="Your answer..."
            disabled={isPreview}
            style={inputStyle}
          />
        )}
        
        {question.type === 'textarea' && (
          <textarea 
            className="professional-input h-24 resize-none" 
            placeholder="Your answer..."
            disabled={isPreview}
            style={inputStyle}
          />
        )}
        
        {question.type === 'radio' && question.options && (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name={`question-${question.id}`} 
                  className="mr-3" 
                  disabled={isPreview}
                />
                <span style={{ color: 'var(--text-primary)' }}>{option}</span>
              </label>
            ))}
          </div>
        )}
        
        {question.type === 'checkbox' && question.options && (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="mr-3" 
                  disabled={isPreview}
                />
                <span style={{ color: 'var(--text-primary)' }}>{option}</span>
              </label>
            ))}
          </div>
        )}
        
        {question.type === 'rating' && (
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
              <button
                key={rating}
                className="w-10 h-10 border rounded-lg hover:bg-blue-100 transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                disabled={isPreview}
              >
                {rating}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/create')}
              className="professional-button-secondary p-2"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Preview & Edit Survey
              </h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                Review your AI-generated survey and make adjustments
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="professional-button-secondary flex items-center space-x-2">
              <Eye size={16} />
              <span>Preview</span>
            </button>
            <button 
              onClick={handlePublish}
              className="professional-button-primary flex items-center space-x-2"
            >
              <Share2 size={16} />
              <span>Publish Survey</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Preview */}
          <div className="lg:col-span-2">
            <div className="professional-card">
              <div className="p-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <input
                  type="text"
                  value={surveySettings.title}
                  onChange={(e) => setSurveySettings({ ...surveySettings, title: e.target.value })}
                  className="text-2xl font-bold bg-transparent border-none outline-none w-full"
                  style={{ color: 'var(--text-primary)' }}
                />
                <textarea
                  value={surveySettings.description}
                  onChange={(e) => setSurveySettings({ ...surveySettings, description: e.target.value })}
                  className="mt-2 bg-transparent border-none outline-none w-full resize-none"
                  style={{ color: 'var(--text-secondary)' }}
                  rows={2}
                />
              </div>
              
              <div className="p-6">
                {questions.map((question, index) => (
                  <div key={question.id} className="group relative mb-8 p-4 border border-transparent rounded-lg hover:border-gray-200 transition-colors">
                    <div className="absolute left-0 top-0 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity -ml-12">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <GripVertical size={16} style={{ color: 'var(--text-muted)' }} />
                      </button>
                    </div>
                    
                    <div className="absolute right-0 top-0 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity -mr-12">
                      <button 
                        onClick={() => setEditingQuestion(question.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Edit3 size={16} style={{ color: 'var(--text-muted)' }} />
                      </button>
                      <button 
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Trash2 size={16} style={{ color: '#dc2626' }} />
                      </button>
                    </div>
                    
                    {renderQuestion(question, true)}
                  </div>
                ))}
                
                <button 
                  onClick={handleAddQuestion}
                  className="professional-button-secondary w-full flex items-center justify-center space-x-2 py-4 border-2 border-dashed"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <Plus size={16} />
                  <span>Add Question</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Survey Settings */}
            <div className="professional-card p-6">
              <h3 className="font-semibold mb-4 flex items-center space-x-2" style={{ color: 'var(--text-primary)' }}>
                <Settings size={20} />
                <span>Survey Settings</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    Survey Name
                  </label>
                  <input
                    type="text"
                    value={surveySettings.title}
                    onChange={(e) => setSurveySettings({ ...surveySettings, title: e.target.value })}
                    className="professional-input"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label style={{ color: 'var(--text-primary)' }}>Anonymous Responses</label>
                  <input
                    type="checkbox"
                    checked={surveySettings.allowAnonymous}
                    onChange={(e) => setSurveySettings({ ...surveySettings, allowAnonymous: e.target.checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label style={{ color: 'var(--text-primary)' }}>Multiple Submissions</label>
                  <input
                    type="checkbox"
                    checked={surveySettings.allowMultipleSubmissions}
                    onChange={(e) => setSurveySettings({ ...surveySettings, allowMultipleSubmissions: e.target.checked })}
                  />
                </div>
              </div>
            </div>

            {/* Question Types */}
            <div className="professional-card p-6">
              <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Add Question Type
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { type: 'text', label: 'Text' },
                  { type: 'textarea', label: 'Long Text' },
                  { type: 'radio', label: 'Multiple Choice' },
                  { type: 'checkbox', label: 'Checkboxes' },
                  { type: 'dropdown', label: 'Dropdown' },
                  { type: 'rating', label: 'Rating' }
                ].map((questionType) => (
                  <button
                    key={questionType.type}
                    onClick={() => {
                      const newQuestion: Question = {
                        id: Date.now().toString(),
                        type: questionType.type as Question['type'],
                        question: `New ${questionType.label} Question`,
                        required: false,
                        ...(questionType.type === 'radio' || questionType.type === 'checkbox' ? { options: ['Option 1', 'Option 2'] } : {})
                      };
                      setQuestions([...questions, newQuestion]);
                    }}
                    className="professional-button-secondary text-sm py-2"
                  >
                    {questionType.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Survey Stats */}
            <div className="professional-card p-6">
              <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Survey Overview
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Questions</span>
                  <span style={{ color: 'var(--text-primary)' }}>{questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Required</span>
                  <span style={{ color: 'var(--text-primary)' }}>{questions.filter(q => q.required).length}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Est. Time</span>
                  <span style={{ color: 'var(--text-primary)' }}>~{Math.max(2, Math.ceil(questions.length / 2))} min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SurveyPreview;

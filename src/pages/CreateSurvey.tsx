
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Target, Clock, Shield, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CreateSurvey: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    audience: '',
    areas: '',
    depth: '2-min',
    anonymous: true,
    context: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Survey input:', formData);
    // Navigate to preview page with generated survey
    navigate('/preview/new', { state: { surveyData: formData } });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full" style={{ background: 'var(--gradient-primary)' }}>
              <Sparkles size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Let's understand your survey needs
          </h1>
          <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
            Answer a few questions to help us generate the perfect survey for you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="professional-card p-8 relative overflow-hidden min-h-[240px] transition-all duration-500">
            {/* Step 0: Audience */}
            {currentStep === 0 && (
              <div className="fade-in-up">
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <Users size={24} style={{ color: 'var(--primary-blue)' }} />
                    <label className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Who will be taking this survey?
                    </label>
                  </div>
                  <input
                    type="text"
                    className="professional-input"
                    placeholder="e.g., Customers, employees, website visitors, students..."
                    value={formData.audience}
                    onChange={(e) => handleInputChange('audience', e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 1: Areas */}
            {currentStep === 1 && (
              <div className="fade-in-up">
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <Target size={24} style={{ color: 'var(--secondary-blue)' }} />
                    <label className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                      What specific areas do you want to cover?
                    </label>
                  </div>
                  <input
                    type="text"
                    className="professional-input"
                    placeholder="e.g., Product satisfaction, user experience, service quality..."
                    value={formData.areas}
                    onChange={(e) => handleInputChange('areas', e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Survey Depth */}
            {currentStep === 2 && (
              <div className="fade-in-up">
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock size={24} style={{ color: 'var(--accent-yellow)' }} />
                    <label className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Survey depth?
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label
                      className="flex items-center p-4 border rounded-lg cursor-pointer transition-all"
                      style={{
                        borderColor: formData.depth === '2-min' ? 'var(--primary-blue)' : 'var(--border-color)',
                        background: formData.depth === '2-min' ? 'rgba(54, 116, 181, 0.05)' : 'transparent',
                      }}
                    >
                      <input
                        type="radio"
                        name="depth"
                        value="2-min"
                        checked={formData.depth === '2-min'}
                        onChange={(e) => handleInputChange('depth', e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          2-min pulse
                        </div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                          Quick feedback, 3-5 questions
                        </div>
                      </div>
                    </label>
                    <label
                      className="flex items-center p-4 border rounded-lg cursor-pointer transition-all"
                      style={{
                        borderColor: formData.depth === '15-min' ? 'var(--primary-blue)' : 'var(--border-color)',
                        background: formData.depth === '15-min' ? 'rgba(54, 116, 181, 0.05)' : 'transparent',
                      }}
                    >
                      <input
                        type="radio"
                        name="depth"
                        value="15-min"
                        checked={formData.depth === '15-min'}
                        onChange={(e) => handleInputChange('depth', e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          15-min deep dive
                        </div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                          Comprehensive, 10-15 questions
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Anonymous */}
            {currentStep === 3 && (
              <div className="fade-in-up">
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield size={24} style={{ color: 'var(--primary-blue)' }} />
                    <label className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Should this survey be anonymous?
                    </label>
                  </div>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="anonymous"
                        checked={formData.anonymous === true}
                        onChange={() => handleInputChange('anonymous', true)}
                        className="mr-2"
                      />
                      <span style={{ color: 'var(--text-primary)' }}>Yes, keep it anonymous</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="anonymous"
                        checked={formData.anonymous === false}
                        onChange={() => handleInputChange('anonymous', false)}
                        className="mr-2"
                      />
                      <span style={{ color: 'var(--text-primary)' }}>No, collect respondent info</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Additional Context + Submit */}
            {currentStep === 4 && (
              <div className="fade-in-up">
                <div className="mb-8">
                  <label className="text-lg font-semibold mb-4 block" style={{ color: 'var(--text-primary)' }}>
                    Additional Context
                  </label>
                  <textarea
                    className="professional-input h-32 resize-none"
                    placeholder="Any extra instructions, specific questions you want included, or context about your survey goals..."
                    value={formData.context}
                    onChange={(e) => handleInputChange('context', e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="professional-button-primary text-md md:text-lg px-4 md:px-12 py-4 flex items-center space-x-3 mx-auto"
                  >
                    <Sparkles size={20} />
                    <span>Generate Survey</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              {currentStep > 0 && (
                <button
                  type="button"
                  className="professional-button-secondary"
                  onClick={() => setCurrentStep((s) => s - 1)}
                >
                  Back
                </button>
              )}
              {currentStep < 4 && (
                <button
                  type="button"
                  className="professional-button-primary ml-auto"
                  onClick={() => setCurrentStep((s) => s + 1)}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </form>



        {/* Preview Section */}
        <div className="mt-12 professional-card p-8">
          <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            What happens next?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background: 'var(--gradient-primary)' }}>
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>AI Generation</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Our AI analyzes your input and generates relevant questions
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background: 'var(--gradient-primary)' }}>
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Review & Edit</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Preview your survey and make any adjustments needed
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ background: 'var(--gradient-primary)' }}>
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Share & Collect</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Publish your survey and start collecting responses
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateSurvey;

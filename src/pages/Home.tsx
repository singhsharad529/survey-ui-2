
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Share2, BarChart, Sparkles, CheckCircle, Users } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden py-20 lg:py-0">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Create AI-Generated 
                <span style={{ color: 'var(--accent-yellow)' }}> Surveys</span> in Seconds
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Let AI design surveys tailored to your needs. Just tell us what you want, and we'll create professional surveys with intelligent questions and beautiful designs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/create">
                  <button 
                    className="flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <Sparkles size={20} />
                    <span>Generate Survey</span>
                    <ArrowRight size={20} />
                  </button>
                </Link>
                <Link to="/dashboard">
                  <button 
                    className="flex items-center space-x-2 px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                  >
                    <BarChart size={20} />
                    <span>View Dashboard</span>
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Hero Illustration */}
            <div className="relative">
              <div className="professional-card p-8 bg-white/95 backdrop-blur-sm">
                <div className="space-y-12">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ background: 'var(--primary-blue)' }}></div>
                    <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Sample Survey Preview</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-8 bg-blue-100 rounded flex items-center justify-center">
                        <CheckCircle size={16} style={{ color: 'var(--primary-blue)' }} />
                      </div>
                      <div className="h-8 bg-gray-100 rounded"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Why Choose SurveyPro?
            </h2>
            <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
              Powerful features designed for modern survey creation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap size={40} style={{ color: 'var(--primary-blue)' }} />,
                title: "AI-Generated Questions",
                description: "Our AI understands your context and generates relevant, professional questions automatically."
              },
              {
                icon: <Share2 size={40} style={{ color: 'var(--secondary-blue)' }} />,
                title: "Easy Sharing",
                description: "Share your surveys instantly with custom links, QR codes, or embed them anywhere."
              },
              {
                icon: <BarChart size={40} style={{ color: 'var(--accent-yellow)' }} />,
                title: "Real-time Insights",
                description: "Get instant analytics, beautiful charts, and actionable insights from your responses."
              }
            ].map((feature, index) => (
              <div key={index} className="professional-card p-8 text-center">
                <div className="mb-6 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Surveys Created" },
              { number: "50K+", label: "Responses Collected" },
              { number: "2K+", label: "Happy Users" },
              { number: "99%", label: "Uptime" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2" style={{ color: 'var(--primary-blue)' }}>
                  {stat.number}
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

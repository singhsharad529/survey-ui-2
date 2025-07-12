
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Eye, Share2, BarChart3, Users, FileText, Clock, CheckCircle, XCircle, Edit3 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Survey {
  id: string;
  title: string;
  status: 'active' | 'draft' | 'closed';
  responses: number;
  createdAt: string;
  updatedAt: string;
}

const Dashboard: React.FC = () => {
  const [surveys] = useState<Survey[]>([
    {
      id: '1',
      title: 'Customer Satisfaction Survey',
      status: 'active',
      responses: 245,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Product Feedback Form',
      status: 'draft',
      responses: 0,
      createdAt: '2024-01-18',
      updatedAt: '2024-01-18'
    },
    {
      id: '3',
      title: 'Employee Engagement Survey',
      status: 'closed',
      responses: 89,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-17'
    },
    {
      id: '4',
      title: 'Website Usability Test',
      status: 'active',
      responses: 156,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-19'
    }
  ]);

  const activeCount = surveys.filter(s => s.status === 'active').length;
  const draftCount = surveys.filter(s => s.status === 'draft').length;
  const closedCount = surveys.filter(s => s.status === 'closed').length;
  const totalResponses = surveys.reduce((sum, s) => sum + s.responses, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} />;
      case 'draft': return <Clock size={16} />;
      case 'closed': return <XCircle size={16} />;
      default: return null;
    }
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Dashboard
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Manage your surveys and track responses
            </p>
          </div>
          <div className='flex justify-end'>
            <Link to="/create">
              <button className="professional-button-primary flex items-center text-sm md:text-md space-x-2 px-3 md:py-3 md:px-6">
                <Plus size={16} />
                <span>Create New Survey</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="professional-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Total Surveys</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {surveys.length}
                </p>
              </div>
              <FileText size={24} style={{ color: 'var(--primary-blue)' }} />
            </div>
          </div>

          <div className="professional-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Active</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {activeCount}
                </p>
              </div>
              <CheckCircle size={24} style={{ color: '#16a34a' }} />
            </div>
          </div>

          <div className="professional-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Drafts</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {draftCount}
                </p>
              </div>
              <Clock size={24} style={{ color: '#d97706' }} />
            </div>
          </div>

          <div className="professional-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Total Responses</p>
                <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {totalResponses}
                </p>
              </div>
              <Users size={24} style={{ color: 'var(--secondary-blue)' }} />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Surveys List */}
          <div className="lg:col-span-2">
            <div className="professional-card">
              <div className="p-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Your Surveys
                </h2>
              </div>
              <div className="divide-y divide-border">
                {surveys.map((survey) => (
                  <div key={survey.id} className="p-6 hover:bg-opacity-50 transition-colors" style={{ background: 'transparent' }}>
                    <div className="flex-col md:flex-row flex gap-4 justify-between">
                      <div className="flex-1">
                        <div className="flex flex-col-reverse gap-2 sm:flex-row space-x-3">
                          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {survey.title}
                          </h3>
                          <div className="flex justify-end">
                            <span className={`status-badge status-${survey.status} flex space-x-1`}>
                              {getStatusIcon(survey.status)}
                              <span>{survey.status}</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-2">
                          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                            {survey.responses} responses
                          </span>
                          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                            Updated {survey.updatedAt}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {survey.status === 'draft' && (
                          <Link to={`/preview/${survey.id}`}>
                            <button className="professional-button-secondary p-2" title="Preview">
                              <Eye size={16} />
                            </button>
                          </Link>
                        )}
                        <Link to={`/edit/${survey.id}`}>
                          <button className="professional-button-secondary p-2" title="Edit">
                            <Edit3 size={16} />
                          </button>
                        </Link>
                        <Link to={`/responses/${survey.id}`}>
                          <button className="professional-button-secondary p-2" title="View Responses">
                            <BarChart3 size={16} />
                          </button>
                        </Link>
                        {survey.status === 'active' && (
                          <button className="professional-button-secondary p-2" title="Share">
                            <Share2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="professional-card p-6">
              <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Quick Actions
              </h3>
              <div className="flex flex-col space-y-3">
                <Link to="/create">
                  <button className="professional-button-primary w-full flex items-center justify-center space-x-2">
                    <Plus size={16} />
                    <span>Create Survey</span>
                  </button>
                </Link>
                <Link to="/templates">
                  <button className="professional-button-secondary w-full">
                    Browse Templates
                  </button>
                </Link>
                <Link to="/analytics">
                  <button className="professional-button-secondary w-full">
                    View Analytics
                  </button>
                </Link>
              </div>
            </div>

            <div className="professional-card p-6">
              <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle size={16} style={{ color: '#16a34a' }} />
                  <div>
                    <p style={{ color: 'var(--text-primary)', fontSize: '14px' }}>
                      New response received
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                      2 minutes ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Edit3 size={16} style={{ color: 'var(--primary-blue)' }} />
                  <div>
                    <p style={{ color: 'var(--text-primary)', fontSize: '14px' }}>
                      Survey updated
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                      1 hour ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Plus size={16} style={{ color: 'var(--secondary-blue)' }} />
                  <div>
                    <p style={{ color: 'var(--text-primary)', fontSize: '14px' }}>
                      New survey created
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                      3 hours ago
                    </p>
                  </div>
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

export default Dashboard;

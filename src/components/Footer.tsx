
import React from 'react';
import { BarChart3, Twitter, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer style={{ 
      background: 'var(--bg-secondary)', 
      borderTop: '1px solid var(--border-color)',
      marginTop: '80px'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 style={{ color: 'var(--primary-blue)' }} size={32} />
              <span style={{ 
                color: 'var(--text-primary)', 
                fontSize: '24px', 
                fontWeight: '700' 
              }}>
                SurveyPro
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '400px' }}>
              Create AI-generated surveys in seconds. Professional survey builder with real-time insights and advanced analytics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '16px' }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li><a href="/" style={{ color: 'var(--text-secondary)' }} className="hover:opacity-80 transition-opacity">Home</a></li>
              <li><a href="/dashboard" style={{ color: 'var(--text-secondary)' }} className="hover:opacity-80 transition-opacity">Dashboard</a></li>
              <li><a href="/create" style={{ color: 'var(--text-secondary)' }} className="hover:opacity-80 transition-opacity">Create Survey</a></li>
              <li><a href="#about" style={{ color: 'var(--text-secondary)' }} className="hover:opacity-80 transition-opacity">About</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '16px' }}>
              Legal
            </h3>
            <ul className="space-y-2">
              <li><a href="#terms" style={{ color: 'var(--text-secondary)' }} className="hover:opacity-80 transition-opacity">Terms of Service</a></li>
              <li><a href="#privacy" style={{ color: 'var(--text-secondary)' }} className="hover:opacity-80 transition-opacity">Privacy Policy</a></li>
              <li><a href="#contact" style={{ color: 'var(--text-secondary)' }} className="hover:opacity-80 transition-opacity">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8 mt-8 flex flex-col md:flex-row justify-between items-center" style={{ borderColor: 'var(--border-color)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            © 2024 SurveyPro. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Twitter size={20} style={{ color: 'var(--text-muted)' }} className="hover:opacity-80 cursor-pointer transition-opacity" />
            <Github size={20} style={{ color: 'var(--text-muted)' }} className="hover:opacity-80 cursor-pointer transition-opacity" />
            <Linkedin size={20} style={{ color: 'var(--text-muted)' }} className="hover:opacity-80 cursor-pointer transition-opacity" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

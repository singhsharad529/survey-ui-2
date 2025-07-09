
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, BarChart3, Plus, Settings } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header style={{ 
      background: 'var(--bg-primary)', 
      borderBottom: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-light)',
      position:"sticky",
      top:0,
      zIndex:1000,
    }}
    
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BarChart3 style={{ color: 'var(--primary-blue)' }} size={32} />
            <span style={{ 
              color: 'var(--text-primary)', 
              fontSize: '28px', 
              fontWeight: '700' 
            }}>
              SurveyPro
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              style={{ 
                color: isActive('/') ? 'var(--primary-blue)' : 'var(--text-secondary)',
                fontWeight: isActive('/') ? '600' : '500'
              }}
              className="hover:opacity-80 transition-opacity"
              
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              style={{ 
                color: isActive('/dashboard') ? 'var(--primary-blue)' : 'var(--text-secondary)',
                fontWeight: isActive('/dashboard') ? '600' : '500'
              }}
              className="hover:opacity-80 transition-opacity"
            >
              Dashboard
            </Link>
            <Link 
              to="/create" 
              style={{ 
                color: isActive('/create') ? 'var(--primary-blue)' : 'var(--text-secondary)',
                fontWeight: isActive('/create') ? '600' : '500'
              }}
              className="hover:opacity-80 transition-opacity"
            >
              Create Survey
            </Link>
            <a 
              href="#contact" 
              style={{ color: 'var(--text-secondary)' }}
              className="hover:opacity-80 transition-opacity font-medium"
            >
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="professional-button-secondary p-2"
              style={{ padding: '8px' }}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <Link to="/create">
              <button className="professional-button-primary flex items-center space-x-2">
                <Plus size={16} />
                <span>Create Survey</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

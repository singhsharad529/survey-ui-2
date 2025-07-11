import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, BarChart3, Plus, Settings, X, Menu } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      style={{
        background: "var(--bg-primary)",
        borderBottom: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-light)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BarChart3 style={{ color: "var(--primary-blue)" }} size={32} />
            <span
              style={{
                color: "var(--text-primary)",
                fontSize: "28px",
                fontWeight: "700",
              }}
            >
              SurveyPro
            </span>
          </Link>

          {/* Navigation */}

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="space-x-8">
              <Link
                to="/"
                style={{
                  color: isActive("/")
                    ? "var(--primary-blue)"
                    : "var(--text-secondary)",
                  fontWeight: isActive("/") ? "600" : "500",
                }}
                className="hover:opacity-80 transition-opacity"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                style={{
                  color: isActive("/dashboard")
                    ? "var(--primary-blue)"
                    : "var(--text-secondary)",
                  fontWeight: isActive("/dashboard") ? "600" : "500",
                }}
                className="hover:opacity-80 transition-opacity"
              >
                Dashboard
              </Link>
              {/* <Link
                to="/create"
                style={{
                  color: isActive('/create') ? 'var(--primary-blue)' : 'var(--text-secondary)',
                  fontWeight: isActive('/create') ? '600' : '500'
                }}
                className="hover:opacity-80 transition-opacity"
              >
                Create Survey
              </Link> */}
              {/* <a
                href="#contact"
                style={{ color: 'var(--text-secondary)' }}
                className="hover:opacity-80 transition-opacity font-medium"
              >
                Contact
              </a> */}
            </nav>

            <Link to="/create">
              <button className="professional-button-primary flex items-center space-x-2">
                <Plus size={16} />
                <span>Create Survey</span>
              </button>
            </Link>
            <button
              onClick={toggleTheme}
              className="professional-button-secondary p-2"
              style={{ padding: "8px" }}
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          {/* Hamburger Menu */}
          <div className="md:hidden flex">
            <button
              onClick={toggleTheme}
              className="professional-button-secondary p-2"
              style={{ margin: "2px" }}
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2"
              style={{ color: "var(--primary-blue)" }}
            >
              <Menu size={28} />
            </button>
          </div>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Mobile Sidebar */}
          <aside
            className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-black z-[1000] transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "translate-x-full"
              }`}
            style={{ background: "var(--bg-primary)" }}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {" "}
                <Link to="/" className="flex items-center space-x-2">
                  <BarChart3
                    style={{ color: "var(--primary-blue)" }}
                    size={32}
                  />
                </Link>
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                style={{ color: "var(--primary-blue)" }}
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-4">
              <Link
                to="/"
                onClick={() => setSidebarOpen(false)}
                style={{
                  color: isActive("/")
                    ? "var(--primary-blue)"
                    : "var(--text-secondary)",
                  fontWeight: isActive("/") ? "600" : "500",
                }}
                className="hover:opacity-80 transition-opacity"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setSidebarOpen(false)}
                style={{
                  color: isActive("/dashboard")
                    ? "var(--primary-blue)"
                    : "var(--text-secondary)",
                  fontWeight: isActive("/dashboard") ? "600" : "500",
                }}
                className="hover:opacity-80 transition-opacity"
              >
                Dashboard
              </Link>
            </nav>
          </aside>
        </div>
      </div>
    </header>
  );
};

export default Header;

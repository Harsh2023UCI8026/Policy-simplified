/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import DashboardView from './components/DashboardView';
import PoliciesView from './components/PoliciesView';
import SimulatorView from './components/SimulatorView';
import CompareView from './components/CompareView';
import ReportsView from './components/ReportsView';
import WelcomeModal from './components/WelcomeModal';
import { Policy } from './types';
import { POLICIES } from './data';
import { normalizePolicies } from './utils/normalizeData';
const NORMALIZED_POLICIES = normalizePolicies(POLICIES);

export default function App() {
  // Navigation active tab page selector
  const [activeTab, setActiveTab] = useState<string>('landing');

  // Dark / Light visual mode state configuration
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check if user has initialized theme preference
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Welcome tour overlay modal open state (Onboarding Page 10)
  const [welcomeOpen, setWelcomeOpen] = useState<boolean>(true);

  // Global selected policy for dynamic updates of the whole suite
  const [selectedPolicy, setSelectedPolicy] = useState<Policy>(NORMALIZED_POLICIES[0]);

  // Handle stylesheet class attachment for dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Smooth routing transition helpers
  const handleGoToDashboard = () => {
    setActiveTab('dashboard');
  };

  const handleGoToSimulator = () => {
    setActiveTab('simulator');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#090D16] text-[#0F172A] dark:text-[#F8FAFC] transition-colors duration-200">
      
      {/* Onboarding Welcome Tour Overlay Modal (Screenshot Page 10) */}
      <WelcomeModal 
        isOpen={welcomeOpen}
        onClose={() => setWelcomeOpen(false)}
        onStartTour={() => {
          setWelcomeOpen(false);
          setActiveTab('dashboard'); // Route directly to active dashboard
        }}
      />

      {/* Header Sticky Navigation Panel */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenTour={() => setWelcomeOpen(true)}
      />

      {/* Main Responsive Body Canvas area */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage 
            onStart={handleGoToDashboard} 
            onGoToSimulator={handleGoToSimulator} 
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView 
            onSwitchTab={setActiveTab}
            selectedPolicy={selectedPolicy}
            setSelectedPolicy={setSelectedPolicy}
          />
        )}

        {activeTab === 'policies' && (
          <PoliciesView 
            onSwitchTab={setActiveTab}
            selectedPolicy={selectedPolicy}
            setSelectedPolicy={setSelectedPolicy}
          />
        )}

        {activeTab === 'simulator' && (
          <SimulatorView />
        )}

        {activeTab === 'compare' && (
          <CompareView selectedPolicy={selectedPolicy} />
        )}

        {activeTab === 'reports' && (
          <ReportsView />
        )}
      </main>

      {/* Global standard Footer matching the design precisely */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-12 transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          
          <div className="space-y-1">
            <div className="font-bold text-[#2563EB] dark:text-blue-400 text-xl font-bold">PoliShield</div>
            <p>© 2024 PoliShield. Fintech-grade Policy Intelligence.</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <button 
              onClick={() => alert("Loading Terms of Service guidelines...")}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => alert("Loading Privacy Policy files...")}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => alert("Loading Security Audit certifications logs...")}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Security Compliance
            </button>
            <button 
              onClick={() => alert("Opening Developer portal and integration documentation...")}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              API Docs
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
}

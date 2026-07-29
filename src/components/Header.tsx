/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Sun, Moon, HelpCircle, Menu, X, Rocket } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenTour: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  onOpenTour,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);

  // Read user info from localStorage (demo mode). In real app, replace with auth user data
  const storedName = typeof window !== 'undefined' ? (localStorage.getItem('user_name') || 'Amit Jain') : 'Amit Jain';
  const initials = storedName.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase();


  const navItems = [
    { id: 'landing', label: 'Welcome' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'policies', label: 'Policies' },
    { id: 'simulator', label: 'Simulator' },
    { id: 'compare', label: 'Compare (Ask AI)' },
    { id: 'reports', label: 'Reports' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-250 bg-white/95 text-slate-900 shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 dark:text-white transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand logo */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex cursor-pointer items-center gap-2.5 transition-transform hover:scale-102"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#2563EB] dark:text-blue-400">
            PoliShield
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex gap-1.5 lg:gap-3">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`relative px-3.5 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/40 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-[20%] right-[20%] h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Utility Toolbar Icons */}
        <div className="flex items-center gap-2">
          {/* Tour/Guide Help widget */}
          <button
            onClick={onOpenTour}
            title="Launch Welcome Tour"
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => {
              const newMode = !darkMode;
              console.log("[PoliShield Header] Changing theme. Previous: " + (darkMode ? "dark" : "light") + ", New: " + (newMode ? "dark" : "light"));
              setDarkMode(newMode);
            }}
            title="Toggle color theme"
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors cursor-pointer"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-amber-500 animate-[spin_40s_linear_infinite]" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </button>

          {/* User Profile Avatar block */}
          <div className="relative flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              aria-haspopup="true"
              aria-expanded={menuOpen}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white text-sm">
                {initials}
              </div>
              <span title={storedName} className="hidden lg:inline text-xs font-medium text-slate-600 dark:text-slate-300 truncate max-w-[8rem]">
                {storedName}
              </span>
            </button>

            {/* Dropdown menu */}
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg p-2 z-50">
                <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800" onClick={() => { alert('Open profile (demo)'); setMenuOpen(false); }}>
                  Profile
                </button>
                <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800" onClick={() => { setNotificationsOpen(!notificationsOpen); }}>
                  Notifications
                </button>
                <hr className="my-1" />
                <button className="w-full text-left px-3 py-2 rounded text-red-600 hover:bg-red-50" onClick={() => { localStorage.removeItem('user_name'); window.location.reload(); }}>
                  Logout
                </button>
              </div>
            )}

            {/* Simple notifications popover */}
            {notificationsOpen && (
              <div className="absolute right-12 top-full mt-2 w-64 rounded-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg p-3 z-50">
                <div className="text-xs text-slate-500 mb-2">Notifications</div>
                <div className="text-sm text-slate-700 dark:text-slate-200">No new notifications</div>
                <div className="mt-2 text-right">
                  <button className="text-xs text-blue-600" onClick={() => setNotificationsOpen(false)}>Close</button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 md:hidden dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Panel */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 px-4 pt-3 pb-5 md:hidden bg-white dark:border-slate-800 dark:bg-slate-900 transition-all">
          <div className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-12 transition-colors duration-200 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
        
        <div className="space-y-1">
          <div className="font-bold text-[#2563EB] dark:text-blue-400 text-xl">PoliShield</div>
          <p>© 2024 PoliShield. Fintech-grade Policy Intelligence.</p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <button 
            onClick={() => alert("Loading Terms of Service guidelines...")}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
          >
            Terms of Service
          </button>
          <button 
            onClick={() => alert("Loading Privacy Policy files...")}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => alert("Loading Security Audit certifications logs...")}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
          >
            Security Compliance
          </button>
          <button 
            onClick={() => alert("Opening Developer portal and integration documentation...")}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
          >
            API Docs
          </button>
        </div>

      </div>
    </footer>
  );
}

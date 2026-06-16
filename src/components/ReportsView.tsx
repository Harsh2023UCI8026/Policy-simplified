/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  FileDown, 
  Settings, 
  Trash2, 
  HelpCircle, 
  FolderIcon, 
  CheckCircle,
  Database,
  Compass,
  ArrowUpRight,
  TrendingUp,
  Inbox,
  ChevronDown
} from 'lucide-react';
import { ReportItem } from '../types';
import { REPLAY_REPORTS } from '../data';

export default function ReportsView() {
  
  // State representing the loaded reports
  const [reports, setReports] = React.useState<ReportItem[]>(REPLAY_REPORTS);
  const [selectedP, setSelectedP] = React.useState('hdfc-optima');
  const [selectedRepType, setSelectedRepType] = React.useState('Risk Assessment Analysis');

  // Triggering actions
  const handleDeleteReport = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
  };

  const handleDownloadBtn = (name: string) => {
    alert(`Initiating download for ${name}... Saved PDF cleanly inside local file directories.`);
  };

  const handleCreateMockReport = (e: React.FormEvent) => {
    e.preventDefault();
    const newRep: ReportItem = {
      id: `REP-${Date.now().toString().substring(8)}`,
      name: `${selectedP === 'hdfc-optima' ? 'HDFC Optima' : 'Niva Bupa ReAssure'} - Custom Generative Report`,
      type: selectedRepType,
      policyId: selectedP,
      date: 'Today',
      size: '4.2 MB',
      status: 'Ready'
    };
    setReports(prev => [newRep, ...prev]);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 font-sans">
      
      {/* Upper header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Reports
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Analyze and export comprehensive policy intelligence reports on demand.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side Column: Form & Report rows (7 of 12 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Form Filter selectors as shown in page 9 */}
          <form onSubmit={handleCreateMockReport} className="rounded-2xl border border-slate-205 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/40 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            
            <div className="space-y-1.5">
              <label htmlFor="select-policy-dropdown" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Select Policy
              </label>
              <div className="relative">
                <select
                  id="select-policy-dropdown"
                  value={selectedP}
                  onChange={(e) => setSelectedP(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-250 bg-white py-2.5 pl-4 pr-10 text-xs font-semibold text-slate-800 dark:border-slate-850 dark:bg-slate-905 dark:text-slate-100"
                >
                  <option value="hdfc-optima">Corporate Term Life v.2 (Active)</option>
                  <option value="icici-lombard">ICICI Lombard Health Shield</option>
                  <option value="niva-bupa">Niva Bupa ReAssure</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="report-type-dropdown" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Report Type
              </label>
              <div className="relative">
                <select
                  id="report-type-dropdown"
                  value={selectedRepType}
                  onChange={(e) => setSelectedRepType(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-250 bg-white py-2.5 pl-4 pr-10 text-xs font-semibold text-slate-800 dark:border-slate-850 dark:bg-slate-905 dark:text-slate-100"
                >
                  <option value="Risk Assessment Analysis">Risk Assessment Analysis</option>
                  <option value="Clause Coverage Breakdown">Clause Coverage Breakdown</option>
                  <option value="Regulatory Compliance Checklist">Regulatory Compliance Checklist</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow"
              >
                Compile Report
              </button>
            </div>

          </form>

          {/* List of Recent Reports with customized status lines */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/40">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100 dark:border-slate-805">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Recent Reports
              </h2>
              <span className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer font-semibold hover:underline">
                View All
              </span>
            </div>

            {reports.length === 0 ? (
              <div className="py-12 flex flex-col items-center text-center text-slate-400 select-none">
                <Inbox className="h-10 w-10 text-slate-350 mb-2.5" />
                <p className="text-xs">No active reports created yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map((rep) => (
                  <div key={rep.id} className="p-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-150 dark:bg-slate-950/20 dark:border-slate-850 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors">
                    <div className="flex gap-3.5 items-start">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg shrink-0">
                        <FolderIcon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                          {rep.name}
                        </h3>
                        <p className="text-[10px] text-slate-450 dark:text-slate-400 font-mono flex items-center gap-2">
                          <span>{rep.type}</span>
                          <span>•</span>
                          <span>{rep.size}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 justify-end">
                      <span className="text-[10px] text-slate-400 italic shrink-0">
                        Compiled on {rep.date}
                      </span>
                      
                      <button
                        onClick={() => handleDownloadBtn(rep.name)}
                        className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg dark:bg-slate-900 dark:border-slate-800 text-blue-600 hover:text-blue-700"
                        title="Download Data Report"
                      >
                        <FileDown className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteReport(rep.id)}
                        className="p-2 border border-slate-200 rounded-lg text-red-650 hover:bg-red-50 dark:border-slate-800 dark:hover:bg-red-955"
                        title="Delete Report Log"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Side Column: Usage & Analytics (4 of 12 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Storage Usage Card (Page 9) */}
          <div className="rounded-2xl border border-slate-200 bg-slate-950 text-white p-5 md:p-6 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-900/10 opacity-30 pointer-events-none" />
            
            <div className="relative z-10 space-y-4">
              <span className="text-[10px] font-bold text-blue-400 tracking-wider">STORAGE CAPACITY</span>
              
              <div className="space-y-1">
                <div className="text-3xl font-black font-mono">82.4 GB</div>
                <p className="text-xs text-slate-400">of 100 GB fintech-tier capacity utilized.</p>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full w-[82.4%]" />
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => alert("Launching workspace garbage collector...")} 
                  className="w-full py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl border border-slate-800 transition"
                >
                  Manage Workspace Space
                </button>
              </div>
            </div>
          </div>

          {/* Metric Overview (Page 9) */}
          <div className="rounded-2xl border border-slate-202 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/40 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Analytics Summary</h3>
            
            <div className="space-y-3.5">
              {[
                { label: 'Reports Scanned (month)', val: '24' },
                { label: 'Average AI Accuracy', val: '99.8%' },
                { label: 'Saved Premium Leakages', val: '₹9,82,500' }
              ].map((row, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs pb-3 border-b border-dashed border-slate-100 last:border-b-0 last:pb-0 dark:border-slate-850">
                  <span className="text-slate-650 dark:text-slate-400 font-medium">{row.label}</span>
                  <span className="font-extrabold text-slate-955 dark:text-white font-mono">{row.val}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-150 dark:border-slate-805">
              <a 
                href="#dashboard"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Redirecting to comprehensive corporate logging panel...");
                }}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                Go to Analytics Dashboard
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Pro Tip Star details (Page 9) */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5 dark:border-blue-950 dark:bg-blue-950/25">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 rounded-lg shrink-0 text-xs">
                💡
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-950 dark:text-blue-300">Pro Tip</div>
                <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-sans">
                  Use the "Comparative Benchmarking" report to see how your current policy stacks against top market competitors in real-time.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

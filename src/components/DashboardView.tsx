/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ShieldAlert, 
  CheckCircle, 
  Coins, 
  Clock, 
  Calendar,
  Layers, 
  FileCheck, 
  Compass, 
  Search, 
  TrendingUp, 
  AlertTriangle,
  ArrowRight,
  Eye,
  Settings,
  ChevronDown,
  Info
} from 'lucide-react';
import { Policy, Clause } from '../types';
import { POLICIES, HEATMAP_CLAUSES } from '../data';

interface DashboardViewProps {
  onSwitchTab: (tab: string) => void;
  selectedPolicy: Policy;
  setSelectedPolicy: (policy: Policy) => void;
}

export default function DashboardView({ 
  onSwitchTab, 
  selectedPolicy, 
  setSelectedPolicy 
}: DashboardViewProps) {
  
  // Local state for the sub-tab category selection in UI
  const [activeSubTab, setActiveSubTab] = React.useState<'benefits' | 'sublimits' | 'addons'>('benefits');
  
  // Local simulated loading state for compiling/scanning full report
  const [isGeneratingReport, setIsGeneratingReport] = React.useState(false);
  const [reportSuccessMsg, setReportSuccessMsg] = React.useState('');

  // Local list of active fixes (user can "Fix" critical mismatches and close them!)
  const [fixedMismatches, setFixedMismatches] = React.useState<string[]>([]);

  const handleFixMismatch = (title: string) => {
    setFixedMismatches(prev => [...prev, title]);
  };

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    setReportSuccessMsg('');
    setTimeout(() => {
      setIsGeneratingReport(false);
      setReportSuccessMsg('Successfully compiled comprehensive policy report! Saved to Reports directory.');
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 font-sans">
      
      {/* Alert Banner / Notification for completed simulation/actions */}
      {reportSuccessMsg && (
        <div className="mb-6 rounded-xl bg-green-50 border border-green-200 p-4 text-green-900 flex justify-between items-center dark:bg-green-950/40 dark:border-green-900 dark:text-green-250 animate-bounce">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">{reportSuccessMsg}</span>
          </div>
          <button 
            onClick={() => onSwitchTab('reports')}
            className="text-xs font-bold underline cursor-pointer hover:text-green-700 dark:hover:text-green-150"
          >
            Go to Reports
          </button>
        </div>
      )}

      {/* Upper Main Dashboard Title with interactive Policy Selector dropdown */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Policy Intelligence Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
            Real-time risk assessment for policy 
            <span className="font-mono font-bold text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded text-xs select-all">
              {selectedPolicy.code}
            </span>
          </p>
        </div>

        {/* Policy dropdown switcher */}
        <div className="flex items-center gap-2">
          <label htmlFor="policy-selector" className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Selected Policy:
          </label>
          <div className="relative">
            <select
              id="policy-selector"
              value={selectedPolicy.id}
              onChange={(e) => {
                const found = POLICIES.find(p => p.id === e.target.value);
                if (found) setSelectedPolicy(found);
              }}
              className="appearance-none font-medium text-xs rounded-xl border border-slate-250 bg-white pl-4 pr-10 py-2.5 text-slate-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-905 dark:text-slate-100"
            >
              {POLICIES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-450 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 4 Core Metrics Grid (Page 8) */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        
        {/* Health Score Component */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40 relative">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            HEALTH SCORE
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
              {selectedPolicy.healthScore}
            </span>
            <span className="text-sm font-medium text-slate-500">/100</span>
          </div>
          <div className="mt-3.5 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600" 
              style={{ width: `${selectedPolicy.healthScore}%` }}
            />
          </div>
          <div className="mt-2 text-xs flex items-center gap-1 text-slate-500">
            <CheckCircle className="h-3.5 w-3.5 text-green-500" />
            <span>Satisfies major IRDAI regulations.</span>
          </div>
        </div>

        {/* Total Sum Insured Coverage */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            TOTAL COVERAGE
          </div>
          <div className="mt-2.5 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              ₹{(selectedPolicy.totalCoverage).toLocaleString('en-IN')}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Comprehensive Health Plan</p>
          <div className="mt-8 text-xs text-blue-500 font-semibold hover:underline cursor-pointer flex items-center gap-0.5" onClick={() => onSwitchTab('policies')}>
            Compare custom caps <ArrowRight className="h-3 w-3" />
          </div>
        </div>

        {/* Risk Level Gauge */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            RISK LEVEL
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <span className={`text-xl font-extrabold px-3 py-1 rounded-lg ${
              selectedPolicy.riskLevel === 'Low'
                ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400'
                : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
            }`}>
              {selectedPolicy.riskLevel}
            </span>
            {selectedPolicy.riskLevel === 'Moderate' && (
              <AlertTriangle className="h-5 w-5 text-amber-550 animate-[bounce_2s_infinite]" />
            )}
          </div>
          <p className="mt-3 text-xs text-slate-500">Moderate risk identified under Room Rent guidelines.</p>
          <div className="mt-4 text-xs font-medium text-slate-400">
            {selectedPolicy.riskLevel === 'Moderate' ? '2 Violations Detected' : '0 Violations Detected'}
          </div>
        </div>

        {/* Waiting Period Gauge */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            WAITING PERIOD
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {selectedPolicy.waitingPeriodDays} Days
            </span>
          </div>
          <p className="mt-1 text-xs text-amber-600 font-medium flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            {selectedPolicy.waitingPeriodStatus}
          </p>
          <p className="mt-4 text-xs text-slate-400">Applies to pre-existing conditions</p>
        </div>

      </div>

      {/* Shortcut Quick Action Buttons (Simulate Claim, Compare, Ask AI, Export) */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button 
          onClick={() => onSwitchTab('simulator')}
          className="flex items-center gap-2.5 px-4.5 py-2.5 bg-slate-50 border border-slate-250 text-slate-750 font-semibold rounded-xl text-xs hover:border-slate-350 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-705 transition-all"
        >
          <Compass className="h-4 w-4 text-blue-500" />
          Simulate Claim
        </button>

        <button 
          onClick={() => onSwitchTab('policies')}
          className="flex items-center gap-2.5 px-4.5 py-2.5 bg-slate-50 border border-slate-250 text-slate-750 font-semibold rounded-xl text-xs hover:border-slate-350 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-705 transition-all"
        >
          <Layers className="h-4 w-4 text-indigo-500" />
          Compare Policies
        </button>

        <button 
          onClick={() => onSwitchTab('compare')}
          className="flex items-center gap-2.5 px-4.5 py-2.5 bg-slate-50 border border-slate-250 text-slate-750 font-semibold rounded-xl text-xs hover:border-slate-350 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-705 transition-all"
        >
          <FileCheck className="h-4 w-4 text-green-500" />
          Ask AI
        </button>

        <button 
          onClick={handleGenerateReport}
          className="flex items-center gap-2.5 px-4.5 py-2.5 bg-slate-50 border border-slate-250 text-slate-750 font-semibold rounded-xl text-xs hover:border-slate-350 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-705 transition-all"
        >
          <TrendingUp className="h-4 w-4 text-teal-500" />
          Export Report
        </button>
      </div>

      {/* Main Analysis Block: Left (Heatmap & scanned clauses), Right (AI Insights) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Left Grid: Heatmap or Scanned clauses summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Policy Risk Heatmap
              </h2>
              {/* Legends */}
              <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-500" /> High Risk
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-500" /> Medium Risk
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-green-500" /> Safe Bonus
                </span>
              </div>
            </div>

            {/* List of high fidelity risk cards from Policy scans */}
            <div className="space-y-3.5">
              {HEATMAP_CLAUSES.map((clause, idx) => {
                const borderClass = clause.type === 'High Risk' 
                  ? 'border-red-200 bg-red-50/50 dark:border-red-950 dark:bg-red-950/20' 
                  : clause.type === 'Medium Risk'
                  ? 'border-amber-200 bg-amber-50/40 dark:border-amber-950 dark:bg-amber-950/20'
                  : 'border-green-200 bg-green-50/40 dark:border-green-950 dark:bg-green-950/20';
                
                const badgeColor = clause.type === 'High Risk'
                  ? 'text-red-700 bg-red-100'
                  : clause.type === 'Medium Risk'
                  ? 'text-amber-700 bg-amber-100'
                  : 'text-green-700 bg-green-100';

                return (
                  <div key={idx} className={`p-4 rounded-xl border ${borderClass} transition-all hover:translate-x-1 duration-150`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                        {clause.section}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${badgeColor}`}>
                        {clause.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-sans">
                      {clause.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Grid: AI Extraction Insights with Fix triggers */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40 flex flex-col justify-between h-full min-h-[440px]">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                AI Extraction Insights
              </h2>

              <div className="space-y-4">
                {selectedPolicy.mismatches.map((item, idx) => {
                  const isFixed = fixedMismatches.includes(item.title);
                  
                  // Hide or dim fixed elements
                  if (isFixed) {
                    return (
                      <div key={idx} className="p-3 border border-dashed border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-850 dark:bg-slate-950/30 rounded-xl flex items-center justify-between text-xs transition-all duration-200">
                        <span className="line-through font-medium">{item.title}</span>
                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-500">Fixed</span>
                      </div>
                    );
                  }

                  const accentClass = item.type === 'critical' 
                    ? 'border-red-200 bg-red-50/50 text-red-900' 
                    : item.type === 'alert'
                    ? 'border-amber-250 bg-amber-50/55 text-amber-900'
                    : 'border-blue-200 bg-blue-50/50 text-blue-900';

                  return (
                    <div key={idx} className={`p-4 border rounded-xl flex items-start gap-3 transition-colors ${accentClass}`}>
                      <Info className="h-4.5 w-4.5 shrink-0 mt-0.5 text-blue-600" />
                      <div className="space-y-1.5 flex-1 select-none">
                        <div className="text-[11px] font-extrabold tracking-wider">{item.title}</div>
                        <p className="text-xs leading-relaxed opacity-90">{item.description}</p>
                        
                        <div className="pt-1.5">
                          <button
                            onClick={() => handleFixMismatch(item.title)}
                            className="bg-slate-900 hover:bg-black text-white dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-1 rounded text-[10px] font-bold transition-all"
                          >
                            Fix
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Generate Full Report button with interactive loaders */}
            <div className="pt-6 border-t border-slate-150 dark:border-slate-800">
              <button
                onClick={handleGenerateReport}
                disabled={isGeneratingReport}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-blue-605 text-white bg-blue-600 hover:bg-blue-700 py-3 text-sm font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isGeneratingReport ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Analyzing policy terms...
                  </>
                ) : (
                  'Generate Full Report'
                )}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Insurer Trust block (with radial gauge/pie representation) */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-6">
          Insurer Trust Score
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Circular dial simulation */}
          <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-205 dark:border-slate-800 pb-6 md:pb-0 md:pr-6">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-slate-100 dark:border-slate-800">
              {/* Semi-circular tracking bar indicator around the circle */}
              <div 
                className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent border-r-transparent rotate-45"
                style={{ opacity: 0.85 }}
              />
              <div className="text-center">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  {selectedPolicy.trustScore}
                </span>
                <span className="block text-[10px] text-slate-500 font-bold">/100</span>
              </div>
            </div>
            
            <p className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400">
              Fintech Solvency Rating
            </p>
          </div>

          {/* Breakdown blocks */}
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { label: 'Claim Settlement', val: `${selectedPolicy.claimSettlementRatio}%` },
              { label: 'Customer Reviews', val: `${selectedPolicy.customerReviews}/5` },
              { label: 'IRDAI Complaints', val: selectedPolicy.complaintsLevel, color: selectedPolicy.complaintsLevel === 'Low' ? 'text-green-600' : 'text-amber-500' },
              { label: 'Financial Stability', val: selectedPolicy.financialStability, color: 'text-indigo-600 dark:text-indigo-400' },
              { label: 'Transparency', val: `${selectedPolicy.transparency}%` }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl text-center border border-slate-150 dark:border-slate-805">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                <div className={`text-sm sm:text-base font-extrabold ${stat.color || 'text-slate-900 dark:text-white'}`}>
                  {stat.val}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Advanced dynamic Tabs: Left (Benefits/Sublimits/Addons togglable), Right (Critical Clauses table list) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Left Sub-Tab layout */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40">
          
          {/* Sub-tab Headers */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 mb-5 pb-1">
            {(['benefits', 'sublimits', 'addons'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`flex-1 text-center py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  activeSubTab === tab 
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Sub-tab Contents */}
          <div>
            {activeSubTab === 'benefits' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.values(selectedPolicy.benefits).map((benefit, idx) => (
                  <div key={idx} className="bg-slate-55 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-150 dark:border-slate-850 p-4 rounded-xl">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">{benefit.title}</div>
                    <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 mt-1">{benefit.value}</div>
                    <p className="text-xs text-slate-500 dark:text-slate-450 mt-1">{benefit.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeSubTab === 'sublimits' && (
              <ul className="space-y-3.5">
                {selectedPolicy.subLimits.map((limit, idx) => {
                  const lbl = typeof limit === 'string' ? limit : (limit.label || JSON.stringify(limit));
                  const capText = typeof limit === 'object' && (limit.capPercent || limit.capAmount)
                    ? (limit.capPercent ? `${limit.capPercent}%` : `₹${(limit.capAmount || 0).toLocaleString('en-IN')}`) + (limit.unit === 'perDay' ? ' /day' : limit.unit === 'perClaim' ? ' /claim' : '')
                    : undefined;
                  return (
                    <li key={idx} className="flex gap-2.5 items-start text-xs text-slate-700 dark:text-slate-300">
                      <span className="h-5 w-5 shrink-0 rounded-full bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-600 font-bold text-[10px]">!</span>
                      <span>{lbl}{capText ? ` — ${capText}` : ''}</span>
                    </li>
                  );
                })}
              </ul>
            )}

            {activeSubTab === 'addons' && (
              <ul className="space-y-3">
                {selectedPolicy.addOns.map((addon, idx) => (
                  <li key={idx} className="flex gap-2.5 items-center text-xs text-slate-700 dark:text-slate-200">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                    <span>{addon}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>

        {/* Right Critical Clauses accordions panel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Critical Clauses
            </h2>
            <button 
              onClick={() => {
                alert('Downloading Policy Critical Clause summary in PDF format...');
              }} 
              className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Export PDF
            </button>
          </div>

          {/* Clauses list table structure */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {selectedPolicy.criticalClauses.map((clause, idx) => {
              const badgeClass = clause.status === 'Standard'
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                : clause.status === 'Restrictive'
                ? 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400'
                : clause.status === 'Premium'
                ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400'
                : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400';

              return (
                <div key={clause.id} className="p-3 bg-slate-50/50 hover:bg-slate-50 dark:bg-slate-950/20 border border-slate-150 dark:border-slate-850 rounded-xl space-y-1.5 transition-colors">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {clause.id}
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${badgeClass}`}>
                      {clause.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-350 leading-relaxed font-sans">
                    {clause.description}
                  </p>
                  {clause.extendedInfo && (
                    <p className="text-[10px] text-slate-400 italic font-mono pt-1 border-t border-slate-100 dark:border-slate-850">
                      ℹ️ {clause.extendedInfo}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Recent Analysis Selection List */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/40">
        <h2 className="text-base font-bold text-slate-100 dark:text-white text-slate-950 mb-4">
          Recent Analyses
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-350">
            <thead className="text-[10px] font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th colSpan={2} className="py-2">Policy Name</th>
                <th className="py-2">Processed Date</th>
                <th className="py-2 text-right">Health Score</th>
                <th className="py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 dark:divide-slate-800">
              {POLICIES.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-850/20">
                  <td className="py-4 w-8">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-[11px] ${p.logoColor}`}>
                      {p.code.substring(4, 7)}
                    </div>
                  </td>
                  <td className="py-4 font-semibold text-slate-900 dark:text-white">
                    {p.name}
                    <span className="block text-[10px] text-slate-400 font-normal">{p.company}</span>
                  </td>
                  <td className="py-4 text-slate-500">Oct 12, 2023</td>
                  <td className="py-4 text-right font-extrabold text-blue-600 dark:text-blue-400">
                    {p.healthScore}/100
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedPolicy(p);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 hover:bg-blue-100 rounded-lg font-bold"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

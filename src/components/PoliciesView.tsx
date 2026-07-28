/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Plus, X, Check, ArrowRight, Search, 
  Download, Loader2, RefreshCw, AlertTriangle, Info, Sparkles 
} from 'lucide-react';
import { Policy } from '../types';
import { POLICIES } from '../data';

interface PoliciesViewProps {
  onSwitchTab: (tab: string) => void;
  selectedPolicy: Policy;
  setSelectedPolicy: (policy: Policy) => void;
}

interface Toast {
  id: string;
  text: string;
  type: 'success' | 'info' | 'error';
}

export default function PoliciesView({ 
  onSwitchTab,
  selectedPolicy,
  setSelectedPolicy
}: PoliciesViewProps) {
  
  // Custom Toasts state matching standard notification overlays
  const [toasts, setToasts] = useState<Toast[]>([]);

  // State monitoring which policies are being compared
  const [comparedIds, setComparedIds] = useState<string[]>([
    'hdfc-optima',
    'icici-lombard',
    'niva-bupa'
  ]);

  // Loading indicator state handles
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);

  // Modal display states
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDetailPolicy, setSelectedDetailPolicy] = useState<Policy | null>(null);
  const [policyToRemove, setPolicyToRemove] = useState<Policy | null>(null);

  // Search query state for adding policies
  const [searchQuery, setSearchQuery] = useState('');

  const addToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleRemovePolicy = (id: string) => {
    const policy = POLICIES.find(p => p.id === id);
    if (!policy) return;

    if (comparedIds.length <= 1) {
      addToast("Please keep at least one policy for comparison.", "error");
      return;
    }

    setPolicyToRemove(policy);
  };

  const confirmRemovePolicy = () => {
    if (!policyToRemove) return;
    const id = policyToRemove.id;
    setComparedIds(prev => prev.filter(item => item !== id));
    addToast(`${policyToRemove.name} removed from comparison`, "info");
    setPolicyToRemove(null);
  };

  const handleAddPolicy = (id: string) => {
    if (comparedIds.includes(id)) {
      addToast("Policy is already being compared.", "info");
      return;
    }

    setAddingId(id);
    setTimeout(() => {
      setComparedIds(prev => [...prev, id]);
      const addedPolicy = POLICIES.find(p => p.id === id);
      addToast(`${addedPolicy?.name || 'Policy'} added successfully!`, "success");
      setAddingId(null);
      setSearchQuery('');
    }, 450); // Animated 450ms load transition
  };

  const handleResetComparison = () => {
    setComparedIds(['hdfc-optima', 'icici-lombard', 'niva-bupa']);
    addToast("Comparison reset to default", "info");
  };

  const handleOpenAnalysis = () => {
    setIsAnalysisLoading(true);
    setTimeout(() => {
      setIsAnalysisLoading(false);
      setShowAnalysisModal(true);
    }, 500); // 0.5s loading delay for premium feel
  };

  const triggerPDFDownload = (fileName: string) => {
    addToast(`Downloading report: ${fileName}...`, "success");
    setTimeout(() => {
      addToast(`Report downloaded successfully!`, "success");
    }, 1500);
  };

  // Generate the list of policies in active compare list
  const activeComparison = POLICIES.filter(p => comparedIds.includes(p.id));
  
  // Policies available to add to list (excluding active and keeping the popular list)
  const availablePoliciesToAdd = POLICIES.filter(p => !comparedIds.includes(p.id));

  // Filter available policies by search query
  const filteredSuggestions = availablePoliciesToAdd.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Highlight key comparison factors
  const COMPARISON_ROWS = [
    {
      feat: 'Room Rent Ceiling Cap',
      keyField: 'roomLimit',
      betterIds: ['hdfc-optima', 'niva-bupa', 'tata-medicare', 'star-comprehensive', 'reliance-health', 'bajaj-health'], 
      values: {
        'hdfc-optima': 'No Sub-limits (Single Private)',
        'icici-lombard': 'Capped at 1% of Sum Insured daily',
        'niva-bupa': 'No restrictions under policy guidelines',
        'star-comprehensive': 'Single standard AC room covered',
        'care-health': 'Up to ₹5,500 daily limit',
        'tata-medicare': 'No caps (Single Private AC Suite)',
        'reliance-health': 'Standard single private AC room',
        'bajaj-health': 'Single private AC room (capped at 1% daily)'
      }
    },
    {
      feat: 'ICU Charge Cap limits',
      keyField: 'icuLimit',
      betterIds: ['hdfc-optima', 'niva-bupa', 'tata-medicare', 'bajaj-health'],
      values: {
        'hdfc-optima': 'No restrictions or ceilings',
        'icici-lombard': 'Capped at 2% of Sum Insured daily',
        'niva-bupa': 'No limitations (Actual nursing costs)',
        'star-comprehensive': 'Covered up to 2% sum insured',
        'care-health': 'Capped at ₹11,000 daily limit',
        'tata-medicare': 'No Sub-limits',
        'reliance-health': 'Capped at 2% sum insured daily',
        'bajaj-health': 'No Sub-limits standard'
      }
    },
    {
      feat: 'Cataract Treatments Limit',
      keyField: 'cataract',
      betterIds: ['icici-lombard', 'tata-medicare'],
      values: {
        'hdfc-optima': 'Capped at ₹75,000 per eye',
        'icici-lombard': 'Up to actual surgical bills',
        'niva-bupa': 'Capped at ₹1,00,000 per claim',
        'star-comprehensive': 'Up to ₹50,000 per eye limit',
        'care-health': 'Capped up to ₹60,000 limit',
        'tata-medicare': 'Up to actual surgical bills',
        'reliance-health': 'Capped at ₹65,000 per claim',
        'bajaj-health': 'Capped up to ₹80,000 limit'
      }
    },
    {
      feat: 'AYUSH Treatments Support',
      keyField: 'ayush',
      betterIds: ['hdfc-optima', 'niva-bupa', 'care-health', 'tata-medicare', 'bajaj-health'],
      values: {
        'hdfc-optima': '100% Covered (All Government Centers)',
        'icici-lombard': 'Up to 50% max allowance limits',
        'niva-bupa': 'Fully covered across authorized',
        'star-comprehensive': 'Covered up to ₹25,000/year limit',
        'care-health': 'Included up to full Sum Insured',
        'tata-medicare': 'Covered up to 100% of SI limit',
        'reliance-health': 'Covered up to 60% of SI standard',
        'bajaj-health': 'Covered in full standard 100%'
      }
    },
    {
      feat: 'Air Ambulance Coverage',
      keyField: 'airAmbulance',
      betterIds: ['niva-bupa', 'tata-medicare'],
      values: {
        'hdfc-optima': 'Excluded except in extreme life danger',
        'icici-lombard': 'Excluded from core health benefits',
        'niva-bupa': 'Covered up to ₹2,50,000 per instance',
        'star-comprehensive': 'Up to specified standard limits',
        'care-health': 'Standard premium limits boundary',
        'tata-medicare': 'Covered in full standard amount',
        'reliance-health': 'Capped at ₹3,000 per admission',
        'bajaj-health': 'Covered actuals within standard bounds'
      }
    },
    {
      feat: 'Claim Settlement Ratio',
      keyField: 'settlement',
      betterIds: ['icici-lombard'],
      values: {
        'hdfc-optima': '92% verified solvency record',
        'icici-lombard': '96% - Superb premium record log',
        'niva-bupa': '91.4% standard claim payout',
        'star-comprehensive': '89.9% claims approved',
        'care-health': '92.6% solvency track',
        'tata-medicare': '94.2% verified standard ratio',
        'reliance-health': '91.2% approved claims standard',
        'bajaj-health': '92.2% approved ratio standard'
      }
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 font-sans relative">
      
      {/* Title with Reset Selection Header controls */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Policy Comparison Engine
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Analyze key differences in side-by-side structures to find the best fit for your budget.
          </p>
        </div>
        
        <button
          onClick={handleResetComparison}
          className="self-start sm:self-center flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-250 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          title="Reset back to default policies"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reset comparison
        </button>
      </div>

      {/* Comparisons Headers Cards row (Page 7) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        
        {/* Placeholder: Add Policy Card */}
        <div 
          onClick={() => setShowAddModal(true)}
          className="rounded-2xl border-2 border-dashed border-slate-250 bg-slate-50/50 p-6 flex flex-col items-center justify-center text-center dark:border-slate-800 dark:bg-slate-900/10 cursor-pointer hover:border-blue-500 hover:bg-blue-50/10 dark:hover:border-blue-800 transition-all duration-200 min-h-[190px]"
        >
          <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
            <Plus className="h-5 w-5 text-slate-500 dark:text-slate-400" />
          </div>
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-350">Add Policy</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 mb-2">Integrate more options side-by-side</p>
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">Configure new plan</span>
        </div>

        {/* Active compared policies cards */}
        {activeComparison.map((p) => {
          const isRecommended = p.id === 'icici-lombard';
          return (
            <div 
              key={p.id}
              onClick={() => setSelectedDetailPolicy(p)}
              className={`group relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 hover:scale-102 hover:shadow-lg cursor-pointer ${
                isRecommended 
                  ? 'border-blue-500 bg-blue-50/25 dark:border-blue-600 dark:bg-blue-950/20' 
                  : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/55'
              }`}
            >
              {/* Recommended Badge tag */}
              {isRecommended && (
                <span className="absolute top-0 -translate-y-1/2 left-6 bg-blue-600 text-white font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                  RECOMMENDED
                </span>
              )}

              {/* Delete close icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Avoid opening selection Details Modal on close button click
                  handleRemovePolicy(p.id);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label={`Remove ${p.name} from comparison`}
              >
                <X className="h-4 w-4" />
              </button>

              <div className="space-y-4">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-extrabold text-xs tracking-tight ${p.logoColor}`}>
                  {p.code.substring(4, 7)}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400 mt-1 font-medium">{p.company}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-150 dark:border-slate-800">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Annual Premium</div>
                    <div className="text-base font-extrabold text-slate-900 dark:text-white">
                      ₹{(p.annualPremium).toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Health Score</div>
                    <div className="text-sm font-bold text-blue-650 dark:text-blue-400">
                      {p.healthScore}/100
                    </div>
                  </div>
                </div>

                <div className="text-center pt-1 border-t border-dashed border-slate-100 dark:border-slate-800/50">
                  <span className="text-[10px] font-semibold text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    View Details &rarr;
                  </span>
                </div>
              </div>
            </div>
          );
        })}

      </div>

      {/* Comparisons matrix tabular details */}
      <div className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40 p-5 shadow-xs mb-8 overflow-hidden">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-300">
            Granular Clause Comparison
          </h2>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 hidden sm:inline">
            * Highlighted cells indicate optimal clause value
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 sticky top-0 bg-white dark:bg-slate-950 z-10 py-2">
                <th className="py-3 font-bold uppercase tracking-wider w-1/4">Feature Details</th>
                {activeComparison.map(p => (
                  <th key={p.id} className="py-3 font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/65">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors group">
                  <td className="py-4 font-bold text-slate-800 dark:text-slate-350 pr-4">
                    {row.feat}
                  </td>
                  {activeComparison.map(p => {
                    const isOptimal = row.betterIds.includes(p.id);
                    return (
                      <td key={p.id} className="py-4 pr-3">
                        <div className={`p-2 rounded-xl text-slate-650 dark:text-slate-400 transition-all ${
                          isOptimal 
                            ? 'bg-green-50/60 dark:bg-green-950/20 text-green-800 dark:text-green-300 border border-green-100/50 dark:border-green-900/30' 
                            : 'bg-slate-50/20 text-slate-600 border border-slate-100/10'
                        }`}>
                          <div className="flex items-start gap-1.5">
                            {isOptimal && <Check className="h-3.5 w-3.5 text-green-500 shrink-0 mt-0.5" />}
                            <span>{row.keyField === 'settlement' ? `${p.claimSettlementRatio}%` : (row.values[p.id as keyof typeof row.values] || '-')}</span>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended banner at bottom of screenshot (Page 7) */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50/30 p-6 md:p-8 dark:border-blue-950 dark:bg-blue-950/15 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-450 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4" />
            PolicyShield Recommends
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
            Switch to <span className="text-blue-600 dark:text-blue-400 underline decoration-2">ICICI Lombard Health Shield</span> to save <span className="text-green-600 dark:text-green-400">₹2,400/year</span> while gaining 'No Room Rent Cap' and a 4% higher claim settlement ratio.
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              'Lower annual premium rate',
              'No sub-limits on standard rent',
              'Better overall solvency coverage ratio'
            ].map((pt, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-350">
                <Check className="h-4 w-4 text-green-500 shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 shrink-0 md:text-right">
          <button
            onClick={handleOpenAnalysis}
            disabled={isAnalysisLoading}
            className="w-full md:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs whitespace-nowrap inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            {isAnalysisLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Processing...
              </>
            ) : (
              'View Full Analysis'
            )}
          </button>
          
          <div className="text-[9px] font-mono text-slate-400 leading-none">
            Verified by AI Engine v4.2
          </div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* BUG 1 MODAL: View Full Analysis breakdown */}
      {/* ========================================================================= */}
      {showAnalysisModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-slide-up">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    Full Comparative Analysis
                  </h3>
                  <p className="text-xs text-slate-400">
                    ICICI Lombard Health Shield vs HDFC Ergo Optima Restore
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowAnalysisModal(false)}
                className="text-slate-400 hover:text-slate-650 dark:hover:text-slate-250 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              
              {/* Savings Breakdown Callout */}
              <div className="bg-green-50/50 dark:bg-green-950/15 border border-green-150 dark:border-green-900/30 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-700 dark:text-green-400 font-bold uppercase tracking-wider">Premium Savings Calculation</p>
                  <p className="text-xs text-slate-500 mt-1">₹12,500 <span className="text-[10px] italic">(HDFC)</span> &minus; ₹10,100 <span className="text-[10px] italic">(ICICI)</span></p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-green-600 dark:text-green-400">₹2,400 / yr</span>
                  <span className="block text-[10px] text-green-500 font-semibold uppercase tracking-wider">Net Savings</span>
                </div>
              </div>

              {/* Six Comparison Features Structure */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Granular Feature Scorecard</h4>
                
                {[
                  {
                    title: "Room Rent Ceiling Cap",
                    desc: "HDFC offers true Single Private Room cover. ICICI Lombard restricts daily charges to 1% of the Sum Insured.",
                    icici: { better: false, label: "1% limit daily (₹5,000)" },
                    hdfc: { better: true, label: "No Sub-limits (Single Room)" }
                  },
                  {
                    title: "ICU Charge Cap limits",
                    desc: "ICICI caps daily ICU at 2% sum insured daily, whereas HDFC has completely uncapped ICU room options.",
                    icici: { better: false, label: "Capped at 2% SI daily" },
                    hdfc: { better: true, label: "No ceilings" }
                  },
                  {
                    title: "Cataract Treatments",
                    desc: "ICICI covers up to actual surgical bills natively. HDFC general cap is hard restricted to ₹75,000.",
                    icici: { better: true, label: "Up to actual bills" },
                    hdfc: { better: false, label: "Capped at ₹75,000 max" }
                  },
                  {
                    title: "AYUSH Treatments Support",
                    desc: "HDFC covers 100% of SI in certified departments, while ICICI restricts AYUSH allowance strictly to 50%.",
                    icici: { better: false, label: "50% max allowance limit" },
                    hdfc: { better: true, label: "100% Fully Covered" }
                  },
                  {
                    title: "Air Ambulance Coverage",
                    desc: "HDFC permits air ambulance triggers in life hazard cases, while ICICI excludes it on fundamental policies.",
                    icici: { better: false, label: "Fully Excluded" },
                    hdfc: { better: true, label: "Covered in life urgency" }
                  },
                  {
                    title: "Claim Settlement Ratio",
                    desc: "ICICI maintains a stellar 96% verified ratio, giving them standard advantage over HDFC's 92% solvency.",
                    icici: { better: true, label: "96.0% Approved" },
                    hdfc: { better: false, label: "92.0% Solvency Ratio" }
                  }
                ].map((item, index) => (
                  <div key={index} className="border border-slate-100 dark:border-slate-800 p-4 rounded-2xl space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 dark:text-slate-450 leading-relaxed font-sans">{item.desc}</p>
                    
                    <div className="grid grid-cols-2 gap-3.5 pt-2">
                      <div className={`p-2 rounded-xl text-center border ${
                        item.icici.better 
                          ? 'bg-green-50/40 border-green-200/50 dark:bg-green-950/10 dark:border-green-900/30' 
                          : 'bg-red-50/30 border-red-100/40 dark:bg-red-950/5 dark:border-red-950/20'
                      }`}>
                        <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold">
                          {item.icici.better ? (
                            <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
                          ) : (
                            <X className="h-3.5 w-3.5 text-red-500 shrink-0" />
                          )}
                          <span className={item.icici.better ? 'text-green-700 dark:text-green-400' : 'text-slate-600 dark:text-slate-400 font-medium'}>
                            ICICI: {item.icici.label}
                          </span>
                        </div>
                      </div>

                      <div className={`p-2 rounded-xl text-center border ${
                        item.hdfc.better 
                          ? 'bg-green-50/40 border-green-200/50 dark:bg-green-950/10 dark:border-green-900/30' 
                          : 'bg-red-50/30 border-red-100/40 dark:bg-red-950/5 dark:border-red-950/20'
                      }`}>
                        <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold">
                          {item.hdfc.better ? (
                            <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
                          ) : (
                            <X className="h-3.5 w-3.5 text-red-500 shrink-0" />
                          )}
                          <span className={item.hdfc.better ? 'text-green-700 dark:text-green-400' : 'text-slate-600 dark:text-slate-400 font-medium'}>
                            HDFC Ergo: {item.hdfc.label}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-350 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => triggerPDFDownload("ICICI_Lombard_vs_HDFC_Optima_Full_Analysis.pdf")}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Download className="h-4 w-4" />
                Download Report
              </button>
            </div>

          </div>
        </div>
      )}


      {/* ========================================================================= */}
      {/* BUG 2 MODAL: Add New Policy Dialog */}
      {/* ========================================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-slide-up">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  Add New Policy
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Expand options configured inside standard insurance sandboxes
                </p>
              </div>
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setSearchQuery('');
                }}
                className="text-slate-400 hover:text-slate-650 dark:hover:text-slate-250 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Search Input */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800 relative">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search policies or companies..."
                  className="w-full bg-white dark:bg-slate-800 border border-slate-250 dark:border-slate-700 rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none text-slate-850 dark:text-slate-105"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 dark:hover:text-slate-250 text-[10px] uppercase font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Modal Body: List of policy suggestions */}
            <div className="p-6 max-h-[50vh] overflow-y-auto space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                {searchQuery ? 'Search matches' : 'Popular standard policies'}
              </h4>

              {filteredSuggestions.length > 0 ? (
                <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredSuggestions.map((p) => {
                    const isAdding = addingId === p.id;
                    return (
                      <div 
                        key={p.id}
                        className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0 font-sans"
                      >
                        <div className="flex gap-3 items-start flex-1 min-w-0">
                          <div className={`h-8 w-8 rounded-lg shrink-0 flex items-center justify-center font-extrabold text-[10px] tracking-widest ${p.logoColor}`}>
                            {p.code.substring(4, 7)}
                          </div>
                          <div className="truncate">
                            <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {p.name}
                            </h5>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">{p.company}</p>
                            <div className="flex items-center gap-2 mt-1.5 label-tags">
                              <span className="text-[9px] font-extrabold text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/40 px-2 py-0.5 rounded-sm">
                                Score: {p.healthScore}/100
                              </span>
                              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400">
                                Premium: ₹{p.annualPremium.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleAddPolicy(p.id)}
                          disabled={addingId !== null}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
                        >
                          {isAdding ? (
                            <>
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            'Add'
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <p className="text-xs font-medium">No policy options found matching your query.</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-blue-600 dark:text-blue-400 mt-2 hover:underline inline-block font-semibold"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSearchQuery('');
                }}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-350 cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}


      {/* ========================================================================= */}
      {/* BUG 3 MODAL: Detailed Policy Information Overlay */}
      {/* ========================================================================= */}
      {selectedDetailPolicy && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-slide-up">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex gap-3.5 items-center">
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center font-black text-xs tracking-wider ${selectedDetailPolicy.logoColor}`}>
                  {selectedDetailPolicy.code.substring(4, 7)}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    {selectedDetailPolicy.name}
                  </h3>
                  <p className="text-xs text-slate-400">{selectedDetailPolicy.company}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedDetailPolicy(null)}
                className="text-slate-400 hover:text-slate-650 dark:hover:text-slate-250 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
              
              {/* Primary info badges */}
              <div className="grid grid-cols-3 gap-3.5">
                <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Annual Premium</span>
                  <span className="block text-sm font-extrabold text-slate-950 dark:text-white mt-1">
                    ₹{selectedDetailPolicy.annualPremium.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sum Insured</span>
                  <span className="block text-sm font-extrabold text-slate-950 dark:text-white mt-1">
                    ₹{selectedDetailPolicy.totalCoverage.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Health Score</span>
                  <span className="block text-sm font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                    {selectedDetailPolicy.healthScore} / 100
                  </span>
                </div>
              </div>

              {/* Key Details Sheet */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Plan Parameters Breakdown</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex justify-between p-2.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">Waiting Period:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{selectedDetailPolicy.waitingPeriodDays} days</span>
                  </div>
                  <div className="flex justify-between p-2.5 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400">Co-payment:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {selectedDetailPolicy.id === 'star-comprehensive' ? '10% (above 60)' : '0%'}
                    </span>
                  </div>
                  <div className="flex justify-between p-2.5 border-b border-slate-150 dark:border-slate-800">
                    <span className="text-slate-400">Trust Index Score:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{selectedDetailPolicy.trustScore}%</span>
                  </div>
                  <div className="flex justify-between p-2.5 border-b border-slate-150 dark:border-slate-800">
                    <span className="text-slate-400">Claim Settlement Ratio:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{selectedDetailPolicy.claimSettlementRatio}%</span>
                  </div>
                  <div className="flex justify-between p-2.5 border-b border-slate-150 dark:border-slate-800">
                    <span className="text-slate-400">Network Hospitals:</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      {selectedDetailPolicy.id === 'hdfc-optima' ? '11,200+' : 
                       selectedDetailPolicy.id === 'icici-lombard' ? '9,800+' :
                       selectedDetailPolicy.id === 'niva-bupa' ? '8,400+' : '9,000+'}
                    </span>
                  </div>
                  <div className="flex justify-between p-2.5 border-b border-slate-150 dark:border-slate-800">
                    <span className="text-slate-400">Financial Solvency:</span>
                    <span className="font-bold text-slate-900 dark:text-white uppercase">{selectedDetailPolicy.financialStability} Rating</span>
                  </div>
                </div>
              </div>

              {/* Sub-limits & Exclusions Lists */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Pros Section */}
                <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-150 dark:border-slate-800">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Pros & Callouts</h4>
                  <div className="space-y-2">
                    {[
                      'Excellent default ' + selectedDetailPolicy.benefits.restoration.value + ' Restoration benefits',
                      selectedDetailPolicy.subLimits[0]?.replace('Room Rent: ', '') || 'No hard capping rules',
                      'No restriction pre-post hospitalization boundaries',
                      'Solvency status level is highly robust'
                    ].slice(0, 3).map((item, index) => (
                      <div key={index} className="flex gap-2 text-xs text-slate-650 dark:text-slate-350">
                        <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        <span className="font-sans">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cons Section */}
                <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-150 dark:border-slate-800">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Cons & Cautions</h4>
                  <div className="space-y-2">
                    {selectedDetailPolicy.subLimits.filter(val => val.includes('Capped') || val.includes('limit') || val.includes('Rent: ')).length > 0 ? (
                      selectedDetailPolicy.subLimits.map((item, index) => (
                        <div key={index} className="flex gap-2 text-xs text-slate-650 dark:text-slate-350">
                          <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                          <span className="font-sans truncate">{item.replace('Room Rent: ', '').replace('ICU Charges: ', '')}</span>
                        </div>
                      )).slice(0, 3)
                    ) : (
                      <>
                        <div className="flex gap-2 text-xs text-slate-650 dark:text-slate-350">
                          <X className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>Standard slow disease exclusions apply</span>
                        </div>
                        <div className="flex gap-2 text-xs text-slate-650 dark:text-slate-350">
                          <X className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>Waiting period required: {selectedDetailPolicy.waitingPeriodDays} days</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setSelectedDetailPolicy(null)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-350 cursor-pointer"
              >
                Close
              </button>
              
              <button
                onClick={() => {
                  setSelectedDetailPolicy(null);
                  addToast("Detail state focus loaded on comparison table", "info");
                  const scrollTarget = document.querySelector('table');
                  if (scrollTarget) {
                    scrollTarget.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs rounded-xl text-slate-800 dark:text-slate-200 transition cursor-pointer"
              >
                Compare with others
              </button>

              <button
                onClick={() => triggerPDFDownload(`${selectedDetailPolicy.id}_Full_Diagnostic.pdf`)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Download className="h-4 w-4" />
                View Full Report
              </button>
            </div>

          </div>
        </div>
      )}


      {/* ========================================================================= */}
      {/* LOCAL CONFIRMATION DELETION MODAL */}
      {/* ========================================================================= */}
      {policyToRemove && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-55 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-sm border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-center space-y-4 animate-scale-up">
            <div className="mx-auto h-12 w-12 rounded-full bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-500">
              <AlertTriangle className="h-6 w-6" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Remove from Comparison?
              </h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to remove <span className="font-semibold text-slate-800 dark:text-white">{policyToRemove.name}</span>?
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setPolicyToRemove(null)}
                className="flex-1 py-2 border border-slate-250 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-350 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemovePolicy}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ========================================================================= */}
      {/* SHADCN-LIKE FLOATING TOAST NOTIFICATIONS PORTAL */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-55 w-full max-w-sm pointer-events-none">
        {toasts.map(t => (
          <div 
            key={t.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-start gap-3 w-full animate-slide-in ${
              t.type === 'success' 
                ? 'bg-emerald-50 dark:bg-slate-900 border-emerald-250 dark:border-emerald-950 text-emerald-900 dark:text-emerald-400' 
                : t.type === 'info'
                ? 'bg-blue-50 dark:bg-slate-900 border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-400'
                : 'bg-red-50 dark:bg-slate-900 border-red-200 dark:border-red-950 text-red-900 dark:text-red-400'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {t.type === 'success' ? (
                <Check className="h-4.5 w-4.5 text-emerald-500" />
              ) : t.type === 'info' ? (
                <Info className="h-4.5 w-4.5 text-blue-500" />
              ) : (
                <AlertTriangle className="h-4.5 w-4.5 text-red-500" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold leading-none capitalize">{t.type} Notification</p>
              <p className="text-xs mt-1 text-slate-650 dark:text-slate-350 leading-relaxed font-sans">{t.text}</p>
            </div>
            <button 
              onClick={() => setToasts(prev => prev.filter(item => item.id !== t.id))}
              className="text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>


    </div>
  );
}

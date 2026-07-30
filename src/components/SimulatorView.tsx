/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import ThemeSelect from './ThemeSelect';
import { 
  Compass, 
  HelpCircle, 
  Clock, 
  CheckCircle, 
  Activity, 
  AlertTriangle,
  Download,
  Save,
  Check,
  ChevronDown
} from 'lucide-react';

export default function SimulatorView() {
  
  // Interactive Simulator inputs
  const [claimType, setClaimType] = React.useState<'Motor' | 'Health'>('Motor');
  const [incidentType, setIncidentType] = React.useState('Accident');
  const [damageAmount, setDamageAmount] = React.useState(250000);
  
  const [garageType, setGarageType] = React.useState<'Network' | 'Non-Network'>('Network');
  const [fault, setFault] = React.useState<'My Fault' | 'Third Party' | 'No Fault'>('Third Party');
  
  // Add-ons checklist
  const [zeroDep, setZeroDep] = React.useState(true);
  const [engineProtect, setEngineProtect] = React.useState(false);
  const [roadsideAsst, setRoadsideAsst] = React.useState(true);
  const [personalAccident, setPersonalAccident] = React.useState(false);

  // Simulated state for active fixes/actions on potential risks
  const [fixedDocs, setFixedDocs] = React.useState(false);
  const [fixedTimeline, setFixedTimeline] = React.useState(false);

  // Interactive buttons loaders
  const [loadingSimulation, setLoadingSimulation] = React.useState(false);
  const [saveStatus, setSaveStatus] = React.useState('');

  // Auto update incidents based on claim type
  React.useEffect(() => {
    if (claimType === 'Health') {
      setIncidentType('Cardiac Treatment');
    } else {
      setIncidentType('Accident');
    }
  }, [claimType]);

  // Comprehensive math model formula for real-time calculations
  // Base deductible
  const standardDeductible = claimType === 'Motor' ? 5000 : 3500;
  
  // Depreciation factor if zero depreciation add-on is missing
  const depreciationDeduction = (!zeroDep && claimType === 'Motor') 
    ? Math.round(damageAmount * 0.12) // 12% depreciation
    : 0;

  // Co-payment factor based on garage type & fault rules
  let coPayPercentage = 0;
  if (claimType === 'Motor') {
    if (garageType === 'Non-Network') coPayPercentage += 0.05; // 5% penalty for non-network
    if (fault === 'My Fault') coPayPercentage += 0.05; // 5% co-pay for my fault
    if (fault === 'Third Party') coPayPercentage += 0.02; // 2%
  } else {
    // Health rules
    coPayPercentage = 0.05; // Standard 5% Co-pay
    if (garageType === 'Non-Network') coPayPercentage += 0.10; // Extra 10% co-pay for non-network hospital
  }
  const coPaymentValue = Math.round(damageAmount * coPayPercentage);

  // Add-on benefits return values
  let addonBenefits = 0;
  if (claimType === 'Motor') {
    if (roadsideAsst) addonBenefits += 1500;
    if (engineProtect) addonBenefits += 4000;
  } else {
    // Health benefits addon
    if (personalAccident) addonBenefits += 6000;
  }

  // Final Calculations bounding limits
  const totalDeductions = standardDeductible + depreciationDeduction + coPaymentValue - addonBenefits;
  const insurancePays = Math.max(0, Math.min(damageAmount, damageAmount - totalDeductions));
  const youPay = Math.max(0, damageAmount - insurancePays);

  // Settlement TAT prediction
  const settlementTime = garageType === 'Network' ? '5-7 days' : '10-14 days';
  
  // Dynamic confidence probability
  let approvalProbability = 94;
  if (fault === 'My Fault') approvalProbability -= 15;
  if (garageType === 'Non-Network') approvalProbability -= 8;
  if (!zeroDep) approvalProbability -= 5;
  if (fixedDocs) approvalProbability += 5;
  approvalProbability = Math.max(50, Math.min(99, approvalProbability));

  const handleSimulateBtn = () => {
    setLoadingSimulation(true);
    setTimeout(() => {
      setLoadingSimulation(false);
    }, 1200);
  };

  const handleSaveScenario = () => {
    setSaveStatus('Saving current scenario...');
    setTimeout(() => {
      setSaveStatus('Scenario draft saved to workspace reports!');
      setTimeout(() => setSaveStatus(''), 2500);
    }, 800);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 font-sans">
      
      {/* Title block corresponding to Page 1 */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Simulate Your Claim Outcome
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          See exactly what you'll get paid before you lodge an official claim, and patch requirements to avoid denial.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Claim Inputs Form (8 of 12 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-205 dark:border-slate-800 dark:bg-slate-900/40 p-5 md:p-6 space-y-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            Claim Details Input
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Claim Type Selection */}
            <div className="space-y-1.5 animate-relative">
              <label htmlFor="claim-type" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Claim Type
              </label>
              <div className="relative">
                <ThemeSelect
                  id="claim-type"
                  value={claimType}
                  onChange={(e) => setClaimType((e.target as HTMLSelectElement).value as 'Motor' | 'Health')}
                  className="w-full appearance-none rounded-xl border border-slate-250 bg-white py-3 pl-4 pr-10 text-xs font-semibold text-slate-800 dark:border-slate-850 dark:bg-slate-905 dark:text-slate-100"
                >
                  <option value="Motor">Motor Coverage</option>
                  <option value="Health">Health / Medical Coverage</option>
                </ThemeSelect>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-450 pointer-events-none" />
              </div>
            </div>

            {/* Incident Type Selection */}
            <div className="space-y-1.5">
              <label htmlFor="incident-type" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Incident Type
              </label>
              <div className="relative">
                <ThemeSelect
                  id="incident-type"
                  value={incidentType}
                  onChange={(e) => setIncidentType((e.target as HTMLSelectElement).value)}
                  className="w-full appearance-none rounded-xl border border-slate-250 bg-white py-3 pl-4 pr-10 text-xs font-semibold text-slate-800 dark:border-slate-850 dark:bg-slate-905 dark:text-slate-100"
                >
                  {claimType === 'Motor' ? (
                    <>
                      <option value="Accident">Accident (Major Collision)</option>
                      <option value="Minor Scratch">Minor Scratch/Dent</option>
                      <option value="Theft">Vandalism or Partial Theft</option>
                      <option value="Windshield">Windshield Cracked Glass</option>
                    </>
                  ) : (
                    <>
                      <option value="Cardiac Treatment">Cardiac Specialized Surgery</option>
                      <option value="Inpatient Fever">Multi-day Dengue Admission</option>
                      <option value="Knee Joint Replace">Knee Joint Arthroscopy</option>
                      <option value="Daycare Cataract">Bilateral Cataract Treatment</option>
                    </>
                  )}
                </ThemeSelect>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-450 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Amount Slider Block */}
          <div className="space-y-3 p-4 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-150 dark:border-slate-850 rounded-2xl relative">
            <div className="flex justify-between items-center">
              <label htmlFor="damage-amount-slider" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Damage Amount Estimate
              </label>
              <span className="text-lg font-black text-blue-600 dark:text-blue-400 font-mono">
                ₹{damageAmount.toLocaleString('en-IN')}
              </span>
            </div>
            
            <input
              id="damage-amount-slider"
              type="range"
              min="10000"
              max="1000000"
              step="5000"
              value={damageAmount}
              onChange={(e) => setDamageAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            
            <div className="flex justify-between text-[10px] font-bold text-slate-450 dark:text-slate-500">
              <span>₹10,000</span>
              <span>₹10,00,000</span>
            </div>
          </div>

          {/* Custom radio layout for Garage Type & Fault */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Facility/Garage type radio cards */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {claimType === 'Motor' ? 'Garage Type' : 'Hospital Network'}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGarageType('Network')}
                  className={`py-3 px-4 text-xs font-semibold rounded-xl border text-center transition ${
                    garageType === 'Network'
                      ? 'border-blue-500 bg-blue-50/40 text-blue-700 dark:border-blue-600 dark:bg-blue-950/20 dark:text-blue-300'
                      : 'border-slate-200 bg-white hover:bg-slate-55 text-slate-655 dark:border-slate-850 dark:bg-slate-905 dark:text-slate-200'
                  }`}
                >
                  Network
                </button>
                <button
                  type="button"
                  onClick={() => setGarageType('Non-Network')}
                  className={`py-3 px-4 text-xs font-semibold rounded-xl border text-center transition ${
                    garageType === 'Non-Network'
                      ? 'border-blue-500 bg-blue-50/40 text-blue-700 dark:border-blue-600 dark:bg-blue-950/20 dark:text-blue-300'
                      : 'border-slate-200 bg-white hover:bg-slate-55 text-slate-655 dark:border-slate-850 dark:bg-slate-905 dark:text-slate-200'
                  }`}
                >
                  Non-Network
                </button>
              </div>
            </div>

            {/* Responsibility Fault Radio selection */}
            {claimType === 'Motor' ? (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Fault Responsibility
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['My Fault', 'Third Party', 'No Fault'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFault(opt)}
                      className={`py-3 px-1.5 text-[11px] font-semibold rounded-xl border text-center transition ${
                        fault === opt
                          ? 'border-blue-500 bg-blue-50/40 text-blue-700 dark:border-blue-600 dark:bg-blue-950/20 dark:text-blue-300'
                          : 'border-slate-200 bg-white hover:bg-slate-55 text-slate-655 dark:border-slate-850 dark:bg-slate-905 dark:text-slate-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  Admitting Ward Class
                  <HelpCircle className="h-3 w-3 text-slate-400" />
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFault('Third Party')} // re-use fault to simplify health state
                    className={`py-3 px-3 text-xs font-semibold rounded-xl border text-center transition ${
                      fault === 'Third Party'
                        ? 'border-blue-500 bg-blue-50/20 text-blue-700 dark:border-blue-600 dark:bg-blue-950/20 dark:text-blue-300'
                        : 'border-slate-200 bg-white text-slate-600 dark:border-slate-850 dark:bg-slate-905 dark:text-slate-200'
                    }`}
                  >
                    Standard Private Room
                  </button>
                  <button
                    type="button"
                    onClick={() => setFault('My Fault')} // triggers high deductible
                    className={`py-3 px-3 text-xs font-semibold rounded-xl border text-center transition ${
                      fault === 'My Fault'
                        ? 'border-blue-500 bg-blue-50/20 text-blue-700 dark:border-blue-600 dark:bg-blue-950/20 dark:text-blue-300'
                        : 'border-slate-200 bg-white text-slate-600 dark:border-slate-850 dark:bg-slate-905 dark:text-slate-200'
                    }`}
                  >
                    Deluxe Suite Room
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Active Addons Checklist layout */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Addon Covers on Insured policy
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Zero Depreciation add-on */}
              <label className="flex items-start gap-3 p-3 border border-slate-150 rounded-xl cursor-pointer hover:bg-slate-50 dark:border-slate-850 dark:hover:bg-slate-800/35 relative">
                <input
                  type="checkbox"
                  checked={zeroDep}
                  onChange={(e) => setZeroDep(e.target.checked)}
                  className="mt-0.5 h-4.5 w-4.5 rounded border-slate-350 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <div>
                  <div className="text-xs font-bold text-slate-850 dark:text-white">Zero Depreciation</div>
                  <p className="text-[10px] text-slate-450 mt-0.5">Saves cost-depreciation deductions on rubber/glass items.</p>
                </div>
              </label>

              {/* Engine Protect add-on */}
              <label className="flex items-start gap-3 p-3 border border-slate-150 rounded-xl cursor-pointer hover:bg-slate-50 dark:border-slate-850 dark:hover:bg-slate-800/35 relative">
                <input
                  type="checkbox"
                  checked={engineProtect}
                  disabled={claimType !== 'Motor'}
                  onChange={(e) => setEngineProtect(e.target.checked)}
                  className="mt-0.5 h-4.5 w-4.5 rounded border-slate-350 text-blue-600 focus:ring-blue-500 disabled:opacity-40 cursor-pointer"
                />
                <div className={claimType !== 'Motor' ? 'opacity-40' : ''}>
                  <div className="text-xs font-bold text-slate-850 dark:text-white">Engine Protect Cover</div>
                  <p className="text-[10px] text-slate-450 mt-0.5">Claims for hydrostatic lock or water intake damages inside engine block.</p>
                </div>
              </label>

              {/* Roadside Assistance cover */}
              <label className="flex items-start gap-3 p-3 border border-slate-150 rounded-xl cursor-pointer hover:bg-slate-50 dark:border-slate-850 dark:hover:bg-slate-800/35 relative">
                <input
                  type="checkbox"
                  checked={roadsideAsst}
                  disabled={claimType !== 'Motor'}
                  onChange={(e) => setRoadsideAsst(e.target.checked)}
                  className="mt-0.5 h-4.5 w-4.5 rounded border-slate-350 text-blue-600 focus:ring-blue-500 disabled:opacity-40 cursor-pointer"
                />
                <div className={claimType !== 'Motor' ? 'opacity-40' : ''}>
                  <div className="text-xs font-bold text-slate-850 dark:text-white">Roadside Assistance</div>
                  <p className="text-[10px] text-slate-450 mt-0.5">Complimentary towing services up to ₹1,500 benefit.</p>
                </div>
              </label>

              {/* Personal Accident assist add-on */}
              <label className="flex items-start gap-3 p-3 border border-slate-150 rounded-xl cursor-pointer hover:bg-slate-50 dark:border-slate-850 dark:hover:bg-slate-800/35 relative">
                <input
                  type="checkbox"
                  checked={personalAccident}
                  onChange={(e) => setPersonalAccident(e.target.checked)}
                  className="mt-0.5 h-4.5 w-4.5 rounded border-slate-350 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <div>
                  <div className="text-xs font-bold text-slate-850 dark:text-white">Personal Accident Cover</div>
                  <p className="text-[10px] text-slate-450 mt-0.5">Cash payout benefits if injury leads to temporary disability.</p>
                </div>
              </label>

            </div>
          </div>

          {/* Simulate Outcome trigger button */}
          <div className="pt-2">
            <button
              onClick={handleSimulateBtn}
              disabled={loadingSimulation}
              className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 text-sm transition shadow-md disabled:opacity-50"
            >
              {loadingSimulation ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Running claims model simulation...
                </>
              ) : (
                'Run Dynamic Simulation'
              )}
            </button>
          </div>

        </div>

        {/* Right Side: Claims Calculation Results Panel (5 of 12 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main payout visual panel (Page 1) */}
          <div className="rounded-2xl border border-slate-205 bg-white p-5 md:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/40 space-y-6">
            
            {/* Top payout highlights */}
            <div className="grid grid-cols-2 gap-4 pb-5 border-b border-slate-150 dark:border-slate-800">
              
              {/* Insurance Pays card */}
              <div className="space-y-1.5 p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-950">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  INSURANCE PAYS
                </span>
                <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
                  ₹{insurancePays.toLocaleString('en-IN')}
                </div>
              </div>

              {/* You Pay deductible card */}
              <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  YOU PAY (DEDUCTIBLE)
                </span>
                <div className="text-xl sm:text-2xl font-black text-slate-950 dark:text-slate-100 font-mono">
                  ₹{youPay.toLocaleString('en-IN')}
                </div>
              </div>

            </div>

            {/* Middle SLA timeline & Probability blocks (Page 1) */}
            <div className="grid grid-cols-2 gap-4 items-center">
              
              {/* SLA Settlement timeline */}
              <div className="flex items-center gap-3">
                <Clock className="h-10 w-10 text-blue-500 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">SETTLEMENT TIME</div>
                  <div className="text-sm font-black text-blue-650 dark:text-blue-400">{settlementTime}</div>
                </div>
              </div>

              {/* Circular approval likelihood */}
              <div className="flex items-center gap-2.5">
                <div className="relative h-11 w-11 shrink-0 rounded-full border-2 border-green-500/30 flex items-center justify-center font-bold font-mono text-[11px] text-green-700 dark:text-green-400">
                  <div className="absolute inset-0 h-11 w-11 rounded-full border-2 border-green-500 border-t-transparent" />
                  {approvalProbability}%
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">PROBABILITY</div>
                  <div className="text-xs font-bold text-green-700 dark:text-green-400">Very High</div>
                </div>
              </div>

            </div>

            {/* Payout Breakdown detail metrics (Page 1 accordion) */}
            <div className="pt-2">
              <div className="p-4 bg-slate-50 dark:bg-slate-950/20 rounded-xl space-y-3.5 border border-slate-150 dark:border-slate-850">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Payout Breakdown details
                </div>

                <div className="space-y-2 text-xs font-sans">
                  <div className="flex justify-between">
                    <span className="text-slate-650 dark:text-slate-350">Gross Damage Estimate</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      ₹{damageAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between text-red-650 dark:text-red-400">
                    <span>Standard Deductibles</span>
                    <span>-₹{standardDeductible.toLocaleString('en-IN')}</span>
                  </div>

                  {depreciationDeduction > 0 && (
                    <div className="flex justify-between text-red-650 dark:text-red-400">
                      <span>Depreciation Deduction</span>
                      <span>-₹{depreciationDeduction.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-red-650 dark:text-red-400">
                    <span>Co-payment allocation ({coPayPercentage * 100}%)</span>
                    <span>-₹{coPaymentValue.toLocaleString('en-IN')}</span>
                  </div>

                  {addonBenefits > 0 && (
                    <div className="flex justify-between text-green-650 dark:text-green-400 font-medium">
                      <span>Add-on Coverage Benefits</span>
                      <span>+₹{addonBenefits.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex justify-between font-bold text-slate-950 dark:text-white">
                    <span>Final Estimated Payout</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono">
                      ₹{insurancePays.toLocaleString('en-IN')}
                    </span>
                  </div>

                </div>
              </div>
            </div>

            {/* Dynamic list of potential warnings/risks that can be FIXED! */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                POTENTIAL CLAIMS RISKS
              </span>

              {/* Missing docs risk */}
              {!fixedDocs ? (
                <div className="flex items-center justify-between p-3 border border-red-200 bg-red-50/50 dark:border-red-950 dark:bg-red-950/20 text-red-950 rounded-xl">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4.5 w-4.5 text-red-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Missing Documents</div>
                      <p className="text-[10px] text-red-700 mt-0.5">Workshop estimate not uploaded</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setFixedDocs(true)}
                    className="px-3 py-1 bg-red-900 text-white rounded text-[10px] font-bold hover:bg-black transition-colors"
                  >
                    Fix
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-3 border border-dashed border-green-200 bg-green-50/30 text-green-700 dark:border-green-950 dark:bg-green-950/10 rounded-xl text-xs">
                  <span className="h-4 w-4 bg-green-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">✓</span>
                  <span className="font-medium">Workshop estimate successfully loaded.</span>
                </div>
              )}

              {/* Incident timeline review risk */}
              {!fixedTimeline ? (
                <div className="flex items-center justify-between p-3 border border-amber-200 bg-amber-50/50 dark:border-amber-950 dark:bg-amber-950/20 text-amber-950 rounded-xl">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4.5 w-4.5 text-amber-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Incident Timeline Warning</div>
                      <p className="text-[10px] text-amber-700 mt-0.5 font-sans">Reporting delay may trigger manual check</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFixedTimeline(true)}
                    className="px-3 py-1 bg-amber-900 text-white rounded text-[10px] font-bold hover:bg-amber-950 transition-colors"
                  >
                    Fix
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-3 border border-dashed border-green-200 bg-green-50/30 text-green-700 dark:border-green-950 dark:bg-green-950/10 rounded-xl text-xs">
                  <span className="h-4 w-4 bg-green-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">✓</span>
                  <span className="font-medium">Incident statement timeline patched with GPS records.</span>
                </div>
              )}

            </div>

            {/* Simulated Live status updates ticker */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600"></span>
              </span>
              <span>AI is evaluating your coverage potential based on current market trends...</span>
            </div>

          </div>

          {/* Action footers (Save Scenario, Export PDF) */}
          <div className="flex gap-3">
            <button
              onClick={handleSaveScenario}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-250 bg-white hover:bg-slate-50 font-bold text-slate-705 dark:border-slate-800 dark:bg-slate-905 dark:text-slate-200 text-xs transition"
            >
              <Save className="h-4 w-4" />
              Save Scenario
            </button>

            <button
              onClick={() => {
                alert("Generating comprehensive claim risk outcome catalog PDF...");
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold text-xs transition"
            >
              <Download className="h-4 w-4" />
              Export PDF
            </button>
          </div>

          {saveStatus && (
            <p className="text-center text-xs font-semibold text-green-600 dark:text-green-450 animate-bounce pt-1">
              {saveStatus}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

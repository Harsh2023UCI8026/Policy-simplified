/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  FileUp, 
  HelpCircle, 
  ShieldCheck, 
  Lock, 
  Settings, 
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Brain,
  Layers,
  Database
} from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onStart: () => void;
  onGoToSimulator: () => void;
}

export default function LandingPage({ onStart, onGoToSimulator }: LandingPageProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadStatus, setUploadStatus] = React.useState('');
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const handleSimulatedUpload = () => {
    setIsUploading(true);
    setUploadStatus('Parsing policy document...');
    setUploadProgress(10);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            onStart(); // Route directly to active dashboard upon successful scan
          }, 800);
          return 100;
        }
        const next = prev + 15;
        if (next === 40) setUploadStatus('Decrypting with AES-256...');
        else if (next === 70) setUploadStatus('Scanning IRDAI regulatory rules...');
        else if (next === 90) setUploadStatus('Calculating rejection risk indices...');
        return next > 100 ? 100 : next;
      });
    }, 250);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 font-sans">
      
      {/* Hero Header Area */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            Fintech-Grade Policy Intelligence
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[46px] leading-[1.12] dark:text-white">
            Understand Your Insurance. <br />
            <span className="text-blue-600 dark:text-blue-400">Predict Claim Rejections.</span>
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-350 leading-relaxed max-w-lg">
            Every year, over <span className="font-semibold text-slate-900 dark:text-white">₹26,000 crore</span> in insurance claims are rejected due to complex hidden clauses. Our AI decodes your policy in seconds, ensuring you get the coverage you deserve.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {isUploading ? (
              <div className="flex-1 max-w-sm rounded-xl border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-950 dark:bg-blue-950/20">
                <div className="flex justify-between text-xs font-medium text-blue-700 dark:text-blue-400 mb-1.5">
                  <span className="animate-pulse">{uploadStatus}</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div 
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={handleSimulatedUpload}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-4.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-all active:scale-98"
              >
                <FileUp className="h-5 w-5" />
                Upload Policy PDF
              </button>
            )}

            <button
              onClick={onStart}
              className="flex items-center justify-center rounded-xl border border-slate-250 bg-white px-6 py-4.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-905 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              Explore Sandbox Dashboard
            </button>
          </div>
          
          <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            <Lock className="h-3.5 w-3.5 text-slate-400" />
            Supports HDFC Ergo, ICICI Lombard, Niva Bupa, Star Health & more.
          </div>
        </div>

        {/* Realistic graphical scanned simulation layout */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 p-6 md:p-8 flex items-center justify-center">
            {/* Scanned paper mock representation */}
            <div className="relative w-full max-w-[340px] border border-slate-200 bg-white p-5 rounded-xl shadow-xl dark:border-slate-800 dark:bg-slate-950">
              <div className="absolute top-2 right-2 flex items-center gap-1 rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold text-blue-600 dark:bg-blue-950/50">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping" />
                AI Scanning
              </div>
              
              {/* Document Mock lines */}
              <div className="space-y-4 font-mono text-[10px] text-slate-500">
                <div className="flex justify-between border-b pb-2">
                  <div className="font-bold text-slate-800 dark:text-slate-350">POLICY_HEALTH_SHIELD</div>
                  <div>POL-88293</div>
                </div>
                
                <div className="space-y-2">
                  <div className="h-2 bg-slate-100 dark:bg-slate-850 rounded w-5/6" />
                  <div className="h-2 bg-slate-150 dark:bg-slate-850 rounded w-full" />
                  <div className="h-2 bg-slate-100 dark:bg-slate-850 rounded w-4/6" />
                </div>

                <div className="border border-amber-200 bg-amber-50/50 p-2.5 rounded-lg text-amber-800 text-[10px] space-y-1">
                  <div className="font-bold flex items-center gap-1 text-[11px] text-amber-900">
                    ⚠️ ALERT DETECTED
                  </div>
                  <div>Pre-existing thyroid excluded under Clause 4.2 of policy annexures.</div>
                </div>

                <div className="space-y-1.5">
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-850 rounded w-11/12" />
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-850 rounded w-3/4" />
                </div>
              </div>

              {/* Laser scanning visual bar effect */}
              <div className="absolute inset-x-0 top-1/4 h-0.5 bg-blue-500 shadow-lg shadow-blue-500/80 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* 3 Step Workflow Section */}
      <div className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-16">
        <div className="text-center space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">HOW IT WORKS</p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Precision in Three Simple Steps</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Built on bank-grade security and advanced LLMs</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              step: '1',
              title: 'Upload',
              desc: 'Securely upload your policy PDF or image. We support all major health and life insurers.',
              icon: FileUp,
              color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400'
            },
            {
              step: '2',
              title: 'AI Analyzes',
              desc: 'Our fintech-grade AI scans for sub-limits, waiting periods, and exclusion clauses instantly.',
              icon: Brain,
              color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400'
            },
            {
              step: '3',
              title: 'Get Insights',
              desc: 'Receive a clear rejection-risk score and actionable tips to avoid future claim denials.',
              icon: TrendingUp,
              color: 'text-green-600 bg-green-50 dark:bg-green-950/40 dark:text-green-400'
            }
          ].map((item, idx) => (
            <div key={idx} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">
                {item.step}. {item.title}
              </h3>
              <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-sans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Encryption Panel */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white text-center mb-10">Why Trust PoliShield?</h2>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* AES Encryption Card */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 dark:border-slate-800 dark:bg-slate-900/50 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <ShieldCheck className="h-4 w-4" />
                ENTERPRISE SECURITY
              </div>

              <h3 className="text-xl font-bold text-slate-950 dark:text-white">Bank-Grade Encryption</h3>
              <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed font-sans">
                Your data is encrypted end-to-end. We never share your policy details with third parties or insurers without your explicit consent. Security is at the heart of our architecture.
              </p>
            </div>

            {/* Glowing Encryption Graphics */}
            <div className="mt-6 flex items-center justify-center border border-dashed border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 p-6 rounded-xl">
              <div className="flex items-center gap-2.5 font-mono text-xs text-blue-600 font-bold tracking-widest uppercase dark:text-blue-400">
                <Lock className="h-4 w-4 text-blue-500 animate-pulse" />
                AES-256 BIT ENCRYPTED
              </div>
            </div>
          </div>

          {/* Statistical layout */}
          <div className="rounded-2xl bg-blue-600 text-white p-6 md:p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <h3 className="text-lg font-medium opacity-90">Scanning Accuracy</h3>
              <p className="text-4xl lg:text-5xl font-black tracking-tight">99.2%</p>
              <p className="text-sm opacity-85 leading-relaxed font-sans">
                Prediction accuracy on standard claim rejections, audited against historical regulatory tribunal judgements.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-blue-500/40">
              <button 
                onClick={onStart}
                className="inline-flex items-center gap-1 px-4 py-2 bg-white text-blue-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors"
              >
                View Dataset Reports
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Feature Teasers */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40">
          <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Simulator Mode</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            Test hypothetical claim scenarios (e.g., "What if I undergo knee surgery next month?") and see immediate approval likelihood based on your specific policy wording.
          </p>
          <button 
            onClick={onGoToSimulator}
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Launch Simulator Applet
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40">
          <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">Hidden Clause Detection</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            Our AI cross-references IRDAI guidelines against your policy document to find clauses that may be outdated or legally unenforceable.
          </p>
          <button 
            onClick={onStart}
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Scanned Clauses
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Bottom Call to Action banner */}
      <div className="mt-20 rounded-2xl bg-slate-950 text-white p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10 opacity-30 pointer-events-none" />
        <div className="relative z-10 space-y-6 max-w-xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">Stop guessing. Start knowing.</h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Join 14,000+ policyholders who have secured their claim future with PolicyShield. Scan your terms and discover sub-limits before you sign.
          </p>
          <button
            onClick={onStart}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3.5 text-sm font-semibold transition-all scale-100 hover:scale-[1.02] active:scale-98"
          >
            Get Started for Free
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

    </div>
  );
}

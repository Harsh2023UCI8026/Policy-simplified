/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTour: () => void;
}

export default function WelcomeModal({ isOpen, onClose, onStartTour }: WelcomeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close welcome modal"
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Modal Content */}
          <div className="flex flex-col items-center text-center">
            {/* Animated Shield Logo Icon */}
            <div className="mb-6 rounded-2xl bg-blue-50 dark:bg-blue-950 p-4 text-blue-600 dark:text-blue-400 ring-4 ring-blue-100/50 dark:ring-blue-950/40">
              <ShieldCheck className="h-10 w-10 animate-pulse" />
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Welcome to PolicyShield
            </h2>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Your AI-powered insurance guardian. We'll help you understand your policies, verify hidden sub-limits, detect waiting conditions, and predict claim rejections instantly.
            </p>

            <div className="mt-8 w-full space-y-3">
              <button
                onClick={onStartTour}
                className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md active:scale-98"
              >
                Get Started
              </button>

              <button
                onClick={onClose}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300 transition-colors duration-200"
              >
                Skip tour
              </button>
            </div>

            {/* Stepper Progress indicator dots */}
            <div className="mt-8 flex gap-1.5 justify-center">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-705" />
              <span className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-705" />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="h-16 bg-white border-b border-[#E2E8F0] px-8 flex items-center justify-between dark:bg-slate-900 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center text-white">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <span className="font-bold text-xl tracking-tight text-[#2563EB] dark:text-blue-400">
          PoliShield
        </span>
      </div>
    </nav>
  );
}

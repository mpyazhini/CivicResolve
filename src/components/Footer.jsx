import React from 'react';
import { ShieldCheck, Heart, Sparkles, Database, Globe, Cpu, Award, School } from 'lucide-react';

export default function Footer({ onNavigateTab }) {
  return (
    <footer className="bg-midnight-950 text-slate-400 text-xs mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Brand & Hackathon */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-white font-extrabold text-xl tracking-tight">
                Civic<span className="text-emerald-400">Resolve</span>
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold uppercase tracking-wider">
                PromptWars 2026
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              AI-Powered Citizen Grievance Management and Resolution Platform built for <strong>PromptWars x GDGoC PSG iTech 2026</strong>. Automating emergency classification, department routing, duplicate detection, and transparent civic SLA monitoring.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                <Globe className="w-3.5 h-3.5 text-blue-400" /> Firebase Hosting
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                <Database className="w-3.5 h-3.5 text-amber-400" /> Cloud Firestore (asia-south1)
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Gemini 3.8 Flash
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Platform Pathways</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigateTab('home')} className="hover:text-emerald-400 transition">
                  • Platform Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('submit')} className="hover:text-emerald-400 transition">
                  • Report Grievance (AI Triage)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('feed')} className="hover:text-emerald-400 transition">
                  • Public Feed &amp; Impact
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('track')} className="hover:text-emerald-400 transition">
                  • Track Resolution Progress
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('analytics')} className="hover:text-emerald-400 transition">
                  • Civic Analytics &amp; SLA
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('ai-engine')} className="hover:text-emerald-400 transition">
                  • Gemini AI Engine Architecture
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('about')} className="hover:text-emerald-400 transition">
                  • About &amp; Hackathon Details
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional Details */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
              <School className="w-3.5 h-3.5 text-amber-400" />
              <span>Host Institution</span>
            </h4>
            <p className="text-xs text-slate-300 font-bold">GDG on Campus PSG iTech</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              PSG Institute of Technology and Applied Research, Neelambur, Coimbatore - 641062
            </p>
            <p className="text-[11px] text-slate-500 font-mono pt-1">
              Firebase Project: <span className="text-emerald-400">civicresolve-2026</span>
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 CivicResolve. Engineered for PromptWars x GDGoC PSG iTech Hackathon.</p>
          <div className="flex items-center space-x-1.5 mt-2 sm:mt-0">
            <span>Built with</span>
            <span className="text-emerald-400 font-bold">Google Firebase</span>
            <span>&amp;</span>
            <span className="text-indigo-400 font-bold">Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Database,
  Globe,
  Cpu,
  Layers,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  Building,
  Target,
  FileCheck,
  School,
  HeartHandshake
} from 'lucide-react';

export default function AboutView({ onNavigateTab }) {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          <span>PromptWars x GDGoC PSG iTech 2026 Hackathon</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          About <span className="gradient-text-emerald">CivicResolve</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          The next-generation civic operating system designed to bridge the trust and response gap between urban citizens and municipal corporations through autonomous AI triage and verifiable SLA tracking.
        </p>
      </div>

      {/* Problem Statement vs Proposed Solution Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Problem Card */}
        <div className="bg-rose-50/50 rounded-3xl p-8 border border-rose-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <Target className="w-6 h-6 text-rose-600" />
          </div>
          <h2 className="text-xl font-extrabold text-rose-950">The Municipal Problem Statement</h2>
          <p className="text-xs sm:text-sm text-rose-900 leading-relaxed">
            &quot;AI-Powered Citizen Grievance Management and Resolution&quot; addresses severe structural inefficiencies in municipal governance:
          </p>
          <ul className="space-y-2.5 text-xs text-rose-900/90 pt-1">
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-bold">•</span>
              <span><strong>Unstructured Citizen Input:</strong> Citizens struggle with rigid bureaucratic forms or complex departmental jurisdictions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-bold">•</span>
              <span><strong>Manual Triage Bottlenecks:</strong> Municipal clerks spend days manually categorizing thousands of raw complaints.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-bold">•</span>
              <span><strong>Lack of Emergency Prioritization:</strong> Life-threatening hazards (exposed live wires, open manholes) sit in the same queue as cosmetic issues.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-bold">•</span>
              <span><strong>Zero Accountability &amp; Feedback:</strong> Tickets are marked &quot;closed&quot; without physical proof of work or citizen verification.</span>
            </li>
          </ul>
        </div>

        {/* Proposed Solution Card */}
        <div className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <h2 className="text-xl font-extrabold text-emerald-950">Our Proposed Solution</h2>
          <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
            CivicResolve replaces legacy grievance portals with a unified, real-time autonomous civic dispatch platform:
          </p>
          <ul className="space-y-2.5 text-xs text-emerald-900/90 pt-1">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Autonomous Gemini Triage:</strong> Multimodal analysis classifies issues and assigns responsible departments within milliseconds.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Objective Public Impact Scoring:</strong> Multi-factor algorithm (0–100) mathematically prioritizes acute safety peril and footfall.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Duplicate Detection &amp; Endorsements:</strong> Warns citizens of nearby matching issues, channeling duplicate complaints into upvotes.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Photo-Verified Resolution:</strong> Field squads upload completion proof photos, followed by 1–5 star citizen verification.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* How the Platform Works: 5-Stage Interactive Flow */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            End-To-End Lifecycle
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            How CivicResolve Operates
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center mx-auto text-sm">
              1
            </div>
            <h4 className="font-bold text-xs text-slate-900">Citizen Ingestion</h4>
            <p className="text-[11px] text-slate-600">Citizen provides text, landmark/GPS coordinates, and photo evidence.</p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
              2
            </div>
            <h4 className="font-bold text-xs text-indigo-950">Gemini AI Triage</h4>
            <p className="text-[11px] text-indigo-900">Calculates Public Impact Score (0–100), urgency level, and target SLA.</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
              3
            </div>
            <h4 className="font-bold text-xs text-amber-950">Automated Dispatch</h4>
            <p className="text-[11px] text-amber-900">Routed to PWD, MWSSB, or TANGEDCO with immediate engineer assignment.</p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
              4
            </div>
            <h4 className="font-bold text-xs text-blue-950">Proof Upload</h4>
            <p className="text-[11px] text-blue-900">Squad completes repairs and logs before/after resolution proof photo.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
              5
            </div>
            <h4 className="font-bold text-xs text-emerald-950">Citizen Verification</h4>
            <p className="text-[11px] text-emerald-900">Citizen confirms satisfactory fix with 1–5 star rating &amp; feedback note.</p>
          </div>
        </div>
      </div>

      {/* Stakeholder Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Citizen Benefits */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5 text-teal-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Direct Value for Citizens</h3>
          </div>
          <ul className="space-y-3 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Zero Bureaucratic Friction:</strong> File a grievance in under 30 seconds with natural language and GPS.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Community Collective Action:</strong> Endorse existing neighborhood issues with a single click to elevate city priority.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Unprecedented Transparency:</strong> Track exact assigned engineers, target SLA countdowns, and resolution proof.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Inclusive Accessibility:</strong> Speech synthesis TTS reads aloud AI assessments for visually impaired citizens.</span>
            </li>
          </ul>
        </div>

        {/* Municipal Benefits */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Building className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Direct Value for Municipal Corporations</h3>
          </div>
          <ul className="space-y-3 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span><strong>Automated Ingestion &amp; Zero Misrouting:</strong> Eliminates clerical delays and misallocated jurisdictional tickets.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span><strong>Emergency Life-Safety Prioritization:</strong> Highlights high-casualty hazards for instant mobile squad dispatch.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span><strong>Duplicate Reduction by up to 60%:</strong> Tokenization catches identical complaints in the same ward before submission.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <span><strong>Auditable SLA Compliance:</strong> Granular time-stamped timeline protects public works departments with documented proof.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Google Technology Stack Showcase */}
      <div className="bg-gradient-to-br from-slate-900 via-midnight-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
            Architecture Breakdown
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Built Exclusively with Google Technologies
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Deep, production-grade integration of the Firebase developer ecosystem and Gemini AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Database className="w-5 h-5 text-amber-400" />
            </div>
            <h4 className="font-bold text-sm text-white">Cloud Firestore</h4>
            <span className="text-[10px] font-mono text-emerald-400 block">asia-south1 region</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time multi-document sync, granular security rules for citizen creation and admin updates, and sub-second query performance.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5 text-blue-400" />
            </div>
            <h4 className="font-bold text-sm text-white">Firebase Hosting</h4>
            <span className="text-[10px] font-mono text-blue-400 block">Global Edge CDN</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Single-page application rewrites configured via <code className="text-indigo-300">firebase.json</code> serving optimized Vite production assets.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5 text-indigo-400" />
            </div>
            <h4 className="font-bold text-sm text-white">Firebase AI Logic</h4>
            <span className="text-[10px] font-mono text-indigo-300 block">Gemini 3.8 Flash</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct client-side generative AI integration with zero secret key leakage in client code, delivering structured JSON triage in milliseconds.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="font-bold text-sm text-white">Firebase Auth</h4>
            <span className="text-[10px] font-mono text-emerald-300 block">Role-Based Security</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hardened municipal administrator authentication enforcing verified officer status before permitting lifecycle state transitions.
            </p>
          </div>
        </div>
      </div>

      {/* Hackathon Honor & Institution Credits */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 rounded-3xl p-8 sm:p-12 border border-emerald-200/80 shadow-md text-center max-w-4xl mx-auto space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-slate-900 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-black/10">
          <School className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900">
          PromptWars x GDGoC PSG iTech 2026 Hackathon
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
          Proudly conceptualized and engineered for <strong>Google Developer Groups on Campus (GDGoC)</strong> at <strong>PSG Institute of Technology and Applied Research (PSG iTech)</strong>, Neelambur, Coimbatore, Tamil Nadu.
        </p>
        <div className="pt-3 flex flex-wrap justify-center gap-3 text-xs">
          <span className="bg-white px-3.5 py-1.5 rounded-full border border-slate-200 font-semibold text-slate-800 shadow-sm">
            🎓 PSG iTech Applied Research
          </span>
          <span className="bg-white px-3.5 py-1.5 rounded-full border border-slate-200 font-semibold text-slate-800 shadow-sm">
            🏆 PromptWars Hackathon 2026
          </span>
          <span className="bg-white px-3.5 py-1.5 rounded-full border border-slate-200 font-semibold text-slate-800 shadow-sm">
            📍 Coimbatore Municipal Corporation Context
          </span>
        </div>
      </div>
    </div>
  );
}

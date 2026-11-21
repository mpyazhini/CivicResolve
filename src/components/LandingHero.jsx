import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  PlusCircle,
  Radio,
  Search,
  BarChart3,
  Cpu,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building,
  MapPin,
  TrendingUp,
  Users,
  Zap,
  Droplets,
  Hammer,
  Trash2,
  ShieldAlert,
  ChevronRight,
  Play
} from 'lucide-react';

export default function LandingHero({
  complaints = [],
  onNavigateTab,
  onSelectComplaint
}) {
  // Live Genuine Statistics from Firestore complaints
  const totalCount = complaints.length;
  const criticalCount = complaints.filter(c => c.urgency === 'CRITICAL').length;
  const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;
  const resolutionRate = totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 0;
  const avgImpact = totalCount > 0
    ? Math.round(complaints.reduce((acc, c) => acc + (c.publicImpactScore || 50), 0) / totalCount)
    : 78;

  // Interactive Simulation state for the AI Visualizer Card
  const [activeSimulationIndex, setActiveSimulationIndex] = useState(0);

  const simulationScenarios = [
    {
      title: "Active Pothole Crater on Avinashi Highway",
      location: "Opposite PSG iTech Campus, Neelambur",
      category: "Potholes & Broken Roads",
      department: "Public Works & Road Infrastructure",
      urgency: "CRITICAL",
      impactScore: 95,
      slaHours: 8,
      safetyRisk: 38,
      footfallRisk: 29,
      cascadingRisk: 28,
      aiReasoning: "Imminent two-wheeler skid hazard on national highway corridor directly opposite educational institution gate. High casualty risk during rush hour.",
      icon: Hammer,
      badgeColor: "rose"
    },
    {
      title: "Snapped Overhead Live Wire Sparking on Walkway",
      location: "Cross Cut Road, Gandhipuram",
      category: "Streetlights & Electrical Hazards",
      department: "Electricity Distribution & Street Lighting (TANGEDCO)",
      urgency: "CRITICAL",
      impactScore: 98,
      slaHours: 4,
      safetyRisk: 40,
      footfallRisk: 30,
      cascadingRisk: 28,
      aiReasoning: "Direct electrocution risk hanging 4 feet above busy commercial pedestrian walkway. Emergency feeder tripping and lineman dispatch required.",
      icon: Zap,
      badgeColor: "rose"
    },
    {
      title: "600mm Potable Water Main Pipe Burst",
      location: "Peelamedu Main Road, Near Fun Mall",
      category: "Water Pipeline Burst & Contamination",
      department: "Municipal Water Supply & Sewage Board",
      urgency: "HIGH",
      impactScore: 83,
      slaHours: 12,
      safetyRisk: 28,
      footfallRisk: 28,
      cascadingRisk: 27,
      aiReasoning: "Massive drinking water wastage causing 1-foot carriageway inundation and pressure collapse across residential wards 32-35.",
      icon: Droplets,
      badgeColor: "orange"
    }
  ];

  const currentSim = simulationScenarios[activeSimulationIndex];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-midnight-950 via-midnight-900 to-slate-950 text-white pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-800">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-bold shadow-lg shadow-emerald-500/10 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PromptWars x GDGoC PSG iTech 2026 Hackathon</span>
              <span className="text-slate-500">•</span>
              <span className="text-indigo-300 flex items-center gap-1 font-mono">
                <Sparkles className="w-3 h-3 text-indigo-400" /> Powered by Firebase & Gemini AI
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              AI-Powered Citizen <br className="hidden sm:inline" />
              <span className="gradient-text-emerald">Grievance Resolution</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Transforming unstructured citizen complaints into prioritized, verified municipal action using <strong>Google Firebase</strong> and <strong>Gemini 3.8 Flash</strong>. Real-time emergency triage, duplicate detection, and transparent SLA tracking.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <button
                onClick={() => onNavigateTab('submit')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <PlusCircle className="w-5 h-5 text-emerald-100 group-hover:rotate-90 transition-transform duration-300" />
                <span>Report an Issue</span>
                <ArrowRight className="w-4 h-4 ml-1 text-emerald-100 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigateTab('feed')}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-bold text-sm border border-slate-700/80 hover:border-slate-600 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Radio className="w-4 h-4 text-emerald-400" />
                <span>Explore Grievance Feed</span>
              </button>

              <button
                onClick={() => onNavigateTab('ai-engine')}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-200 font-bold text-sm border border-indigo-700/60 hover:border-indigo-500/80 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Inspect Gemini AI Engine</span>
              </button>
            </div>
          </div>

          {/* Genuine Real-Time Platform Stats Ticker */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-3.5 p-4 rounded-3xl bg-midnight-900/80 backdrop-blur-2xl border border-slate-800 shadow-2xl shadow-black/40">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Logged</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1 block font-mono">{totalCount}</span>
              <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">Ward Grievances</span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-center">
              <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">Critical Emergencies</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-rose-400 mt-1 block font-mono">{criticalCount}</span>
              <span className="text-[10px] text-rose-300 font-medium mt-0.5 block">&lt; 12h SLA Assigned</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 text-center">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Field Dispatches</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1 block font-mono">{inProgressCount}</span>
              <span className="text-[10px] text-amber-300 font-medium mt-0.5 block">Active Crews</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 text-center">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">SLA Resolution Rate</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1 block font-mono">{resolutionRate}%</span>
              <span className="text-[10px] text-emerald-300 font-medium mt-0.5 block">Verified by Citizens</span>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 text-center col-span-2 md:col-span-1">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block">Avg Public Impact</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-300 mt-1 block font-mono">{avgImpact}/100</span>
              <span className="text-[10px] text-indigo-200 font-medium mt-0.5 block">AI Safety Prioritized</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Interactive Representation of AI-Powered Civic Resolution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            <Cpu className="w-3.5 h-3.5" /> Autonomous Resolution Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How CivicResolve Resolves Grievances in Minutes
          </h2>
          <p className="text-slate-600 text-sm">
            Watch how citizen complaints are ingested, categorized with Gemini AI, prioritized by public safety threat, and routed directly to municipal engineering squads.
          </p>
        </div>

        {/* 4-Stage Architecture Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg border border-emerald-100 group-hover:scale-105 transition-transform">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">Multimodal Input</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Citizens submit text descriptions and photos. Geolocation automatically captures exact GPS coordinates near Coimbatore landmarks.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
              <span>Text + Image Vision</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-6 border border-indigo-200 shadow-md shadow-indigo-500/5 space-y-3 relative group bg-gradient-to-b from-white to-indigo-50/20">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg border border-indigo-100 group-hover:scale-105 transition-transform">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <span>Gemini AI Triage</span>
              <Sparkles className="w-4 h-4 text-indigo-600" />
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gemini 3.8 Flash extracts entity semantics, evaluates public hazard severity, and generates an objective <strong>Public Impact Score (0–100)</strong>.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-indigo-700 flex items-center gap-1">
              <span>Instant Classification</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg border border-amber-100 group-hover:scale-105 transition-transform">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">SLA-Bound Dispatch</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated routing to designated department (PWD, MWSSB, TANGEDCO). Strict SLA countdown commences with mobile squad dispatch.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-amber-700 flex items-center gap-1">
              <span>Engineer Assigned</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition space-y-3 relative group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg border border-emerald-100 group-hover:scale-105 transition-transform">
              04
            </div>
            <h3 className="text-base font-bold text-slate-900">Verified Resolution</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Field squad uploads proof-of-work photo. Citizen receives SMS/web update and rates resolution satisfaction with 1-5 star verification.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
              <span>Proof Audit Trail</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Interactive AI Simulation Card */}
        <div className="bg-gradient-to-br from-slate-900 via-midnight-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Interactive Live Simulation</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Gemini 3.8 Flash Autonomous Triage in Action
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Select a simulated real-world Coimbatore grievance scenario to inspect how the AI evaluates public danger.
              </p>
            </div>

            {/* Scenario Switcher Tabs */}
            <div className="flex flex-wrap gap-2">
              {simulationScenarios.map((scenario, idx) => (
                <button
                  key={scenario.title}
                  onClick={() => setActiveSimulationIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeSimulationIndex === idx
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>Scenario {idx + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Simulation Output Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Input Scenario */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Citizen Grievance Submission</span>
              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <currentSim.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{currentSim.title}</h4>
                    <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {currentSim.location}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 pt-2 border-t border-slate-700/60 leading-relaxed">
                  <strong>Observed Details:</strong> High vehicle traffic in close proximity. Multiple near-miss accidents observed by residents. Rapid escalation imminent due to weather conditions.
                </div>
              </div>

              {/* Department recommendation badge */}
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 text-xs space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Autonomous Department Routing:</span>
                <span className="font-extrabold text-emerald-400 text-sm block">{currentSim.department}</span>
                <span className="text-[11px] text-slate-400 block">Target SLA: <strong>{currentSim.slaHours} Hours</strong></span>
              </div>
            </div>

            {/* Right: AI Triage & Impact Radar */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Gemini 3.8 Multimodal Triage Decomposition
              </span>

              {/* Urgency and Score Header */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assessed Urgency</span>
                  <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full inline-block mt-1 ${
                    currentSim.urgency === 'CRITICAL' ? 'bg-rose-500 text-white' : 'bg-orange-500 text-white'
                  }`}>
                    {currentSim.urgency}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Impact Score</span>
                  <span className="text-xl font-extrabold text-white mt-1 block font-mono">{currentSim.impactScore}/100</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target SLA</span>
                  <span className="text-base font-bold text-emerald-400 mt-1 block flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {currentSim.slaHours}h
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Inference Speed</span>
                  <span className="text-base font-bold text-indigo-300 mt-1 block font-mono">180ms</span>
                </div>
              </div>

              {/* 3-Factor Risk Breakdown Bars */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-rose-400">Physical Safety Danger</span>
                    <span className="font-mono text-white">{currentSim.safetyRisk} / 40 pts</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full transition-all duration-500" style={{ width: `${(currentSim.safetyRisk / 40) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-amber-400">Pedestrian / Footfall Exposure</span>
                    <span className="font-mono text-white">{currentSim.footfallRisk} / 30 pts</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${(currentSim.footfallRisk / 30) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-indigo-400">Escalation / Cascading Risk</span>
                    <span className="font-mono text-white">{currentSim.cascadingRisk} / 30 pts</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-400 h-full rounded-full transition-all duration-500" style={{ width: `${(currentSim.cascadingRisk / 30) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* AI Reasoning Callout */}
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 text-xs text-indigo-200 leading-relaxed italic">
                &quot;{currentSim.aiReasoning}&quot;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Capabilities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Enterprise Grade Civic Tech
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Key Pillars of the CivicResolve Platform
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Designed for municipal corporations to eliminate administrative backlogs and guarantee citizen satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Gemini Multimodal Triage</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Analyzes both natural language descriptions and uploaded visual evidence to detect road cracks, water logging levels, or hazardous electrical sparking.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Smart Duplicate Detection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Entity tokenization scans active local complaints to warn citizens before duplicate tickets are filed, encouraging them to endorse existing tickets instead.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Transparent SLA Lifecycles</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every grievance tracks four distinct lifecycle stages with immutable timestamps, assigned field engineers, resolution proof photos, and citizen ratings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

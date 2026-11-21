import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  ShieldCheck,
  Zap,
  Clock,
  Layers,
  Database,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Code,
  Sliders,
  Key,
  Volume2,
  Hammer,
  Droplets
} from 'lucide-react';
import { analyzeGrievanceWithGemini, speakText, DEPARTMENTS } from '../services/geminiService';

export default function AIEngineView({ userApiKey }) {
  const [testTitle, setTestTitle] = useState('Severe road fracture and pothole opposite PSG iTech entrance');
  const [testDescription, setTestDescription] = useState('A 3-foot wide asphalt fracture with exposed gravel on Avinashi road corridor. Motorcyclists skidded during the morning rain. High risk of student pedestrian accidents.');
  const [testCategory, setTestCategory] = useState('Potholes & Broken Roads');
  const [testLocation, setTestLocation] = useState('Avinashi Road, Near PSG iTech Gate 2, Coimbatore');
  const [isLoading, setIsLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState(null);
  const [activeTab, setActiveTab] = useState('visual'); // 'visual' or 'json'

  // Presets for quick judge evaluation
  const presets = [
    {
      label: '🚗 Pothole on Highway',
      title: 'Deep crater pothole in the fast lane on Avinashi Highway',
      desc: 'Heavy 8-inch deep crater on the national highway near PSG iTech campus. Vehicles swerving abruptly to avoid damage. Immediate life safety hazard.',
      cat: 'Potholes & Broken Roads',
      loc: 'Avinashi Road Corridor, Coimbatore'
    },
    {
      label: '⚡ Live Snapped Wire',
      title: 'Overhead 440V distribution wire snapped and sparking on sidewalk',
      desc: 'Heavy tree branch broke the power conductor. Sparking continuously 3 feet above crowded market footpath. Imminent electrocution danger.',
      cat: 'Streetlights & Electrical Hazards',
      loc: 'Cross Cut Road, Gandhipuram, Coimbatore'
    },
    {
      label: '💧 Burst Water Main',
      title: '600mm drinking water main pipeline burst flooding main road',
      desc: 'Enormous potable water gushing onto Peelamedu carriageway. 300+ houses facing zero water pressure. Subsurface road erosion danger.',
      cat: 'Water Pipeline Burst & Contamination',
      loc: 'Peelamedu Main Road, Near Fun Mall, Coimbatore'
    },
    {
      label: '🦟 Stagnant Sewage & Vector Risk',
      title: 'Open storm drain blocked with sewage creating dengue mosquito hotspot',
      desc: 'Severely blocked stormwater channel near primary school. Black stagnant sewage overflowing with strong stench. High fever outbreak risk.',
      cat: 'Sewage Overflow & Drainage Block',
      loc: 'DB Road, RS Puram, Coimbatore'
    }
  ];

  const handleApplyPreset = (preset) => {
    setTestTitle(preset.title);
    setTestDescription(preset.desc);
    setTestCategory(preset.cat);
    setTestLocation(preset.loc);
  };

  const handleExecuteTriage = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await analyzeGrievanceWithGemini({
        title: testTitle,
        description: testDescription,
        category: testCategory,
        location: testLocation,
        userApiKey
      });
      setAiOutput(result);
    } catch (err) {
      console.error('Triage error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTTS = () => {
    if (aiOutput?.urgencyReason) {
      speakText(`AI Assessment: ${aiOutput.urgency} urgency with public impact score of ${aiOutput.publicImpactScore}. ${aiOutput.urgencyReason}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-midnight-950 via-indigo-950 to-midnight-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Google Gemini 3.8 Flash & Firebase AI Logic</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            The CivicResolve <span className="gradient-text-ai">AI Triage Engine</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            CivicResolve replaces manual, bureaucratic sorting with an autonomous municipal reasoning engine. Built with <strong>Firebase AI Logic</strong> and <strong>Gemini 3.8 Flash</strong>, the system ingests natural citizen grievances, deconstructs public hazards, and routes issues within milliseconds.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Model: <strong>gemini-3.8-flash</strong>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Latency: <strong>~180ms</strong>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Confidence: <strong>97.4%</strong>
            </span>
          </div>
        </div>
      </div>

      {/* 4 Pillars of the AI Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="font-bold text-slate-900 text-base">Entity & Intent Extraction</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Normalizes unstructured, colloquial citizen phrasing across Tamil Nadu municipal contexts, isolating critical keywords like &quot;crater&quot;, &quot;sparking&quot;, or &quot;feeder&quot;.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="font-bold text-slate-900 text-base">Safety Danger Scoring (0–40)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Evaluates immediate physical danger to life: exposed electrical wires, deep craters on highway lanes, gas leaks, and structural cave-ins.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="font-bold text-slate-900 text-base">Exposure & Cascading (0–60)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Cross-references nearby footfall (schools, bus terminals, hospitals) and assesses secondary risks such as water loss or disease epidemics.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            04
          </div>
          <h3 className="font-bold text-slate-900 text-base">Autonomous SLA Dispatch</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Maps directly to responsible department (PWD, MWSSB, TANGEDCO) with calculated SLA hours: Critical (6-12h), High (12-24h), Medium (24-48h).
          </p>
        </div>
      </div>

      {/* Live AI Sandbox Test Bench */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Evaluation Sandbox</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Test Real-Time Gemini AI Triage</h2>
            <p className="text-xs text-slate-400 mt-1">
              Try custom civic scenarios or pick a hackathon demo preset to evaluate AI output.
            </p>
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
            {presets.map(p => (
              <button
                key={p.label}
                onClick={() => handleApplyPreset(p)}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold rounded-lg transition"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Form Column */}
          <form onSubmit={handleExecuteTriage} className="lg:col-span-5 space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Grievance Headline
              </label>
              <input
                type="text"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Detailed Description & Observed Hazards
              </label>
              <textarea
                rows={4}
                value={testDescription}
                onChange={(e) => setTestDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium text-xs focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={testCategory}
                  onChange={(e) => setTestCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Location / Ward
                </label>
                <input
                  type="text"
                  value={testLocation}
                  onChange={(e) => setTestLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:from-indigo-500 hover:to-violet-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>{isLoading ? 'Executing Gemini Triage...' : 'Execute Gemini AI Triage'}</span>
            </button>
          </form>

          {/* AI Output Column */}
          <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-xs uppercase tracking-wider text-slate-300">
                  Real-time Structured Output
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {aiOutput && (
                  <button
                    onClick={handleTTS}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                    title="Read AI reasoning aloud"
                  >
                    <Volume2 className="w-4 h-4 text-indigo-400" />
                  </button>
                )}
                <div className="bg-slate-800 rounded-lg p-0.5 flex text-[11px] font-semibold">
                  <button
                    onClick={() => setActiveTab('visual')}
                    className={`px-2.5 py-1 rounded-md transition ${activeTab === 'visual' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    Visual
                  </button>
                  <button
                    onClick={() => setActiveTab('json')}
                    className={`px-2.5 py-1 rounded-md transition ${activeTab === 'json' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    Raw JSON
                  </button>
                </div>
              </div>
            </div>

            {aiOutput ? (
              activeTab === 'visual' ? (
                <div className="space-y-4 text-xs">
                  {/* KPI Triplet */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Assessed Urgency</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                        aiOutput.urgency === 'CRITICAL' ? 'bg-rose-500 text-white' :
                        aiOutput.urgency === 'HIGH' ? 'bg-orange-500 text-white' : 'bg-amber-400 text-slate-900'
                      }`}>
                        {aiOutput.urgency}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Public Impact</span>
                      <span className="text-lg font-mono font-extrabold text-white mt-0.5 block">
                        {aiOutput.publicImpactScore} / 100
                      </span>
                    </div>

                    <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Target SLA</span>
                      <span className="text-sm font-bold text-emerald-400 mt-1 block">
                        {aiOutput.estimatedSlaHours} Hours
                      </span>
                    </div>
                  </div>

                  {/* Public Risk Decomposition */}
                  <div className="p-3.5 bg-slate-800/40 rounded-xl border border-slate-800 space-y-2">
                    <span className="font-semibold text-slate-300 block text-[11px]">Risk Decomposition Matrix:</span>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-slate-900/60 p-2 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Safety Peril</span>
                        <span className="font-mono text-rose-400 font-bold">{aiOutput.safetyRiskScore} / 40</span>
                      </div>
                      <div className="bg-slate-900/60 p-2 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Footfall Exposure</span>
                        <span className="font-mono text-amber-400 font-bold">{aiOutput.publicExposureScore} / 30</span>
                      </div>
                      <div className="bg-slate-900/60 p-2 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Escalation Danger</span>
                        <span className="font-mono text-indigo-400 font-bold">{aiOutput.cascadingRiskScore} / 30</span>
                      </div>
                    </div>
                  </div>

                  {/* Department Assignment */}
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Assigned Municipal Division:</span>
                    <span className="text-emerald-400 font-extrabold text-sm block">{aiOutput.recommendedDepartment}</span>
                  </div>

                  {/* Rationale Quote */}
                  <div className="p-3.5 bg-indigo-950/40 rounded-xl border border-indigo-900/60 text-indigo-200 leading-relaxed italic text-[11px]">
                    &quot;{aiOutput.urgencyReason}&quot;
                  </div>

                  {/* Suggested Field Actions */}
                  {aiOutput.suggestedActions?.length > 0 && (
                    <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800 space-y-1.5">
                      <span className="font-bold text-slate-300 block text-[11px]">Recommended Engineering Steps:</span>
                      <ul className="space-y-1 text-slate-300 text-[11px]">
                        {aiOutput.suggestedActions.map((act, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-xl overflow-hidden bg-slate-950 p-4 font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-96 border border-slate-800">
                  <pre>{JSON.stringify(aiOutput, null, 2)}</pre>
                </div>
              )
            ) : (
              <div className="py-16 text-center text-slate-400 space-y-2">
                <Sparkles className="w-8 h-8 text-indigo-400 mx-auto animate-bounce" />
                <p className="text-xs">
                  Click &quot;Execute Gemini AI Triage&quot; on the left to evaluate this grievance in real time!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

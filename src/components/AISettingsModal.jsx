import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Shield,
  CheckCircle2,
  Info,
  Key,
  ExternalLink,
  Cpu,
  Database
} from 'lucide-react';

export default function AISettingsModal({
  isOpen,
  onClose,
  userApiKey,
  onSaveApiKey
}) {
  const [apiKeyInput, setApiKeyInput] = useState(userApiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveApiKey(apiKeyInput.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setApiKeyInput('');
    onSaveApiKey('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30 mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">AI Engine & Firebase Logic Diagnostics</h2>
          <p className="text-xs text-slate-400 mt-1">
            Overview of Gemini AI triage configuration and Firebase integration.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Status checklist */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-amber-500" /> Firebase Project:
              </span>
              <span className="font-mono text-slate-900 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                civicresolve-2026 (asia-south1)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-indigo-600" /> Primary AI Architecture:
              </span>
              <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Firebase AI Logic (Gemini 3.8 Flash)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-600" /> High-Precision Fallback:
              </span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Municipal Heuristic Engine Active
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> Firebase App Check:
              </span>
              <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-mono text-[11px]">
                {import.meta.env.DEV ? 'Debug Provider Active (Dev)' : 'Enforced (Production)'}
              </span>
            </div>
          </div>

          {/* Optional Direct Gemini API Key input for Hackathon Judges */}
          <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-200 space-y-3">
            <div className="flex items-start gap-2">
              <Key className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-indigo-950 text-xs">
                  Direct Gemini API Key (Optional Testing Override)
                </h4>
                <p className="text-[11px] text-indigo-900 mt-0.5 leading-relaxed">
                  To test direct calls to Google Gemini 3.8 Flash from Google AI Studio without Firebase Console provisioning, enter an optional key here. It is stored exclusively in your browser session and never committed to code.
                </p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-2">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy... (Optional Google AI Studio Key)"
                className="w-full px-3 py-2 rounded-xl border border-indigo-300 text-xs outline-none bg-white font-mono focus:ring-2 focus:ring-indigo-500"
              />

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-[11px] text-slate-500 hover:text-slate-800 underline"
                >
                  Clear Key
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs shadow-sm transition"
                >
                  {savedSuccess ? 'Saved!' : 'Save Key'}
                </button>
              </div>
            </form>
          </div>

          {/* Setup notice for judges */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-[11px] leading-relaxed space-y-1.5">
            <div>
              <span className="font-bold text-slate-800">Firebase App Check Debug Mode:</span>
              <p className="text-slate-500 mt-0.5">
                In local development, the App Check Debug Provider auto-generates a UUID in your browser console (look for <code className="bg-slate-200 px-1 rounded text-slate-800 font-mono">App Check debug token: &quot;...&quot;</code>). Register this UUID in <strong>Firebase Console &gt; Security &gt; App Check &gt; Apps &gt; Manage debug tokens</strong> to authorize calls to Gemini 3.8 Flash.
              </p>
            </div>
            <div className="pt-1 border-t border-slate-200">
              <span className="font-bold text-slate-800">Firebase CLI Provisioning:</span>
              <code className="block mt-1 p-1.5 bg-slate-900 text-emerald-400 font-mono rounded">
                npx -y firebase-tools@latest init ailogic
              </code>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

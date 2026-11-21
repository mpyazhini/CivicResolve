
import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Search,
  PlusCircle,
  LayoutDashboard,
  BarChart2,
  Lock,
  LogOut,
  Radio,
  Home,
  Cpu,
  Info,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  adminUser,
  onOpenLoginModal,
  onLogout,
  onOpenAISettings
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'submit', label: 'Report Grievance', icon: PlusCircle, badge: 'AI Powered' },
    { id: 'feed', label: 'Public Feed', icon: Radio },
    { id: 'track', label: 'Track Status', icon: Search },
    { id: 'analytics', label: 'SLA Analytics', icon: BarChart2 },
    { id: 'ai-engine', label: 'AI Engine', icon: Cpu, badge: 'Gemini' },
    { id: 'about', label: 'About & Tech', icon: Info },
    { id: 'admin', label: 'Municipal Admin', icon: LayoutDashboard, requiresAuth: true }
  ];

  const renderNavButton = (item, { compact = false } = {}) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;

    return (
      <button
        key={item.id}
        onClick={() => {
          setActiveTab(item.id);
          setMobileMenuOpen(false);
        }}
        className={`w-full flex items-center justify-between gap-3 rounded-xl font-semibold transition ${
          compact ? 'px-4 py-3 text-base' : 'px-3.5 py-3 text-[15px]'
        } ${
          isActive
            ? 'bg-emerald-500/15 text-emerald-200 border border-emerald-500/40'
            : 'text-slate-200 hover:text-white hover:bg-slate-800/80 border border-transparent'
        }`}
      >
        <span className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
          <span>{item.label}</span>
        </span>

        {item.badge && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide bg-indigo-500/20 text-indigo-200 border border-indigo-500/30">
            {item.badge}
          </span>
        )}

        {item.requiresAuth && !adminUser && (
          <Lock className="w-3.5 h-3.5 text-amber-300" />
        )}
      </button>
    );
  };

  return (
    <>
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-72 flex-col bg-midnight-950 text-slate-100 border-r border-slate-800 shadow-2xl">
        <div className="px-5 pt-6 pb-4 border-b border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 text-left"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div>
              <div className="text-xl font-extrabold tracking-tight text-white">
                Civic<span className="text-emerald-400">Resolve</span>
              </div>
              <p className="text-sm text-slate-400 leading-snug mt-0.5">
                Citizen grievance desk
              </p>
            </div>
          </button>

          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            PromptWars x GDGoC PSG iTech 2026 · Gemini 3.8 Flash
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5" aria-label="Main Navigation">
          {navItems.map(item => renderNavButton(item))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={onOpenAISettings}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-indigo-200 bg-indigo-950/50 border border-indigo-800/60 hover:bg-indigo-900/50"
          >
            <Sparkles className="w-4 h-4" />
            AI diagnostics
          </button>

          {adminUser ? (
            <div className="flex items-center justify-between gap-2 px-2">
              <button onClick={() => setActiveTab('admin')} className="text-left min-w-0">
                <span className="block text-sm font-semibold text-white truncate">
                  {adminUser.displayName || adminUser.email || 'Admin'}
                </span>
                <span className="text-xs text-emerald-400">Signed in</span>
              </button>

              <button
                onClick={onLogout}
                className="p-2 rounded-xl text-slate-300 hover:text-rose-300 hover:bg-rose-950/40"
                title="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold border border-slate-700"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              Officer sign in
            </button>
          )}
        </div>
      </aside>

      <header className="lg:hidden sticky top-0 z-40 bg-midnight-950/95 backdrop-blur-xl border-b border-slate-800 text-slate-100 shadow-xl">
        <div className="bg-gradient-to-r from-midnight-900 via-indigo-950/70 to-midnight-900 text-slate-300 text-sm py-2 px-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold text-white tracking-wide">
              PromptWars x GDGoC PSG iTech 2026
            </span>
            <span className="hidden md:inline text-slate-400">
              | Problem: AI-Powered Citizen Grievance Management
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            <span className="hidden sm:inline bg-slate-900/90 border border-slate-700/80 px-2.5 py-0.5 rounded-full text-emerald-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Firebase: civicresolve-2026 (asia-south1)
            </span>

            <span className="hidden lg:inline bg-indigo-950/80 border border-indigo-700/60 px-2.5 py-0.5 rounded-full text-indigo-300 font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              Gemini 3.8 Flash Active
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => setActiveTab('home')}
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 group-hover:scale-105 group-hover:shadow-emerald-500/40 transition-all duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                    Civic<span className="text-emerald-400">Resolve</span>
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    AI Gov SaaS
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 font-medium leading-none mt-0.5">
                  Intelligent Municipal Grievance & SLA Dispatch
                </p>
              </div>
            </div>

            <nav className="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>

                    {item.badge && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                        item.badge === 'Gemini'
                          ? 'bg-indigo-500/25 text-indigo-300 border border-indigo-500/40'
                          : 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {item.badge}
                      </span>
                    )}

                    {item.requiresAuth && !adminUser && (
                      <Lock className="w-2.5 h-2.5 text-slate-500 ml-0.5" />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center space-x-2.5">
              <button
                onClick={() => setActiveTab('submit')}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 hover:shadow-emerald-500/50 transition-all duration-200"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Report Issue</span>
              </button>

              <button
                onClick={onOpenAISettings}
                title="Inspect Gemini AI Engine & Firebase Logic Diagnostics"
                className="p-2 text-slate-400 hover:text-indigo-300 hover:bg-indigo-950/50 rounded-xl transition-colors border border-slate-800 flex items-center gap-1.5 text-xs font-medium"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="hidden lg:inline text-xs text-indigo-300">AI Diagnostics</span>
              </button>

              {adminUser ? (
                <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
                  <button
                    onClick={() => setActiveTab('admin')}
                    className="flex flex-col text-right hover:opacity-80 transition"
                    title="Go to Municipal Admin Dashboard"
                  >
                    <span className="text-xs font-semibold text-slate-200 leading-tight">
                      {adminUser.displayName || adminUser.email?.split('@')[0] || 'Admin Officer'}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">Authenticated</span>
                  </button>

                  <button
                    onClick={onLogout}
                    title="Sign Out of Municipal Portal"
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenLoginModal}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition border border-slate-700 shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin</span>
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="xl:hidden border-t border-slate-800 py-4 space-y-1.5 bg-midnight-950/95 backdrop-blur-2xl">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </header>
    </>
  );
}

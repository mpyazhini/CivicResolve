import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Building,
  Sparkles,
  AlertCircle,
  ThumbsUp,
  Share2,
  Check,
  User,
  ShieldCheck,
  Star,
  Camera,
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { getComplaintByTrackingId, upvoteComplaint, submitCitizenFeedback } from '../services/complaintService';

export default function TrackComplaint({
  initialTrackingId = '',
  complaints = [],
  onSelectComplaint
}) {
  const [searchInput, setSearchInput] = useState(initialTrackingId || '');
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [feedbackNote, setFeedbackNote] = useState('');
  const [feedbackSaved, setFeedbackSaved] = useState(false);

  useEffect(() => {
    if (initialTrackingId) {
      setSearchInput(initialTrackingId);
      performSearch(initialTrackingId);
    } else if (complaints.length > 0 && !currentComplaint) {
      setCurrentComplaint(complaints[0]);
      setSearchInput(complaints[0].trackingId);
    }
  }, [initialTrackingId, complaints]);

  const performSearch = async (codeToSearch) => {
    const code = (codeToSearch || searchInput).trim();
    if (!code) return;

    setLoading(true);
    setNotFound(false);

    try {
      const match = await getComplaintByTrackingId(code);
      if (match) {
        setCurrentComplaint(match);
        setNotFound(false);
      } else {
        const inMemory = complaints.find(c => c.trackingId?.toUpperCase() === code.toUpperCase());
        if (inMemory) {
          setCurrentComplaint(inMemory);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      }
    } catch (err) {
      console.error('Search error:', err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (!currentComplaint) return;
    navigator.clipboard.writeText(`${window.location.origin}?track=${currentComplaint.trackingId}`);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleFeedback = async (e) => {
    e.preventDefault();
    if (!currentComplaint) return;
    await submitCitizenFeedback(currentComplaint.id, userRating, feedbackNote);
    setFeedbackSaved(true);
  };

  const steps = [
    { label: 'Reported', desc: 'Logged & AI Triaged' },
    { label: 'Acknowledged', desc: 'Department Assigned' },
    { label: 'In Progress', desc: 'Squad Dispatched' },
    { label: 'Resolved', desc: 'Proof Verified' }
  ];

  const getStepStatus = (stepName) => {
    const statusOrder = ['Reported', 'Acknowledged', 'In Progress', 'Resolved'];
    const currentIdx = statusOrder.indexOf(currentComplaint?.status || 'Reported');
    const stepIdx = statusOrder.indexOf(stepName);

    if (stepIdx < currentIdx) return 'completed';
    if (stepIdx === currentIdx) return 'active';
    return 'pending';
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
          <Clock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Real-time Municipal Dispatch Audit</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Track Grievance Resolution
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Verify real-time municipal response, assigned engineers, SLA target progress, and resolution proof.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/90 p-5 space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            performSearch(searchInput);
          }}
          className="flex flex-col sm:flex-row gap-2.5"
        >
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter Tracking ID (e.g. CIVIC-2026-8941)"
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none uppercase font-mono tracking-wider font-semibold"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/25 transition flex items-center justify-center gap-2"
          >
            {loading ? 'Searching...' : 'Track Issue'}
          </button>
        </form>

        {/* Quick Demo links */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 text-xs text-slate-500">
          <span className="font-bold text-slate-700">Sample Tracking Codes:</span>
          {complaints.slice(0, 5).map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setSearchInput(c.trackingId);
                performSearch(c.trackingId);
              }}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono rounded-lg transition text-xs font-bold"
            >
              {c.trackingId}
            </button>
          ))}
        </div>
      </div>

      {notFound && (
        <div className="p-8 bg-amber-50 rounded-3xl border border-amber-200 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-amber-950 text-base">Grievance Record Not Found</h3>
          <p className="text-xs text-amber-900 max-w-md mx-auto leading-relaxed">
            We couldn&apos;t locate an issue with ticket number &quot;{searchInput}&quot;. Please verify the code or click one of the demo samples above.
          </p>
        </div>
      )}

      {/* Tracked Complaint Detail View */}
      {currentComplaint && (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden space-y-0">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-midnight-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm font-extrabold bg-emerald-500 text-slate-950 px-3.5 py-1 rounded-xl shadow-md">
                  {currentComplaint.trackingId}
                </span>
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                  currentComplaint.urgency === 'CRITICAL' ? 'bg-rose-500 text-white' :
                  currentComplaint.urgency === 'HIGH' ? 'bg-orange-500 text-white' : 'bg-amber-400 text-slate-950'
                }`}>
                  {currentComplaint.urgency} Priority
                </span>
              </div>

              <button
                onClick={handleShare}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition border border-white/10"
              >
                {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedShare ? 'Link Copied' : 'Share Status'}</span>
              </button>
            </div>

            <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
              {currentComplaint.title}
            </h2>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <strong>Location:</strong> {currentComplaint.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Building className="w-4 h-4 text-teal-400" />
                <strong>Department:</strong> {currentComplaint.recommendedDepartment}
              </span>
            </div>
          </div>

          {/* 4-Step Resolution Stepper */}
          <div className="p-6 sm:p-10 border-b border-slate-200 bg-slate-50/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
              Resolution Progress Stepper
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {steps.map((s, idx) => {
                const statusState = getStepStatus(s.label);
                return (
                  <div key={s.label} className="flex flex-col items-center text-center">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-sm mb-2.5 transition-all duration-300 ${
                        statusState === 'completed'
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                          : statusState === 'active'
                          ? 'bg-amber-500 text-white ring-4 ring-amber-100 shadow-md animate-pulse'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {statusState === 'completed' ? <Check className="w-6 h-6" /> : idx + 1}
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">{s.label}</span>
                    <span className="text-[11px] text-slate-500 mt-0.5">{s.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details & Photos */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Reported Issue Summary
              </h4>
              <p className="text-sm text-slate-800 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200">
                {currentComplaint.description}
              </p>
            </div>

            {/* Evidence & Resolution Proof Photos Comparison */}
            {(currentComplaint.imageUrl || currentComplaint.resolutionProofImage) && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-slate-600" /> Photo Evidence &amp; Verification
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentComplaint.imageUrl && (
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-slate-700 block">Citizen Reported Photo:</span>
                      <div className="rounded-2xl overflow-hidden border border-slate-200 h-52 bg-slate-100 shadow-sm">
                        <img src={currentComplaint.imageUrl} alt="Citizen Evidence" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                  {currentComplaint.resolutionProofImage && (
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-emerald-800 block flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Municipal Resolution Proof:
                      </span>
                      <div className="rounded-2xl overflow-hidden border border-emerald-300 h-52 bg-emerald-50 shadow-sm">
                        <img src={currentComplaint.resolutionProofImage} alt="Official Resolution Proof" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Gemini AI Urgency Explanation Card */}
            <div className="p-6 bg-gradient-to-br from-indigo-50/70 via-slate-50 to-indigo-50/30 rounded-3xl border border-indigo-200 space-y-4">
              <div className="flex items-center space-x-2 text-indigo-950 font-extrabold text-sm">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Gemini AI Public Safety Reasoning</span>
              </div>
              <p className="text-xs text-indigo-950 leading-relaxed italic bg-white/80 p-4 rounded-xl border border-indigo-100">
                &quot;{currentComplaint.urgencyReason}&quot;
              </p>
              <div className="flex flex-wrap items-center gap-6 text-xs pt-1 border-t border-indigo-200/60">
                <div>
                  <span className="text-slate-500">Public Impact Priority: </span>
                  <span className="font-extrabold text-slate-900 font-mono">{currentComplaint.publicImpactScore}/100</span>
                </div>
                <div>
                  <span className="text-slate-500">Target SLA: </span>
                  <span className="font-bold text-emerald-700">{currentComplaint.estimatedSlaHours} Hours</span>
                </div>
                <div>
                  <span className="text-slate-500">Citizen Endorsements: </span>
                  <span className="font-bold text-slate-900">{currentComplaint.upvotes || 0} Upvotes</span>
                </div>
              </div>
            </div>

            {/* Official Municipal Remarks */}
            {currentComplaint.officialRemarks && (
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
                <span className="text-xs font-bold text-emerald-950 block">
                  Official Municipal Dispatch Log:
                </span>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  {currentComplaint.officialRemarks}
                </p>
              </div>
            )}

            {/* Citizen Feedback Form on Resolved */}
            {currentComplaint.status === 'Resolved' && (
              <div className="bg-amber-50 rounded-3xl p-6 border border-amber-200 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950">
                  Verify Resolution &amp; Citizen Feedback
                </h4>

                {currentComplaint.citizenFeedback || feedbackSaved ? (
                  <div className="text-xs text-amber-950 space-y-1.5">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map(st => (
                        <Star key={st} className="w-4 h-4 text-amber-500 fill-amber-400" />
                      ))}
                      <span className="font-bold ml-1">5/5 Verified by Citizen</span>
                    </div>
                    <p className="italic text-slate-800">
                      &quot;{currentComplaint.citizenFeedback?.comment || feedbackNote || 'Verified resolved satisfactorily.'}&quot;
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFeedback} className="space-y-3 text-xs">
                    <p className="text-amber-900">
                      Did the city department fix this issue satisfactorily? Rate the response:
                    </p>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setUserRating(star)}
                          className="p-1 text-slate-300 hover:text-amber-500 transition"
                        >
                          <Star className={`w-5 h-5 ${star <= userRating ? 'text-amber-500 fill-amber-400' : ''}`} />
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={feedbackNote}
                      onChange={(e) => setFeedbackNote(e.target.value)}
                      placeholder="Share a short feedback comment for the municipal engineering team..."
                      className="w-full px-4 py-2.5 rounded-xl border border-amber-300 text-xs outline-none bg-white focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
                    >
                      Submit Citizen Verification
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

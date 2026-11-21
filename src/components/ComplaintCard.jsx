import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  ThumbsUp,
  AlertTriangle,
  ChevronRight,
  Building,
  CheckCircle,
  Sparkles,
  ShieldAlert,
  Flame,
  Camera
} from 'lucide-react';

export default function ComplaintCard({
  complaint,
  onSelectComplaint,
  onUpvote
}) {
  const [upvoting, setUpvoting] = useState(false);

  const {
    id,
    trackingId,
    title,
    category,
    location,
    urgency = 'MEDIUM',
    publicImpactScore = 50,
    status = 'Reported',
    recommendedDepartment,
    estimatedSlaHours = 24,
    upvotes = 0,
    createdAt,
    imageUrl,
    resolutionProofImage,
    isDemo
  } = complaint;

  const handleUpvoteClick = async (e) => {
    e.stopPropagation();
    if (upvoting || !onUpvote) return;
    setUpvoting(true);
    await onUpvote(id);
    setUpvoting(false);
  };

  // Urgency styling with subtle glowing borders
  const urgencyStyles = {
    CRITICAL: {
      bg: 'bg-rose-50 text-rose-800 border-rose-300',
      dot: 'bg-rose-500 animate-pulse',
      cardHover: 'hover:border-rose-400 hover:shadow-glow-rose',
      leftBar: 'border-l-4 border-rose-500'
    },
    HIGH: {
      bg: 'bg-orange-50 text-orange-800 border-orange-300',
      dot: 'bg-orange-500',
      cardHover: 'hover:border-orange-400 hover:shadow-subtle',
      leftBar: 'border-l-4 border-orange-500'
    },
    MEDIUM: {
      bg: 'bg-amber-50 text-amber-800 border-amber-300',
      dot: 'bg-amber-500',
      cardHover: 'hover:border-amber-400 hover:shadow-subtle',
      leftBar: 'border-l-4 border-amber-500'
    },
    LOW: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      dot: 'bg-emerald-500',
      cardHover: 'hover:border-emerald-400 hover:shadow-subtle',
      leftBar: 'border-l-4 border-emerald-500'
    }
  }[urgency] || {
    bg: 'bg-slate-100 text-slate-800 border-slate-300',
    dot: 'bg-slate-400',
    cardHover: 'hover:border-slate-400 hover:shadow-subtle',
    leftBar: 'border-l-4 border-slate-400'
  };

  // Status badge styling
  const statusStyles = {
    Reported: 'bg-slate-100 text-slate-700 border-slate-300',
    Acknowledged: 'bg-blue-50 text-blue-700 border-blue-200',
    'In Progress': 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
    Resolved: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold'
  }[status] || 'bg-slate-100 text-slate-700';

  // Format time ago
  const formatTime = (iso) => {
    if (!iso) return '';
    try {
      const diffHrs = Math.round((Date.now() - new Date(iso).getTime()) / (1000 * 3600));
      if (diffHrs < 1) return 'Just now';
      if (diffHrs === 1) return '1h ago';
      if (diffHrs < 24) return `${diffHrs}h ago`;
      const days = Math.round(diffHrs / 24);
      return `${days}d ago`;
    } catch {
      return '';
    }
  };

  return (
    <div
      onClick={() => onSelectComplaint(complaint)}
      className={`bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer p-6 flex flex-col justify-between group ${urgencyStyles.cardHover} ${urgencyStyles.leftBar}`}
    >
      <div>
        {/* Header Row: Ticket ID + Urgency + Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-extrabold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
              {trackingId}
            </span>
            {isDemo && (
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Demo
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1.5">
            {/* Urgency Badge */}
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${urgencyStyles.bg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${urgencyStyles.dot}`} />
              {urgency}
            </span>

            {/* Status Pill */}
            <span className={`text-[11px] px-2.5 py-0.5 rounded-full border ${statusStyles}`}>
              {status}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2 leading-snug">
          {title}
        </h3>

        {/* Category & Location */}
        <div className="space-y-1.5 mb-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
            <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{recommendedDepartment || category}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Optional Image thumbnail preview */}
        {imageUrl && (
          <div className="mb-4 rounded-2xl overflow-hidden h-36 bg-slate-100 border border-slate-200 relative group/img">
            <img
              src={imageUrl}
              alt="Complaint evidence"
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {resolutionProofImage && (
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-600/90 text-white text-[10px] font-bold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Resolved Proof Available
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Metrics: Impact Score Bar + Upvotes + Details CTA */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        {/* Public Impact Score */}
        <div className="flex items-center space-x-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">Impact</span>
            <span className="font-extrabold text-slate-900 text-sm font-mono mt-0.5">{publicImpactScore}/100</span>
          </div>
          <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
            <div
              className={`h-full rounded-full ${
                publicImpactScore >= 80 ? 'bg-rose-500' :
                publicImpactScore >= 60 ? 'bg-orange-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(100, publicImpactScore)}%` }}
            />
          </div>
        </div>

        {/* Right side: Time + Upvote Button */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatTime(createdAt)}
          </span>

          <button
            type="button"
            onClick={handleUpvoteClick}
            disabled={upvoting}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-bold transition border border-slate-200 shadow-sm"
            title="Endorse this issue (+2 Impact Points)"
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${upvotes > 0 ? 'text-emerald-600 fill-emerald-100' : ''}`} />
            <span>{upvotes}</span>
          </button>

          <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition">
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}

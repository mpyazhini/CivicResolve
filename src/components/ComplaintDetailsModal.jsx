import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Clock,
  Sparkles,
  Building,
  CheckCircle2,
  AlertTriangle,
  ThumbsUp,
  Volume2,
  Check,
  Star,
  Send,
  ShieldCheck,
  User,
  ArrowRight
} from 'lucide-react';
import { speakText } from '../services/geminiService';
import { submitCitizenFeedback, upvoteComplaint } from '../services/complaintService';

export default function ComplaintDetailsModal({
  complaint,
  onClose,
  adminUser,
  onOpenAdminManage
}) {
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [localUpvotes, setLocalUpvotes] = useState(complaint?.upvotes || 0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!complaint) return null;

  const {
    id,
    trackingId,
    title,
    description,
    category,
    location,
    urgency = 'MEDIUM',
    urgencyReason,
    publicImpactScore = 50,
    safetyRiskScore = 20,
    publicExposureScore = 15,
    cascadingRiskScore = 15,
    recommendedDepartment,
    estimatedSlaHours = 24,
    status = 'Reported',
    timeline = [],
    imageUrl,
    resolutionProofImage,
    officialRemarks,
    keyConcerns = [],
    suggestedActions = [],
    citizenFeedback,
    reporterName,
    aiModelUsed,
    createdAt
  } = complaint;

  const handleReadAloud = () => {
    setIsSpeaking(true);
    const textToSpeak = `Grievance ${trackingId}. ${title}. Located at ${location}. Assessed urgency is ${urgency} with public impact score of ${publicImpactScore} out of 100. Assigned to ${recommendedDepartment}. ${urgencyReason || ''}`;
    speakText(textToSpeak);
    setTimeout(() => setIsSpeaking(false), 8000);
  };

  const handleUpvote = async () => {
    const res = await upvoteComplaint(id, 'citizen-modal');
    if (res.success) {
      setLocalUpvotes(res.newUpvotes);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    await submitCitizenFeedback(id, feedbackRating, feedbackComment);
    setFeedbackSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
        {/* Header Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs font-extrabold bg-slate-900 text-white px-2.5 py-1 rounded-md">
              {trackingId}
            </span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              urgency === 'CRITICAL' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
              urgency === 'HIGH' ? 'bg-orange-100 text-orange-800 border border-orange-300' :
              urgency === 'MEDIUM' ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            }`}>
              {urgency} Priority
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-700">
              {status}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleReadAloud}
              title="Read AI Triage Aloud (Accessibility TTS)"
              className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-indigo-600 animate-bounce' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Title & Reporter */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <strong>Location:</strong> {location}
              </span>
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <strong>Category:</strong> {category}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <strong>Reporter:</strong> {reporterName || 'Citizen'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Citizen Description</h4>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {description}
            </p>
          </div>

          {/* Evidence Photos Grid */}
          {(imageUrl || resolutionProofImage) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {imageUrl && (
                <div>
                  <span className="text-xs font-semibold text-slate-600 block mb-1">Citizen Evidence Photo:</span>
                  <div className="rounded-xl overflow-hidden border border-slate-200 h-44 bg-slate-100">
                    <img src={imageUrl} alt="Citizen Evidence" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
              {resolutionProofImage && (
                <div>
                  <span className="text-xs font-semibold text-emerald-700 block mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Department Resolution Proof Photo:
                  </span>
                  <div className="rounded-xl overflow-hidden border border-emerald-300 h-44 bg-emerald-50">
                    <img src={resolutionProofImage} alt="Official Resolution Proof" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Gemini AI Triage Analysis Block */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-5 border border-slate-800 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-white">Gemini AI Public Impact & Urgency Evaluation</h4>
              </div>
              <span className="text-[11px] font-mono text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800">
                {aiModelUsed || 'Gemini 3.8 Flash'}
              </span>
            </div>

            {/* Public Impact Breakdown Triplet */}
            <div className="grid grid-cols-3 gap-3 bg-slate-800/60 rounded-xl p-3 border border-slate-700/60 text-center">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Safety Danger</span>
                <span className="font-extrabold text-sm text-rose-400">{safetyRiskScore}/40</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Footfall Impact</span>
                <span className="font-extrabold text-sm text-amber-400">{publicExposureScore}/30</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Escalation Risk</span>
                <span className="font-extrabold text-sm text-orange-400">{cascadingRiskScore}/30</span>
              </div>
            </div>

            {/* Impact score bar */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Aggregated Public Impact Index:</span>
                <span className="font-extrabold text-white">{publicImpactScore}/100</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    publicImpactScore >= 80 ? 'bg-rose-500' :
                    publicImpactScore >= 60 ? 'bg-orange-500' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${publicImpactScore}%` }}
                />
              </div>
            </div>

            {/* AI Urgency Rationale */}
            {urgencyReason && (
              <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-800/40 p-3 rounded-lg border border-slate-700/40">
                &quot;{urgencyReason}&quot;
              </p>
            )}

            {/* Department & SLA */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-2 border-t border-slate-800">
              <div>
                <span className="text-slate-400">Assigned Department: </span>
                <span className="font-bold text-emerald-300">{recommendedDepartment}</span>
              </div>
              <div>
                <span className="text-slate-400">Target SLA: </span>
                <span className="font-bold text-indigo-300">{estimatedSlaHours} Hours</span>
              </div>
            </div>

            {/* Key concerns tags */}
            {keyConcerns.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {keyConcerns.map(kc => (
                  <span key={kc} className="px-2 py-0.5 rounded bg-indigo-900/50 text-[11px] text-indigo-200 border border-indigo-700/40">
                    {kc}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Suggested Actions for Municipal Dispatchers */}
          {suggestedActions.length > 0 && (
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Recommended Field Action Checklist
              </h4>
              <ul className="text-xs text-emerald-800 space-y-1.5">
                {suggestedActions.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold text-emerald-600 mt-0.5">•</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Interactive Resolution Timeline */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-600" /> Resolution Audit Trail & Timeline
            </h4>
            <div className="relative pl-6 space-y-4 border-l-2 border-slate-200">
              {timeline.length > 0 ? (
                timeline.map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white shadow-sm" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-900">{step.status}</span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(step.timestamp).toLocaleString()}
                        </span>
                        {step.actor && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                            {step.actor}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{step.note}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">Ticket logged. Awaiting municipal dispatch team acknowledgment.</p>
              )}
            </div>
          </div>

          {/* Official Remarks */}
          {officialRemarks && (
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs">
              <span className="font-bold text-blue-900 block mb-0.5">Official Municipal Remark:</span>
              <p className="text-blue-800">{officialRemarks}</p>
            </div>
          )}

          {/* Citizen Feedback Rating on Resolved Complaints */}
          {status === 'Resolved' && (
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                Citizen Resolution Satisfaction Feedback
              </h4>

              {citizenFeedback || feedbackSubmitted ? (
                <div className="space-y-1 text-xs text-amber-900">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= (citizenFeedback?.rating || feedbackRating) ? 'text-amber-500 fill-amber-400' : 'text-slate-300'}`}
                      />
                    ))}
                    <span className="font-bold ml-1">{(citizenFeedback?.rating || feedbackRating)}/5 Stars</span>
                  </div>
                  <p className="italic text-slate-700">
                    &quot;{citizenFeedback?.comment || feedbackComment || 'Verified resolved by citizen.'}&quot;
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-700">Rate resolution quality:</span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedbackRating(star)}
                          className="p-1 text-slate-300 hover:text-amber-400 transition"
                        >
                          <Star className={`w-5 h-5 ${star <= feedbackRating ? 'text-amber-500 fill-amber-400' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    placeholder="Was the problem fixed satisfactorily? Leave a brief citizen verification note..."
                    className="w-full px-3 py-2 rounded-lg border border-amber-300 text-xs outline-none bg-white focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium shadow-sm transition"
                  >
                    Submit Verification
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between rounded-b-3xl">
          <button
            onClick={handleUpvote}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 shadow-sm text-xs font-semibold transition"
          >
            <ThumbsUp className="w-4 h-4 text-emerald-600" />
            <span>Endorse Issue ({localUpvotes})</span>
          </button>

          <div className="flex items-center space-x-2">
            {adminUser && onOpenAdminManage && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAdminManage(complaint);
                }}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
              >
                Update Status as Admin
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

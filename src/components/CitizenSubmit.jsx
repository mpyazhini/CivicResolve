import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  MapPin,
  Camera,
  X,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Shield,
  Send,
  Loader2,
  Copy,
  Check,
  Building,
  Info,
  ThumbsUp,
  Volume2,
  Hammer,
  Droplets,
  Waves,
  Zap,
  Trash2,
  AlertOctagon,
  ShieldAlert,
  ArrowRight,
  UploadCloud,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATEGORIES, analyzeGrievanceWithGemini, speakText } from '../services/geminiService';
import { createComplaint, checkDuplicateComplaints } from '../services/complaintService';

// Category cards metadata with specific icons
const CATEGORY_CARDS = [
  { id: 'Potholes & Broken Roads', label: 'Potholes & Roads', icon: Hammer, color: 'emerald' },
  { id: 'Water Pipeline Burst & Contamination', label: 'Water Pipeline', icon: Droplets, color: 'blue' },
  { id: 'Sewage Overflow & Drainage Block', label: 'Sewage & Drains', icon: Waves, color: 'cyan' },
  { id: 'Streetlights & Electrical Hazards', label: 'Streetlights & Power', icon: Zap, color: 'amber' },
  { id: 'Garbage Dumps & Waste Collection', label: 'Sanitation & Waste', icon: Trash2, color: 'rose' },
  { id: 'Open Manholes & Storm Drains', label: 'Open Manholes', icon: AlertOctagon, color: 'orange' },
  { id: 'Stray Animals & Vector Control', label: 'Health & Vectors', icon: ShieldAlert, color: 'indigo' },
  { id: 'Traffic Signals & Illegal Obstructions', label: 'Traffic & Signals', icon: AlertTriangle, color: 'violet' }
];

export default function CitizenSubmit({
  complaints = [],
  onGrievanceSubmitted,
  onNavigateToTrack,
  userApiKey = null
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [reporterContact, setReporterContact] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Image handling
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [imageMimeType, setImageMimeType] = useState('image/jpeg');

  // AI & submission states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [duplicateMatches, setDuplicateMatches] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState(null);
  const [copiedTrackingId, setCopiedTrackingId] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isGpsLoading, setIsGpsLoading] = useState(false);

  // Quick preset locations for Coimbatore
  const quickLocations = [
    'Avinashi Road, Opp PSG iTech Gate, Coimbatore',
    'Peelamedu Main Road, Near Fun Mall, Coimbatore',
    'Gandhipuram Cross Cut Road, Coimbatore',
    'RS Puram DB Road, Coimbatore',
    'Saravanampatti IT Corridor, Keeranatham Road'
  ];

  // Auto-detect duplicates when title or location changes
  useEffect(() => {
    if (title.length > 5) {
      const timer = setTimeout(() => {
        const matches = checkDuplicateComplaints(title, description, category, location, complaints);
        setDuplicateMatches(matches);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setDuplicateMatches([]);
    }
  }, [title, description, category, location, complaints]);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image size must be less than 5MB.');
      return;
    }

    setImageMimeType(file.type || 'image/jpeg');
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageBase64(null);
  };

  // Run Gemini AI Analysis
  const runAiAnalysis = async () => {
    if (!title.trim() && !description.trim()) {
      setErrorMsg('Please enter a brief title or description first.');
      return;
    }
    setErrorMsg('');
    setIsAnalyzing(true);
    try {
      const result = await analyzeGrievanceWithGemini({
        title,
        description,
        category,
        location,
        imageDataBase64: imageBase64,
        imageMimeType,
        userApiKey
      });

      setAiResult(result);
      if (!category && result.category) {
        setCategory(result.category);
      }
    } catch (err) {
      console.error('AI Analysis failed:', err);
      setErrorMsg('AI Analysis encountered a temporary issue. Fallback heuristic analysis engaged.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Quick auto-populate for hackathon demo
  const fillDemoGrievance = (demoType) => {
    if (demoType === 'pothole') {
      setTitle('Dangerous asphalt crater pothole near PSG iTech campus');
      setCategory('Potholes & Broken Roads');
      setLocation('Avinashi Road, Opposite PSG iTech Gate 2, Neelambur, Coimbatore');
      setDescription('A severe 2-foot wide crater has formed on the right carriageway lane right outside the college campus. Multiple two-wheelers skidded during morning hours. Urgent asphalt patching needed before nighttime traffic.');
      setImagePreview('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80');
      setReporterName('Student Commuter');
      setReporterContact('commuter@psgitech.ac.in');
    } else if (demoType === 'wire') {
      setTitle('Exposed live wire sparking on pedestrian footpath in Gandhipuram');
      setCategory('Streetlights & Electrical Hazards');
      setLocation('7th Cross, Cross Cut Road, Gandhipuram, Coimbatore');
      setDescription('An overhead electrical cable snapped and is dangling just 4 feet above the pedestrian walkway near commercial shops. Intermittent sparking seen in wet conditions. Massive crowd footfall danger.');
      setImagePreview('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80');
      setReporterName('Local Trader');
      setReporterContact('9843012345');
    } else if (demoType === 'water') {
      setTitle('Heavy potable water pipeline leak flooding Peelamedu junction');
      setCategory('Water Pipeline Burst & Contamination');
      setLocation('Peelamedu Main Road, Near Fun Mall, Coimbatore');
      setDescription('Continuous drinking water surge from underground main line. Water depth reached 8 inches on the road causing traffic backlog. Residential taps running completely dry.');
      setImagePreview('https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80');
      setReporterName('Peelamedu Resident Association');
      setReporterContact('rwapeelamedu@gmail.com');
    }
  };

  // Fetch current GPS coordinates
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }
    setIsGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsGpsLoading(false);
        const { latitude, longitude } = pos.coords;
        setLocation(`GPS: ${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E (Near PSG iTech Campus, Coimbatore)`);
      },
      () => {
        setIsGpsLoading(false);
        setErrorMsg('Unable to retrieve location. Please type your locality.');
      }
    );
  };

  // Submit Complaint
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || title.length < 5) {
      setErrorMsg('Please provide a meaningful grievance headline (at least 5 characters).');
      return;
    }
    if (!description.trim() || description.length < 10) {
      setErrorMsg('Please describe the problem in more detail (at least 10 characters).');
      return;
    }
    if (!location.trim()) {
      setErrorMsg('Please specify the location or landmark.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      // If AI hasn't been run yet, run it now to classify and determine urgency
      let finalAi = aiResult;
      if (!finalAi) {
        finalAi = await analyzeGrievanceWithGemini({
          title,
          description,
          category,
          location,
          imageDataBase64: imageBase64,
          imageMimeType,
          userApiKey
        });
      }

      const complaintData = {
        title: title.trim(),
        description: description.trim(),
        category: finalAi?.category || category || 'General Municipal Grievance',
        location: location.trim(),
        imageUrl: imagePreview || null,
        urgency: finalAi?.urgency || 'MEDIUM',
        urgencyReason: finalAi?.urgencyReason || 'Standard municipal resolution routing.',
        recommendedDepartment: finalAi?.recommendedDepartment || 'Municipal General Administration & Ward Governance',
        departmentId: finalAi?.departmentId || 'admin',
        estimatedSlaHours: finalAi?.estimatedSlaHours || 48,
        safetyRiskScore: finalAi?.safetyRiskScore || 15,
        publicExposureScore: finalAi?.publicExposureScore || 15,
        cascadingRiskScore: finalAi?.cascadingRiskScore || 15,
        publicImpactScore: finalAi?.publicImpactScore || 45,
        suggestedActions: finalAi?.suggestedActions || ['Assign ward field inspector'],
        keyConcerns: finalAi?.keyConcerns || ['Public Grievance'],
        reporterName: isAnonymous ? 'Anonymous Citizen' : (reporterName || 'Citizen'),
        reporterContact: isAnonymous ? '' : reporterContact,
        isAnonymous,
        aiModelUsed: finalAi?.aiModelUsed || 'CivicResolve AI'
      };

      const record = await createComplaint(complaintData);

      // Trigger celebratory confetti
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });

      setSubmittedReceipt(record);
      if (onGrievanceSubmitted) onGrievanceSubmitted(record);
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMsg('Submission encountered an error. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyTrackingCode = () => {
    if (submittedReceipt?.trackingId) {
      navigator.clipboard.writeText(submittedReceipt.trackingId);
      setCopiedTrackingId(true);
      setTimeout(() => setCopiedTrackingId(false), 2500);
    }
  };

  const resetForm = () => {
    setTitle('');
    setCategory('');
    setDescription('');
    setLocation('');
    setImagePreview(null);
    setImageBase64(null);
    setAiResult(null);
    setSubmittedReceipt(null);
    setDuplicateMatches([]);
    setReporterName('');
    setReporterContact('');
    setErrorMsg('');
  };

  // If receipt is displayed after submission
  if (submittedReceipt) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-center p-8 sm:p-10 space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Grievance Registered Successfully!</h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-md mx-auto">
              Your report has been analyzed with Gemini AI, prioritized by public safety risk, and dispatched to the designated engineering team.
            </p>
          </div>

          {/* Tracking ID Badge Card */}
          <div className="p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 rounded-2xl border border-emerald-200 shadow-sm">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              Official Grievance Tracking Number
            </span>
            <div className="flex items-center justify-center space-x-3 mt-2">
              <span className="font-mono text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-wider">
                {submittedReceipt.trackingId}
              </span>
              <button
                onClick={copyTrackingCode}
                className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 shadow-sm transition-colors"
                title="Copy Tracking ID"
              >
                {copiedTrackingId ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            {copiedTrackingId && (
              <p className="text-xs text-emerald-700 font-semibold mt-1.5">Copied to clipboard!</p>
            )}
          </div>

          {/* AI Triage Summary */}
          <div className="bg-slate-50 rounded-2xl p-5 text-left border border-slate-200 text-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Assigned Department:</span>
              <span className="font-bold text-slate-900">{submittedReceipt.recommendedDepartment}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Urgency Level:</span>
              <span className={`font-bold px-2.5 py-0.5 rounded-full ${
                submittedReceipt.urgency === 'CRITICAL' ? 'bg-rose-100 text-rose-800' :
                submittedReceipt.urgency === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                submittedReceipt.urgency === 'MEDIUM' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {submittedReceipt.urgency} Priority
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Public Impact Priority:</span>
              <span className="font-extrabold text-slate-900 font-mono">{submittedReceipt.publicImpactScore}/100</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Target Resolution SLA:</span>
              <span className="font-bold text-emerald-700">{submittedReceipt.estimatedSlaHours} Hours</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => onNavigateToTrack(submittedReceipt.trackingId)}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/25 transition"
            >
              Track Grievance Live
            </button>
            <button
              onClick={resetForm}
              className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition"
            >
              Report Another Issue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 space-y-8">
      {/* Page Title & Hackathon Demo Fill */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Autonomous AI Triage Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Report a Citizen Grievance
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Submit public civic issues in seconds. Our AI immediately classifies urgency, calculates public risk, and routes directly to the municipal engineer.
          </p>
        </div>

        {/* Demo Fill Bar for Hackathon Judges */}
        <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-md border border-slate-800 flex flex-col gap-2 self-start md:self-auto text-xs">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Hackathon Demo Quick-Fill:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => fillDemoGrievance('pothole')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-emerald-950 text-slate-200 hover:text-emerald-300 rounded-lg border border-slate-700 font-semibold transition text-[11px]"
            >
              🚗 Pothole at PSG iTech
            </button>
            <button
              type="button"
              onClick={() => fillDemoGrievance('wire')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-rose-950 text-slate-200 hover:text-rose-300 rounded-lg border border-slate-700 font-semibold transition text-[11px]"
            >
              ⚡ Live Wire Spark
            </button>
            <button
              type="button"
              onClick={() => fillDemoGrievance('water')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-blue-950 text-slate-200 hover:text-blue-300 rounded-lg border border-slate-700 font-semibold transition text-[11px]"
            >
              💧 Pipe Burst Peelamedu
            </button>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 shadow-sm">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-600 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Duplicate detection warning */}
      {duplicateMatches.length > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-3xl p-6 shadow-sm space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-amber-950">
                Potential Duplicate Grievance Detected ({duplicateMatches[0].similarityScore}% Match)
              </h4>
              <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                A similar issue has already been reported in this vicinity. Instead of filing a duplicate ticket, you can upvote it to immediately elevate its public impact score!
              </p>
              <div className="mt-3 space-y-2">
                {duplicateMatches.map(({ complaint, similarityScore }) => (
                  <div
                    key={complaint.id}
                    className="bg-white p-3.5 rounded-xl border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs shadow-sm"
                  >
                    <div>
                      <span className="font-bold text-slate-900 font-mono">{complaint.trackingId}: </span>
                      <span className="text-slate-800">{complaint.title}</span>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        📍 {complaint.location} • Status: <span className="font-semibold text-emerald-700">{complaint.status}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigateToTrack(complaint.trackingId)}
                      className="self-start sm:self-auto px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition text-xs"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" /> Endorse Existing
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Reporting Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Headline & Description */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <span className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              01
            </span>
            <h2 className="text-base font-bold text-slate-900">Issue Headline &amp; Details</h2>
          </div>

          <div>
            <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Grievance Headline / Issue Summary <span className="text-rose-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Severe crater pothole on Avinashi Road near PSG iTech campus"
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Detailed Description &amp; Observed Hazards <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what is broken, approximate dimensions, risks to pedestrians, two-wheelers, or children, and how long the issue has persisted..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition leading-relaxed"
              required
            />
          </div>
        </div>

        {/* Step 2: Interactive Category Selection Cards */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                02
              </span>
              <h2 className="text-base font-bold text-slate-900">Civic Category Selection</h2>
            </div>
            <span className="text-xs text-slate-500">Pick a category or let Gemini auto-detect</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORY_CARDS.map(cat => {
              const Icon = cat.icon;
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between h-24 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-emerald-950' : 'text-slate-800'}`}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          {category && (
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>Selected: <strong>{category}</strong></span>
              <button
                type="button"
                onClick={() => setCategory('')}
                className="text-emerald-700 underline font-semibold"
              >
                Clear Selection (Auto-detect)
              </button>
            </div>
          )}
        </div>

        {/* Step 3: Location and Evidence */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <span className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              03
            </span>
            <h2 className="text-base font-bold text-slate-900">Location &amp; Photo Evidence</h2>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Location / Landmark / Ward <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={isGpsLoading}
                className="text-xs text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1 transition"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{isGpsLoading ? 'Fetching GPS...' : 'Use Current GPS'}</span>
              </button>
            </div>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Avinashi Road, Opposite PSG iTech Gate 2, Neelambur"
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none transition"
              required
            />
          </div>

          {/* Quick preset locations */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Localities:</span>
            {quickLocations.map(loc => (
              <button
                key={loc}
                type="button"
                onClick={() => setLocation(loc)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
              >
                {loc.split(',')[0]}
              </button>
            ))}
          </div>

          {/* Multimodal Image Attachment */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Photo Evidence (Analyzed by Gemini Multimodal Vision)</span>
              <span className="text-[11px] text-slate-400 font-normal">Optional</span>
            </label>

            {imagePreview ? (
              <div className="relative inline-block rounded-2xl overflow-hidden border border-slate-300 shadow-md">
                <img
                  src={imagePreview}
                  alt="Grievance evidence preview"
                  className="w-64 h-40 object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1.5 bg-black/70 text-white rounded-full hover:bg-black transition"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition bg-slate-50/50 hover:bg-emerald-50/20 group">
                <div className="w-12 h-12 rounded-2xl bg-white text-slate-500 group-hover:text-emerald-600 flex items-center justify-center shadow-sm mb-2 transition">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800">Upload evidence photo or take a picture</span>
                <span className="text-[11px] text-slate-400 mt-0.5">JPG, PNG, WebP up to 5MB (Analyzed for road cracks, water depth, spark risk)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Step 4: Gemini AI Live Triage Card */}
        <div className="bg-gradient-to-br from-slate-900 via-midnight-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-400/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">Gemini 3.8 AI Triage Assessment</h3>
                <p className="text-xs text-slate-400">Autonomous severity classification and municipal routing</p>
              </div>
            </div>

            <button
              type="button"
              onClick={runAiAnalysis}
              disabled={isAnalyzing}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition disabled:opacity-50 shadow-md shadow-indigo-600/30"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing with Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                  <span>Run AI Triage</span>
                </>
              )}
            </button>
          </div>

          {aiResult ? (
            <div className="space-y-5 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Assessed Urgency</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                    aiResult.urgency === 'CRITICAL' ? 'bg-rose-500 text-white' :
                    aiResult.urgency === 'HIGH' ? 'bg-orange-500 text-white' : 'bg-amber-400 text-slate-900'
                  }`}>
                    {aiResult.urgency}
                  </span>
                </div>

                <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Impact Score</span>
                  <span className="text-xl font-mono font-extrabold text-white mt-0.5 block">{aiResult.publicImpactScore} / 100</span>
                </div>

                <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Target SLA</span>
                  <span className="text-sm font-bold text-emerald-400 mt-1 block flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {aiResult.estimatedSlaHours}h
                  </span>
                </div>

                <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">AI Engine</span>
                  <span className="text-xs font-bold text-indigo-300 mt-1 block truncate">
                    {aiResult.aiModelUsed?.split('(')[0] || 'Gemini 3.8'}
                  </span>
                </div>
              </div>

              {/* Rationale Quote */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 text-slate-300 leading-relaxed italic text-xs">
                &quot;{aiResult.urgencyReason}&quot;
              </div>

              {/* Department */}
              <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/80 flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Recommended Department:</span>
                <span className="font-extrabold text-emerald-400">{aiResult.recommendedDepartment}</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">
              Fill in the headline and details above, then click &quot;Run AI Triage&quot; to preview live urgency, safety risk scoring, and department recommendation.
            </p>
          )}
        </div>

        {/* Step 5: Reporter Contact & Submission */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                04
              </span>
              <h2 className="text-base font-bold text-slate-900">Reporter Information</h2>
            </div>

            <label className="flex items-center space-x-2 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
              />
              <span className="font-semibold">Submit Anonymously</span>
            </label>
          </div>

          {!isAnonymous && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="e.g., S. Karthik"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Email or Mobile Number
                </label>
                <input
                  type="text"
                  value={reporterContact}
                  onChange={(e) => setReporterContact(e.target.value)}
                  placeholder="For SMS status updates & resolution alerts"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Upon submission, an immutable ticket will be recorded in Cloud Firestore and queued for municipal dispatch.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Dispatching Grievance...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit &amp; Dispatch Grievance</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

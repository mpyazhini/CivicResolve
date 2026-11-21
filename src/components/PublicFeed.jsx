import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  AlertTriangle,
  Building,
  CheckCircle,
  Clock,
  Sparkles,
  Layers,
  MapPin,
  Radio,
  PlusCircle,
  TrendingUp,
  LayoutGrid,
  List
} from 'lucide-react';
import ComplaintCard from './ComplaintCard';

export default function PublicFeed({
  complaints = [],
  onSelectComplaint,
  onUpvote,
  onNavigateToSubmit
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedUrgency, setSelectedUrgency] = useState('ALL');
  const [sortBy, setSortBy] = useState('impact'); // 'impact', 'upvotes', 'newest', 'oldest'

  // Metric counts calculated from live complaints prop
  const stats = useMemo(() => {
    return {
      total: complaints.length,
      critical: complaints.filter(c => c.urgency === 'CRITICAL').length,
      high: complaints.filter(c => c.urgency === 'HIGH').length,
      inProgress: complaints.filter(c => c.status === 'In Progress').length,
      resolved: complaints.filter(c => c.status === 'Resolved').length
    };
  }, [complaints]);

  // Categories list for filtering with dynamic counts
  const categoryFilters = [
    { id: 'ALL', label: 'All Issues' },
    { id: 'roads', label: '🚗 Roads & Potholes', match: 'Potholes' },
    { id: 'water', label: '💧 Water & Sewage', match: 'Water' },
    { id: 'electricity', label: '⚡ Streetlights & Power', match: 'Streetlights' },
    { id: 'sanitation', label: '🗑️ Sanitation & Waste', match: 'Garbage' }
  ];

  // Filtered & sorted complaints
  const filteredComplaints = useMemo(() => {
    return complaints.filter(comp => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          comp.title?.toLowerCase().includes(q) ||
          comp.location?.toLowerCase().includes(q) ||
          comp.trackingId?.toLowerCase().includes(q) ||
          comp.description?.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Category filter
      if (selectedCategory !== 'ALL') {
        const catFilter = categoryFilters.find(f => f.id === selectedCategory);
        if (catFilter && !comp.category?.toLowerCase().includes(catFilter.match?.toLowerCase())) {
          return false;
        }
      }

      // Status filter
      if (selectedStatus !== 'ALL') {
        if (selectedStatus === 'ACTIVE' && comp.status === 'Resolved') return false;
        if (selectedStatus === 'RESOLVED' && comp.status !== 'Resolved') return false;
        if (selectedStatus === 'IN_PROGRESS' && comp.status !== 'In Progress') return false;
      }

      // Urgency filter
      if (selectedUrgency !== 'ALL' && comp.urgency !== selectedUrgency) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'impact') {
        return (b.publicImpactScore || 0) - (a.publicImpactScore || 0);
      }
      if (sortBy === 'upvotes') {
        return (b.upvotes || 0) - (a.upvotes || 0);
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return 0;
    });
  }, [complaints, searchQuery, selectedCategory, selectedStatus, selectedUrgency, sortBy]);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Feed Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Live Community Stream</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Public Grievance &amp; Impact Feed
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Real-time citizen reports prioritized by Gemini AI based on pedestrian danger and public safety impact.
          </p>
        </div>

        <button
          onClick={onNavigateToSubmit}
          className="self-start md:self-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>File New Grievance</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center font-extrabold text-xl font-mono">
            {stats.total}
          </div>
          <div>
            <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">Total Reports</span>
            <span className="text-sm font-extrabold text-slate-900">Ward Overview</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-rose-200 shadow-sm flex items-center space-x-3.5 bg-gradient-to-br from-white to-rose-50/30">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-extrabold text-xl font-mono">
            {stats.critical}
          </div>
          <div>
            <span className="text-xs text-rose-600 font-bold block uppercase tracking-wider">Critical Priority</span>
            <span className="text-sm font-extrabold text-rose-950">&lt; 12h Mobile SLA</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-amber-200 shadow-sm flex items-center space-x-3.5 bg-gradient-to-br from-white to-amber-50/30">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-xl font-mono">
            {stats.inProgress}
          </div>
          <div>
            <span className="text-xs text-amber-700 font-bold block uppercase tracking-wider">In Progress</span>
            <span className="text-sm font-extrabold text-amber-950">Field Squads Active</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-emerald-200 shadow-sm flex items-center space-x-3.5 bg-gradient-to-br from-white to-emerald-50/30">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-xl font-mono">
            {stats.resolved}
          </div>
          <div>
            <span className="text-xs text-emerald-700 font-bold block uppercase tracking-wider">Verified Resolved</span>
            <span className="text-sm font-extrabold text-emerald-950">Citizen Verified</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
        <div className="flex flex-col lg:flex-row gap-3.5 items-stretch lg:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords, location, street name, or ticket ID..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-xs sm:text-sm outline-none"
            />
          </div>

          {/* Select dropdowns */}
          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-700 outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active (Reported / In Progress)</option>
              <option value="IN_PROGRESS">In Progress Only</option>
              <option value="RESOLVED">Resolved Only</option>
            </select>

            <select
              value={selectedUrgency}
              onChange={(e) => setSelectedUrgency(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-700 outline-none"
            >
              <option value="ALL">All Urgencies</option>
              <option value="CRITICAL">Critical Priority Only</option>
              <option value="HIGH">High Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="LOW">Low Priority</option>
            </select>

            {/* Sort Select */}
            <div className="flex items-center space-x-1.5 border border-slate-300 rounded-xl px-2.5 py-1.5 bg-white">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold bg-transparent text-slate-700 outline-none cursor-pointer"
              >
                <option value="impact">Sort: Public Impact Score</option>
                <option value="upvotes">Sort: Most Endorsed</option>
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100 text-xs">
          <span className="font-bold text-slate-500 flex-shrink-0 mr-1 uppercase text-[10px] tracking-wider">Categories:</span>
          {categoryFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedCategory(filter.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition text-xs ${
                selectedCategory === filter.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints Grid */}
      {filteredComplaints.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComplaints.map(complaint => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              onSelectComplaint={onSelectComplaint}
              onUpvote={onUpvote}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg">No Matching Grievances Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Try adjusting your search keywords, clear category filters, or file a new report for your area.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
              setSelectedStatus('ALL');
              setSelectedUrgency('ALL');
            }}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

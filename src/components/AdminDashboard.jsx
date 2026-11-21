import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Shield,
  Building,
  UserCheck,
  Search,
  Filter,
  RefreshCw,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Camera,
  X,
  FileCheck,
  Check,
  Lock
} from 'lucide-react';
import { updateComplaintStatus, seedDemoComplaints, clearDemoComplaints } from '../services/complaintService';

export default function AdminDashboard({
  complaints = [],
  adminUser,
  onOpenLoginModal,
  onRefresh,
  onSelectComplaint
}) {
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [newStatus, setNewStatus] = useState('In Progress');
  const [officialNote, setOfficialNote] = useState('');
  const [assignedOfficer, setAssignedOfficer] = useState('');
  const [resolutionProof, setResolutionProof] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [urgencyFilter, setUrgencyFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [successBanner, setSuccessBanner] = useState('');

  // Calculate statistics from live complaints
  const stats = useMemo(() => {
    const total = complaints.length;
    const critical = complaints.filter(c => c.urgency === 'CRITICAL').length;
    const inProgress = complaints.filter(c => c.status === 'In Progress').length;
    const resolved = complaints.filter(c => c.status === 'Resolved').length;
    const complianceRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

    return { total, critical, inProgress, resolved, complianceRate };
  }, [complaints]);

  // Filtered grievances
  const filteredComplaints = useMemo(() => {
    return complaints.filter(comp => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          comp.title?.toLowerCase().includes(q) ||
          comp.trackingId?.toLowerCase().includes(q) ||
          comp.location?.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (statusFilter !== 'ALL' && comp.status !== statusFilter) return false;
      if (departmentFilter !== 'ALL' && comp.departmentId !== departmentFilter) return false;
      if (urgencyFilter !== 'ALL' && comp.urgency !== urgencyFilter) return false;
      return true;
    }).sort((a, b) => (b.publicImpactScore || 0) - (a.publicImpactScore || 0));
  }, [complaints, searchQuery, statusFilter, departmentFilter, urgencyFilter]);

  // Open manage modal
  const handleOpenManage = (comp) => {
    setSelectedGrievance(comp);
    setNewStatus(comp.status === 'Reported' ? 'In Progress' : comp.status);
    setOfficialNote(comp.officialRemarks || '');
    setAssignedOfficer(comp.assignedOfficer || (adminUser?.email?.split('@')[0] || 'Er. R. Ramesh (PWD AE)'));
    setResolutionProof(comp.resolutionProofImage || '');
  };

  // Submit status update
  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGrievance) return;
    setIsUpdating(true);

    try {
      await updateComplaintStatus({
        complaintId: selectedGrievance.id,
        status: newStatus,
        officialRemarks: officialNote,
        assignedOfficer,
        resolutionProofImage: resolutionProof || null,
        actorName: assignedOfficer || (adminUser?.displayName || adminUser?.email?.split('@')[0] || 'Municipal Officer')
      });

      setSuccessBanner(`Grievance ${selectedGrievance.trackingId} successfully transitioned to "${newStatus}"!`);
      setSelectedGrievance(null);
      if (onRefresh) onRefresh();
      setTimeout(() => setSuccessBanner(''), 4000);
    } catch (err) {
      console.error('Update error:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Seed demo data
  const handleSeedDemo = async () => {
    await seedDemoComplaints();
    setSuccessBanner('Loaded realistic Coimbatore hackathon complaints into Firestore!');
    if (onRefresh) onRefresh();
    setTimeout(() => setSuccessBanner(''), 3000);
  };

  // Clear demo data
  const handleClearDemo = () => {
    clearDemoComplaints();
    setSuccessBanner('Demo records cleared from cache.');
    if (onRefresh) onRefresh();
    setTimeout(() => setSuccessBanner(''), 3000);
  };

  // If not authenticated, show sign in invitation
  if (!adminUser) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-14 shadow-xl border border-slate-200 max-w-xl mx-auto space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-slate-900 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-black/10">
            <Shield className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Municipal Command Center</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
              Authentication required to update resolution statuses, dispatch field engineering crews, and log resolution proof photos.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenLoginModal}
              className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-slate-900/20 transition inline-flex items-center gap-2"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Authenticate as Municipal Officer</span>
            </button>
          </div>
          <p className="text-xs text-slate-400">
            Hackathon Judges: One-click &quot;Enter as Demo Admin&quot; is available inside the modal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-200">
              Municipal Portal Active
            </span>
            <span className="text-xs font-mono text-slate-500">
              Officer: <strong>{adminUser?.email}</strong>
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Grievance Command &amp; Dispatch Center
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
            Review Gemini AI triaged civic issues, assign field teams, monitor SLA countdowns, and verify resolutions.
          </p>
        </div>

        {/* Demo data management buttons */}
        <div className="flex items-center space-x-2.5 self-start md:self-auto">
          <button
            onClick={handleSeedDemo}
            className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200 transition flex items-center gap-2 shadow-sm"
            title="Load realistic Coimbatore sample complaints"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Load Demo Data</span>
          </button>
          <button
            onClick={handleClearDemo}
            className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-slate-200 transition"
            title="Clear Demo Complaints"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {successBanner && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successBanner}</span>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Total Active</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">{stats.total}</span>
            <span className="text-xs text-slate-500 font-medium">tickets</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-rose-200 shadow-sm bg-gradient-to-br from-white to-rose-50/40 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block">Critical Emergency</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-rose-700 font-mono">{stats.critical}</span>
            <span className="text-xs text-rose-600 font-semibold">&lt; 12h SLA</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm bg-gradient-to-br from-white to-amber-50/40 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">In Progress</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-amber-800 font-mono">{stats.inProgress}</span>
            <span className="text-xs text-amber-700 font-semibold">Dispatched</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm bg-gradient-to-br from-white to-emerald-50/40 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">Verified Resolved</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-800 font-mono">{stats.resolved}</span>
            <span className="text-xs text-emerald-700 font-semibold">{stats.complianceRate}% SLA</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by ticket ID, keywords, or locality..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-700 outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Reported">Reported (Pending)</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-700 outline-none"
            >
              <option value="ALL">All Urgencies</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grievance Management Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-4 px-5">Ticket ID</th>
                <th className="py-4 px-5">Grievance Details</th>
                <th className="py-4 px-5">Department</th>
                <th className="py-4 px-5">Urgency</th>
                <th className="py-4 px-5">Impact</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map(comp => (
                  <tr key={comp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-5 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {comp.trackingId}
                      {comp.isDemo && (
                        <span className="block text-[9px] text-indigo-600 font-bold uppercase mt-0.5">Demo</span>
                      )}
                    </td>
                    <td className="py-4 px-5 max-w-xs">
                      <div className="font-bold text-slate-900 truncate text-xs" title={comp.title}>
                        {comp.title}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5" title={comp.location}>
                        📍 {comp.location}
                      </div>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="text-slate-800 font-semibold truncate block max-w-[150px]" title={comp.recommendedDepartment}>
                        {comp.recommendedDepartment?.split('&')[0] || comp.category}
                      </span>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                        comp.urgency === 'CRITICAL' ? 'bg-rose-100 text-rose-800' :
                        comp.urgency === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                        comp.urgency === 'MEDIUM' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {comp.urgency}
                      </span>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap font-extrabold text-slate-900 font-mono">
                      {comp.publicImpactScore}/100
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                        comp.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                        comp.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {comp.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right whitespace-nowrap space-x-1.5">
                      <button
                        onClick={() => handleOpenManage(comp)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[11px] font-bold shadow-sm transition"
                      >
                        Manage
                      </button>
                      <button
                        onClick={() => onSelectComplaint(comp)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[11px] font-semibold transition"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No grievances match the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Status Update Modal */}
      {selectedGrievance && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-emerald-400 font-extrabold">
                  {selectedGrievance.trackingId}
                </span>
                <h3 className="font-bold text-sm text-white">Update Grievance Status</h3>
              </div>
              <button
                onClick={() => setSelectedGrievance(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStatusSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Issue Summary
                </label>
                <p className="p-3 bg-slate-50 rounded-xl text-slate-800 border border-slate-200 font-medium">
                  {selectedGrievance.title}
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Lifecycle Status Transition
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-xs bg-white outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Reported">Reported (Pending Review)</option>
                  <option value="Acknowledged">Acknowledged (Department Assigned)</option>
                  <option value="In Progress">In Progress (Squad Dispatched)</option>
                  <option value="Resolved">Resolved (Work Complete &amp; Verified)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Assigned Officer / Engineer
                </label>
                <input
                  type="text"
                  value={assignedOfficer}
                  onChange={(e) => setAssignedOfficer(e.target.value)}
                  placeholder="e.g. Er. R. Ramesh (PWD Assistant Engineer)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Official Dispatch Remarks / Action Taken
                </label>
                <textarea
                  rows={3}
                  value={officialNote}
                  onChange={(e) => setOfficialNote(e.target.value)}
                  placeholder="Detail actions taken, team dispatched, materials utilized, and completion notes for the citizen audit trail..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-emerald-500 font-medium leading-relaxed"
                  required
                />
              </div>

              {newStatus === 'Resolved' && (
                <div>
                  <label className="block font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5" /> Resolution Proof Image URL
                  </label>
                  <input
                    type="url"
                    value={resolutionProof}
                    onChange={(e) => setResolutionProof(e.target.value)}
                    placeholder="https://images.unsplash.com/... (Photo of repaired pothole / restored light)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-300 outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-600">Sample Proof:</span>
                    <button
                      type="button"
                      onClick={() => setResolutionProof('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80')}
                      className="text-emerald-700 underline font-bold"
                    >
                      Use Demo Work Photo
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedGrievance(null)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md transition"
                >
                  {isUpdating ? 'Saving Update...' : 'Commit Status Change'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

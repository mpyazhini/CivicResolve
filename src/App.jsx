import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './config/firebase';
import { subscribeToComplaints, upvoteComplaint } from './services/complaintService';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingHero from './components/LandingHero';
import CitizenSubmit from './components/CitizenSubmit';
import PublicFeed from './components/PublicFeed';
import TrackComplaint from './components/TrackComplaint';
import AdminDashboard from './components/AdminDashboard';
import AnalyticsView from './components/AnalyticsView';
import AIEngineView from './components/AIEngineView';
import AboutView from './components/AboutView';
import ComplaintDetailsModal from './components/ComplaintDetailsModal';
import AdminLoginModal from './components/AdminLoginModal';
import AISettingsModal from './components/AISettingsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [complaints, setComplaints] = useState([]);
  const [adminUser, setAdminUser] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAISettingsModalOpen, setIsAISettingsModalOpen] = useState(false);
  const [trackInitialCode, setTrackInitialCode] = useState('');
  const [userApiKey, setUserApiKey] = useState(() => {
    return sessionStorage.getItem('civicresolve_user_gemini_key') || '';
  });

  // Handle URL deep links (e.g. ?track=CIVIC-2026-8941 or ?tab=analytics)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trackParam = params.get('track');
    const tabParam = params.get('tab');

    if (trackParam) {
      setTrackInitialCode(trackParam);
      setActiveTab('track');
    } else if (tabParam) {
      setActiveTab(tabParam);
    }
  }, []);

  // Listen to Firebase Authentication state
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdminUser(user);
      } else {
        const storedDemo = sessionStorage.getItem('civicresolve_demo_admin');
        if (storedDemo) {
          try {
            setAdminUser(JSON.parse(storedDemo));
          } catch (e) {
            setAdminUser(null);
          }
        } else {
          setAdminUser(null);
        }
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Subscribe to Complaints (real-time Firestore with cache fallback)
  useEffect(() => {
    const unsubscribeSnapshot = subscribeToComplaints(
      (updatedList) => {
        setComplaints(updatedList);
      },
      (err) => {
        console.warn("Complaint subscription note:", err);
      }
    );

    return () => {
      if (typeof unsubscribeSnapshot === 'function') {
        unsubscribeSnapshot();
      }
    };
  }, []);

  // Upvote complaint handler
  const handleUpvote = async (complaintId) => {
    const voterId = 'web-voter-' + Math.floor(Math.random() * 1000);
    const result = await upvoteComplaint(complaintId, voterId);
    return result;
  };

  // Admin Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // Ignore
    }
    sessionStorage.removeItem('civicresolve_demo_admin');
    setAdminUser(null);
  };

  // Admin Login success callback
  const handleLoginSuccess = (user) => {
    setAdminUser(user);
    if (user?.isDemo) {
      sessionStorage.setItem('civicresolve_demo_admin', JSON.stringify(user));
    }
    setActiveTab('admin');
  };

  // Save custom Gemini API key
  const handleSaveApiKey = (key) => {
    setUserApiKey(key);
    if (key) {
      sessionStorage.setItem('civicresolve_user_gemini_key', key);
    } else {
      sessionStorage.removeItem('civicresolve_user_gemini_key');
    }
  };

  // Navigate to track with specific ID
  const handleNavigateToTrack = (trackingId) => {
    setTrackInitialCode(trackingId);
    setActiveTab('track');
  };

  // Navigate tab smoothly
  const handleNavigateTab = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans lg:pl-72">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        adminUser={adminUser}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        onOpenAISettings={() => setIsAISettingsModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {/* PAGE 1: Landing Experience */}
        {activeTab === 'home' && (
          <LandingHero
            complaints={complaints}
            onNavigateTab={handleNavigateTab}
            onSelectComplaint={(c) => setSelectedComplaint(c)}
          />
        )}

        {/* PAGE 2: Report Grievance */}
        {activeTab === 'submit' && (
          <CitizenSubmit
            complaints={complaints}
            onGrievanceSubmitted={(rec) => {
              setComplaints(prev => [rec, ...prev.filter(p => p.id !== rec.id)]);
            }}
            onNavigateToTrack={handleNavigateToTrack}
            userApiKey={userApiKey}
          />
        )}

        {/* PAGE 3: Public Grievance Feed */}
        {activeTab === 'feed' && (
          <PublicFeed
            complaints={complaints}
            onSelectComplaint={(c) => setSelectedComplaint(c)}
            onUpvote={handleUpvote}
            onNavigateToSubmit={() => handleNavigateTab('submit')}
          />
        )}

        {/* PAGE 4: Track Resolution */}
        {activeTab === 'track' && (
          <TrackComplaint
            initialTrackingId={trackInitialCode}
            complaints={complaints}
            onSelectComplaint={(c) => setSelectedComplaint(c)}
          />
        )}

        {/* PAGE 5: Civic Analytics and SLA */}
        {activeTab === 'analytics' && (
          <AnalyticsView complaints={complaints} />
        )}

        {/* PAGE 6: Municipal Admin Command Center */}
        {activeTab === 'admin' && (
          <AdminDashboard
            complaints={complaints}
            adminUser={adminUser}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
            onRefresh={() => {
              setComplaints([...complaints]);
            }}
            onSelectComplaint={(c) => setSelectedComplaint(c)}
          />
        )}

        {/* PAGE 7: Gemini AI Engine Architecture */}
        {activeTab === 'ai-engine' && (
          <AIEngineView userApiKey={userApiKey} />
        )}

        {/* PAGE 8: About CivicResolve & Hackathon Information */}
        {activeTab === 'about' && (
          <AboutView onNavigateTab={handleNavigateTab} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigateTab={handleNavigateTab} />

      {/* Complaint Deep-Dive Modal */}
      {selectedComplaint && (
        <ComplaintDetailsModal
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          adminUser={adminUser}
          onOpenAdminManage={(c) => {
            handleNavigateTab('admin');
          }}
        />
      )}

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* AI Settings Diagnostics Modal */}
      <AISettingsModal
        isOpen={isAISettingsModalOpen}
        onClose={() => setIsAISettingsModalOpen(false)}
        userApiKey={userApiKey}
        onSaveApiKey={handleSaveApiKey}
      />
    </div>
  );
}

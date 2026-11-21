import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COMPLAINTS_COLLECTION = 'complaints';
const LOCAL_STORAGE_KEY = 'civicresolve_complaints_cache_v1';

// Initial realistic sample data (Coimbatore / PSG iTech region)
export const SAMPLE_COMPLAINTS = [
  {
    id: 'demo-1',
    trackingId: 'CIVIC-2026-8941',
    title: 'Severe crater pothole on Avinashi Road near PSG iTech campus gate',
    description: 'A 2-foot wide and 8-inch deep pothole has formed in the middle lane of Avinashi Road right opposite the PSG iTech main entrance. Two motorcyclists skidded yesterday in the rain. Heavy lorry traffic is worsening the road degradation rapidly.',
    category: 'Potholes & Broken Roads',
    location: 'Avinashi Road, Opposite PSG iTech Gate 2, Neelambur, Coimbatore',
    locationCoordinates: { lat: 11.0772, lng: 77.0858 },
    urgency: 'CRITICAL',
    urgencyReason: 'Imminent life safety hazard on a 6-lane national highway corridor. High-speed two-wheeler skidding risk directly outside an educational institution with dense student pedestrian crossing.',
    recommendedDepartment: 'Public Works & Road Infrastructure',
    departmentId: 'roads',
    estimatedSlaHours: 8,
    safetyRiskScore: 38,
    publicExposureScore: 29,
    cascadingRiskScore: 28,
    publicImpactScore: 95,
    status: 'In Progress',
    reporterName: 'Karthik Subramanian',
    reporterContact: 'karthik.s@gmail.com',
    isAnonymous: false,
    upvotes: 24,
    upvoterFingerprints: ['user-1', 'user-2'],
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    suggestedActions: [
      'Deploy cold-mix asphalt patch truck immediately',
      'Place high-visibility reflective warning barrels',
      'Mill and relay 50m bituminous layer during off-peak hours'
    ],
    keyConcerns: ['Two-Wheeler Skid Risk', 'Student Pedestrian Danger', 'Highway Traffic Jam'],
    timeline: [
      {
        status: 'Reported',
        note: 'Grievance submitted by citizen; Gemini AI classified as CRITICAL urgency (Impact: 95/100).',
        timestamp: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
        actor: 'Citizen / AI Engine'
      },
      {
        status: 'Acknowledged',
        note: 'Grievance routed to Coimbatore PWD Highways Division. Field engineer assigned.',
        timestamp: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
        actor: 'Municipal Dispatcher'
      },
      {
        status: 'In Progress',
        note: 'Emergency barricades placed. Road repair team dispatched with 2 metric tons of asphalt mix.',
        timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
        actor: 'Er. R. Ramesh (PWD AE)'
      }
    ],
    officialRemarks: 'Field crew is on-site setting up lane diversion. Cold-mix patch work commenced at 08:30 AM.',
    isDemo: true,
    createdAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString()
  },
  {
    id: 'demo-2',
    trackingId: 'CIVIC-2026-6420',
    title: 'Major water pipeline burst flooding Peelamedu Main Road',
    description: 'Main 600mm drinking water feeder line has ruptured near Fun Republic Mall junction. Thousands of gallons of potable water are gushing onto the road, creating 1-foot waterlogging and low water pressure in 300+ residential households.',
    category: 'Water Pipeline Burst & Contamination',
    location: 'Peelamedu Main Road, Near Fun Mall, Coimbatore',
    locationCoordinates: { lat: 11.0287, lng: 77.0016 },
    urgency: 'HIGH',
    urgencyReason: 'Massive clean drinking water wastage combined with major arterial road flooding. Potential for subsurface soil washout and widespread residential water supply shutdown.',
    recommendedDepartment: 'Municipal Water Supply & Sewage Board',
    departmentId: 'water',
    estimatedSlaHours: 12,
    safetyRiskScore: 28,
    publicExposureScore: 28,
    cascadingRiskScore: 27,
    publicImpactScore: 83,
    status: 'In Progress',
    reporterName: 'Lakshmi Narayanan',
    reporterContact: 'lakshmi.n@outlook.com',
    isAnonymous: false,
    upvotes: 38,
    upvoterFingerprints: ['user-3', 'user-4'],
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80',
    suggestedActions: [
      'Isolate sectional sluice valve #4B to stop water surge',
      'Deploy heavy de-watering pumps to clear the carriageway',
      'Excavate burst collar and install ductile iron repair clamp'
    ],
    keyConcerns: ['Drinking Water Loss', 'Road Carriageway Inundation', 'Pressure Loss in Wards 32-35'],
    timeline: [
      {
        status: 'Reported',
        note: 'Reported by local shop owner. Gemini AI classified as HIGH urgency.',
        timestamp: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
        actor: 'Citizen / AI Engine'
      },
      {
        status: 'In Progress',
        note: 'Valve isolated by MWSSB valve-man. Hydro-excavator reached location.',
        timestamp: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
        actor: 'TWAD / Corporation Water Works'
      }
    ],
    officialRemarks: 'Isolation valve closed. Repair sleeve being fitted; full water supply expected to resume by evening.',
    isDemo: true,
    createdAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString()
  },
  {
    id: 'demo-3',
    trackingId: 'CIVIC-2026-3195',
    title: 'Exposed live cable dangling from damaged electric pole in Gandhipuram',
    description: 'During yesterday evening storm, a heavy tree branch hit the LT electrical pole near Cross Cut Road junction. An insulated wire was snapped and is now hanging just 4 feet above the pedestrian walkway, sparking intermittently.',
    category: 'Streetlights & Electrical Hazards',
    location: '7th Cross, Cross Cut Road, Gandhipuram, Coimbatore',
    locationCoordinates: { lat: 11.0183, lng: 76.9644 },
    urgency: 'CRITICAL',
    urgencyReason: 'Active electrocution hazard in a heavily crowded commercial shopping district with thousands of daily pedestrians. Immediate life safety danger requiring instant grid de-energization.',
    recommendedDepartment: 'Electricity Distribution & Street Lighting (TANGEDCO)',
    departmentId: 'electricity',
    estimatedSlaHours: 4,
    safetyRiskScore: 40,
    publicExposureScore: 30,
    cascadingRiskScore: 28,
    publicImpactScore: 98,
    status: 'Reported',
    reporterName: 'Senthil Kumar',
    reporterContact: 'senthil.cloths@gmail.com',
    isAnonymous: false,
    upvotes: 52,
    upvoterFingerprints: [],
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    suggestedActions: [
      'Trip the local distribution feeder line via Gandhipuram substation',
      'Deploy line inspector emergency crew with cherry-picker truck',
      'Replace damaged conductor and tighten cross-arm insulators'
    ],
    keyConcerns: ['IMMINENT ELECTROCUTION RISK', 'Commercial Crowd Footfall', 'Fire Spark Hazard'],
    timeline: [
      {
        status: 'Reported',
        note: 'Emergency grievance logged. Priority flagged to TANGEDCO 24/7 control room.',
        timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        actor: 'Citizen / AI Engine'
      }
    ],
    officialRemarks: 'TANGEDCO fuse-call center alerted. Lineman crew en route.',
    isDemo: true,
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
  },
  {
    id: 'demo-4',
    trackingId: 'CIVIC-2026-5120',
    title: 'Overflowing community garbage dumpster near RS Puram primary school',
    description: 'The green municipal waste compactor bin near Corporation Primary School on DB Road has not been cleared for 4 days. Waste is spilling onto the pavement, creating a foul stench and attracting stray cattle and dogs.',
    category: 'Garbage Dumps & Waste Collection',
    location: 'DB Road, Next to Corporation Primary School, RS Puram, Coimbatore',
    locationCoordinates: { lat: 11.0064, lng: 76.9507 },
    urgency: 'HIGH',
    urgencyReason: 'Severe public health and sanitation hazard in close proximity to young schoolchildren. Potential vector breeding zone and stray dog conflict.',
    recommendedDepartment: 'City Sanitation & Solid Waste Management',
    departmentId: 'sanitation',
    estimatedSlaHours: 12,
    safetyRiskScore: 25,
    publicExposureScore: 28,
    cascadingRiskScore: 26,
    publicImpactScore: 79,
    status: 'Resolved',
    reporterName: 'Ananya V.',
    reporterContact: 'ananya.parent@gmail.com',
    isAnonymous: false,
    upvotes: 19,
    upvoterFingerprints: ['user-5'],
    imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80',
    resolutionProofImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    suggestedActions: [
      'Deploy 10-cubic-meter hydraulic compactor truck',
      'Disinfect entire perimeter with sodium hypochlorite spray',
      'Reposition bin and increase collection frequency to daily'
    ],
    keyConcerns: ['Child Health Risk', 'Foul Stench in School Hours', 'Stray Animal Gathering'],
    timeline: [
      {
        status: 'Reported',
        note: 'Reported by concerned parent.',
        timestamp: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
        actor: 'Citizen / AI Engine'
      },
      {
        status: 'Acknowledged',
        note: 'Sanitary Inspector Ward 41 assigned ticket.',
        timestamp: new Date(Date.now() - 30 * 3600 * 1000).toISOString(),
        actor: 'Health Officer'
      },
      {
        status: 'In Progress',
        note: 'Sanitation truck #TN38-G-1422 cleared 1.8 tons of mixed solid waste.',
        timestamp: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
        actor: 'Sanitary Squad'
      },
      {
        status: 'Resolved',
        note: 'Site fully cleared, washed, and sprayed with lime disinfectant. School headmaster confirmed resolution.',
        timestamp: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
        actor: 'Sanitary Inspector Ward 41'
      }
    ],
    officialRemarks: 'Dumpster cleared, area disinfected with bleaching powder. Daily morning collection schedule enforced.',
    citizenFeedback: {
      rating: 5,
      comment: 'Very fast action! School surroundings are clean now. Thank you CivicResolve and Coimbatore Corporation!',
      submittedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
    },
    isDemo: true,
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
  },
  {
    id: 'demo-5',
    trackingId: 'CIVIC-2026-1873',
    title: 'Faulty LED streetlights on Saravanampatti IT corridor',
    description: 'A stretch of 6 consecutive LED streetlights is dark between KGISL campus and CHIL SEZ on Keeranatham road. The unlit 400m stretch makes night walking unsafe for IT employees returning from night shifts.',
    category: 'Streetlights & Electrical Hazards',
    location: 'Keeranatham Road, Near KGISL Campus, Saravanampatti, Coimbatore',
    locationCoordinates: { lat: 11.0827, lng: 76.9942 },
    urgency: 'MEDIUM',
    urgencyReason: 'Public safety and visibility concern along a bustling IT corridor with shift workers. Lack of lighting elevates theft risk and nighttime vehicle collisions.',
    recommendedDepartment: 'Electricity Distribution & Street Lighting (TANGEDCO)',
    departmentId: 'electricity',
    estimatedSlaHours: 36,
    safetyRiskScore: 18,
    publicExposureScore: 24,
    cascadingRiskScore: 16,
    publicImpactScore: 58,
    status: 'Reported',
    reporterName: 'Manojkumar D.',
    reporterContact: '',
    isAnonymous: true,
    upvotes: 14,
    upvoterFingerprints: [],
    imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
    suggestedActions: [
      'Inspect phase timer controller at Keeranatham feeder pillar',
      'Replace failed 90W LED driver modules on poles #12 to #17'
    ],
    keyConcerns: ['Night Pedestrian Safety', 'IT Commuter Security'],
    timeline: [
      {
        status: 'Reported',
        note: 'Logged anonymously by commuter.',
        timestamp: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
        actor: 'Citizen / AI Engine'
      }
    ],
    officialRemarks: 'Scheduled for electrical technician inspection tonight at 7:00 PM.',
    isDemo: true,
    createdAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString()
  }
];

// Helper to get cached complaints
function getLocalCache() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Local storage cache read error", e);
  }
  return SAMPLE_COMPLAINTS;
}

// Helper to set cached complaints
function setLocalCache(items) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn("Local storage cache write error", e);
  }
}

/**
 * Generate official tracking ID
 */
export function generateTrackingId() {
  const year = new Date().getFullYear();
  const timePart = Date.now().toString(36).toUpperCase().slice(-5);
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `CIVIC-${year}-${timePart}${randomNum}`;
}

/**
 * Create a new Citizen Complaint in Firestore
 */
export async function createComplaint(complaintData) {
  const trackingId = complaintData.trackingId || generateTrackingId();
  const createdAt = new Date().toISOString();

  const record = {
    ...complaintData,
    trackingId,
    status: 'Reported',
    upvotes: complaintData.upvotes || 0,
    upvoterFingerprints: [],
    createdAt,
    updatedAt: createdAt,
    timeline: [
      {
        status: 'Reported',
        note: `Grievance submitted by citizen. AI auto-assigned urgency: ${complaintData.urgency || 'MEDIUM'} (Impact Score: ${complaintData.publicImpactScore || 50}/100).`,
        timestamp: createdAt,
        actor: complaintData.reporterName ? `${complaintData.reporterName} (Citizen)` : 'Citizen (Anonymous)'
      }
    ]
  };

  // Photos are optional. Keep the Firestore document under the 1 MiB limit.
  if (typeof record.imageUrl === 'string' && record.imageUrl.length > 700000) {
    record.imageUrl = null;
    record.imageOmitted = true;
  }

  // Save to Firestore
  try {
    const docRef = await addDoc(collection(db, COMPLAINTS_COLLECTION), {
      ...record,
      firestoreTimestamp: serverTimestamp()
    });
    record.id = docRef.id;
    record.persistedToFirestore = true;
  } catch (err) {
    console.warn("Firestore write fallback to local cache:", err?.message || err);
    record.id = 'local-' + Date.now();
    record.persistedToFirestore = false;
    record.firestoreError = err?.message || 'Could not reach Firestore';
  }

  // Update local cache
  const cached = getLocalCache();
  setLocalCache([record, ...cached.filter(c => c.id !== record.id)]);

  return record;
}

/**
 * Subscribe to complaints with real-time updates from Firestore
 */
export function subscribeToComplaints(onUpdate, onError) {
  // First notify immediately with cached data for instant responsiveness
  const cached = getLocalCache();
  onUpdate(cached);

  try {
    const q = query(collection(db, COMPLAINTS_COLLECTION), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveComplaints = [];
      snapshot.forEach(docSnap => {
        liveComplaints.push({
          id: docSnap.id,
          ...docSnap.data()
        });
      });

      // Merge with demo complaints if not already present
      const demoComplaints = cached.filter(c => c.isDemo && !liveComplaints.some(l => l.trackingId === c.trackingId));
      const combined = [...liveComplaints, ...demoComplaints];

      // Sort by public impact score descending, then date
      combined.sort((a, b) => (b.publicImpactScore || 0) - (a.publicImpactScore || 0));

      setLocalCache(combined);
      onUpdate(combined);
    }, (err) => {
      console.warn("Firestore snapshot listener note (using offline/cached state):", err?.message || err);
      if (onError) onError(err);
      onUpdate(getLocalCache());
    });

    return unsubscribe;
  } catch (err) {
    console.warn("Failed to subscribe to Firestore:", err?.message || err);
    onUpdate(getLocalCache());
    return () => {};
  }
}

/**
 * Fetch a single complaint by tracking ID
 */
export async function getComplaintByTrackingId(trackingId) {
  const cached = getLocalCache();
  const found = cached.find(c => c.trackingId?.toUpperCase() === trackingId?.trim()?.toUpperCase());
  if (found) return found;

  try {
    const querySnapshot = await getDocs(collection(db, COMPLAINTS_COLLECTION));
    let match = null;
    querySnapshot.forEach(docSnap => {
      const data = docSnap.data();
      if (data.trackingId?.toUpperCase() === trackingId?.trim()?.toUpperCase()) {
        match = { id: docSnap.id, ...data };
      }
    });
    return match;
  } catch (err) {
    console.warn("Firestore query error:", err?.message || err);
    return null;
  }
}

/**
 * Update complaint status by administrator
 */
export async function updateComplaintStatus({
  complaintId,
  status,
  officialRemarks = '',
  resolutionProofImage = null,
  assignedOfficer = '',
  actorName = 'City Municipal Officer'
}) {
  const timestamp = new Date().toISOString();
  const cached = getLocalCache();
  const target = cached.find(c => c.id === complaintId);

  const newTimelineItem = {
    status,
    note: officialRemarks || `Status updated to ${status} by ${actorName}`,
    timestamp,
    actor: actorName,
    proofImage: resolutionProofImage || undefined
  };

  const updatedTimeline = target ? [...(target.timeline || []), newTimelineItem] : [newTimelineItem];

  const updatePayload = {
    status,
    officialRemarks,
    updatedAt: timestamp,
    timeline: updatedTimeline,
    ...(assignedOfficer ? { assignedOfficer } : {}),
    ...(resolutionProofImage ? { resolutionProofImage } : {})
  };

  // Update in Firestore
  if (!complaintId.startsWith('demo-') && !complaintId.startsWith('local-')) {
    try {
      const docRef = doc(db, COMPLAINTS_COLLECTION, complaintId);
      await updateDoc(docRef, updatePayload);
    } catch (err) {
      console.warn("Firestore update error:", err?.message || err);
    }
  }

  // Update in cache
  const updatedList = cached.map(c => {
    if (c.id === complaintId) {
      return { ...c, ...updatePayload };
    }
    return c;
  });
  setLocalCache(updatedList);

  return { success: true, updated: updatePayload };
}

/**
 * Upvote a complaint (citizen endorsement increases public impact score)
 */
export async function upvoteComplaint(complaintId, voterId = 'anon') {
  const cached = getLocalCache();
  const target = cached.find(c => c.id === complaintId);
  if (!target) return { success: false };

  const upvoterFingerprints = target.upvoterFingerprints || [];
  if (upvoterFingerprints.includes(voterId)) {
    return { success: false, alreadyUpvoted: true };
  }

  const newUpvotes = (target.upvotes || 0) + 1;
  const newFingerprints = [...upvoterFingerprints, voterId];
  // Each community upvote adds to public impact (capped at 100)
  const newImpactScore = Math.min(100, (target.publicImpactScore || 50) + 2);

  const payload = {
    upvotes: newUpvotes,
    upvoterFingerprints: newFingerprints,
    publicImpactScore: newImpactScore
  };

  if (!complaintId.startsWith('demo-') && !complaintId.startsWith('local-')) {
    try {
      const docRef = doc(db, COMPLAINTS_COLLECTION, complaintId);
      await updateDoc(docRef, payload);
    } catch (err) {
      console.warn("Firestore upvote error:", err?.message || err);
    }
  }

  const updatedList = cached.map(c => c.id === complaintId ? { ...c, ...payload } : c);
  setLocalCache(updatedList);

  return { success: true, newUpvotes, newImpactScore };
}

/**
 * Add citizen feedback after resolution
 */
export async function submitCitizenFeedback(complaintId, rating, comment) {
  const feedback = {
    rating,
    comment,
    submittedAt: new Date().toISOString()
  };

  const cached = getLocalCache();
  if (!complaintId.startsWith('demo-') && !complaintId.startsWith('local-')) {
    try {
      const docRef = doc(db, COMPLAINTS_COLLECTION, complaintId);
      await updateDoc(docRef, { citizenFeedback: feedback });
    } catch (err) {
      console.warn("Firestore feedback error:", err?.message || err);
    }
  }

  const updatedList = cached.map(c => c.id === complaintId ? { ...c, citizenFeedback: feedback } : c);
  setLocalCache(updatedList);
  return { success: true };
}

/**
 * Duplicate Complaint Detection Engine
 * Compares title, description, category, and location with existing active complaints.
 */
export function checkDuplicateComplaints(title, description, category, location, existingComplaints = []) {
  if (!title || title.length < 5) return [];

  const cleanWords = (str = '') => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 3 && !['this', 'there', 'please', 'road', 'street', 'area', 'near'].includes(w));
  };

  const queryTokens = new Set([...cleanWords(title), ...cleanWords(description), ...cleanWords(location)]);
  if (queryTokens.size === 0) return [];

  const candidates = (existingComplaints.length ? existingComplaints : getLocalCache())
    .filter(c => c.status !== 'Resolved');

  const matches = [];

  candidates.forEach(comp => {
    const compTokens = new Set([
      ...cleanWords(comp.title),
      ...cleanWords(comp.description),
      ...cleanWords(comp.location)
    ]);

    // Token intersection
    let sharedTokensCount = 0;
    queryTokens.forEach(token => {
      if (compTokens.has(token)) sharedTokensCount++;
    });

    const unionCount = new Set([...queryTokens, ...compTokens]).size;
    const jaccardScore = unionCount > 0 ? sharedTokensCount / unionCount : 0;

    // Category bonus
    const categoryBonus = comp.category === category ? 0.25 : 0;
    const similarity = Math.min(1, jaccardScore * 1.5 + categoryBonus);

    if (similarity >= 0.35 || sharedTokensCount >= 3) {
      matches.push({
        complaint: comp,
        similarityScore: Math.round(similarity * 100),
        sharedKeywords: [...queryTokens].filter(t => compTokens.has(t))
      });
    }
  });

  return matches.sort((a, b) => b.similarityScore - a.similarityScore).slice(0, 3);
}

/**
 * Seed realistic Hackathon demo dataset
 */
export async function seedDemoComplaints() {
  setLocalCache(SAMPLE_COMPLAINTS);
  // Also push to Firestore if connected
  for (const item of SAMPLE_COMPLAINTS) {
    try {
      await addDoc(collection(db, COMPLAINTS_COLLECTION), {
        ...item,
        firestoreTimestamp: serverTimestamp()
      });
    } catch (e) {
      // Ignore if offline
    }
  }
  return SAMPLE_COMPLAINTS;
}

/**
 * Clear demo complaints
 */
export function clearDemoComplaints() {
  const cached = getLocalCache();
  const nonDemo = cached.filter(c => !c.isDemo);
  setLocalCache(nonDemo);
  return nonDemo;
}

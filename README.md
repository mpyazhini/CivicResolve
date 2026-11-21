# CivicResolve 🏛️✨
### AI-Powered Citizen Grievance Management and Resolution Platform

**Built for PromptWars × GDGoC PSG iTech 2026 Hackathon**

🌐 **Live Demo:** https://civicresolve-2026.web.app  
💻 **GitHub Repository:** https://github.com/mpyazhini/CivicResolve

---

## 📌 Problem Statement

**AI-Powered Citizen Grievance Management and Resolution**

Traditional civic grievance systems often face challenges such as unstructured citizen reports, delayed manual verification, incorrect departmental routing, difficulty identifying urgent public-safety issues, and limited transparency during complaint resolution.

**CivicResolve** aims to improve this process through an intelligent civic grievance management platform that combines AI-assisted complaint analysis, public participation, priority assessment, and transparent resolution tracking.

---

## 🚀 Key Features

### 1. Intelligent Citizen Grievance Submission
- Submit civic complaints using natural-language descriptions.
- Provide issue categories, locations, landmarks, and supporting information.
- Upload visual evidence to help communicate the reported problem.
- Use convenient demo location presets for Coimbatore.

### 2. AI-Assisted Classification and Department Routing
CivicResolve is designed to classify complaints into seven municipal categories and recommend the relevant department:

| Category | Department |
|---|---|
| Roads and Infrastructure | PWD-ROADS |
| Water Supply and Sewage | MWSSB-WATER |
| Electricity and Street Lighting | TANGEDCO |
| Sanitation and Waste Management | SWM-CLEAN |
| Public Health and Safety | PHD-SAFETY |
| Traffic and Transportation | TED-TRANSIT |
| General Civic Administration | MGA-CIVIC |

Gemini AI integration supports intelligent complaint analysis. A heuristic-based fallback can also assist with classification and prioritisation when AI services are unavailable or not configured.

### 3. Multi-Factor Urgency and Public Impact Scoring

A risk-scoring approach evaluates reported issues using three major factors, contributing to a score from 0 to 100:

- **Safety Danger (0–40):** Considers immediate risks to people, such as exposed electrical wires and open manholes.
- **Footfall and Community Exposure (0–30):** Considers how many people may be affected, including pedestrians and people near schools, hospitals, and busy roads.
- **Escalation and Cascading Risk (0–30):** Considers whether an issue could become more serious, such as structural damage, water loss, or disease outbreaks.

The resulting priority levels are associated with proposed response targets:

| Priority | Target Response Window |
|---|---|
| CRITICAL | 6–12 hours |
| HIGH | 12–24 hours |
| MEDIUM | 24–48 hours |
| LOW | 48–120 hours |

These are proposed operational targets, not guaranteed real-world municipal response times.

### 4. Smart Duplicate Grievance Detection
- Compares complaint keywords, categories, and locations.
- Identifies potentially similar unresolved complaints.
- Alerts citizens when a similar issue may already exist.
- Encourages citizens to support an existing complaint rather than repeatedly submitting the same issue.

### 5. Community Endorsement
- Citizens can endorse existing complaints through upvotes.
- Community endorsements contribute to the public impact score.
- Each upvote contributes 2 impact points, according to the scoring approach.

### 6. Complaint Tracking and Resolution Workflow
- Generates a unique tracking number for submitted complaints.
- Provides a four-stage complaint lifecycle:

  `Reported → Acknowledged → In Progress → Resolved`

- Supports complaint status updates and resolution information.
- Provides a structured way to follow the progress of reported issues.

### 7. Municipal Admin Command Center
- Provides an administrator interface for managing grievances.
- Supports complaint review and status management.
- Includes options for recording assignment information and field remarks.
- Provides demo-data functionality for hackathon evaluation.

### 8. Analytics and SLA Monitoring
- Presents complaint statistics and priority distribution.
- Helps understand departmental workload.
- Supports monitoring of complaint progress and response targets.
- Provides an overview of reported civic issues.

### 9. Accessibility and User Experience
- Responsive interface for different screen sizes.
- Clear visual priority indicators.
- Text-to-speech support for relevant information.
- User-friendly navigation and complaint tracking.

---

## 📸 Application Screenshots

### Homepage

![CivicResolve Homepage](screenshots/homepage.png)

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React 18 | Frontend application |
| Vite | Development server and production build |
| Tailwind CSS | Responsive styling |
| Lucide React | Interface icons |
| Firebase Firestore | Complaint data storage and synchronization |
| Firebase Authentication | Administrator authentication |
| Firebase AI Logic | Integration with generative AI services |
| Gemini AI
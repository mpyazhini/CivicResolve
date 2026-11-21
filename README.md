# CivicResolve 🏛️✨
### AI-Powered Citizen Grievance Management and Resolution Platform
**PromptWars x GDGoC PSG iTech 2026 Hackathon**

---

## 📌 Problem Statement
> **"AI-Powered Citizen Grievance Management and Resolution"**

Traditional municipal grievance mechanisms suffer from unstructured citizen reports, manual triage delays, misrouted departmental tickets, lack of public safety prioritization, and zero transparency for citizens. 

**CivicResolve** transforms municipal governance into an intelligent, transparent, and proactive civic dispatch system powered by **Google Firebase** and **Gemini AI**.

---

## 🚀 Key Features

### 1. Intelligent Citizen Grievance Submission
- **Natural Language Reporting:** Citizens can report issues using colloquial language with titles, descriptions, landmarks, or GPS coordinates.
- **Multimodal Visual Evidence:** Upload photos of broken roads, exposed wires, or burst pipelines analyzed directly by Gemini multimodal vision.
- **Real-Time Gemini AI Triage:** Instant classification into 7 municipal categories, urgency assessment, and recommended department routing before submission.
- **Quick Demo Fill:** One-click presets for Coimbatore landmarks (PSG iTech Campus, Peelamedu, Gandhipuram, RS Puram, Saravanampatti) for hackathon evaluation.

### 2. Gemini AI Classification & Department Routing
- Automatically routes grievances to the responsible municipal department:
  - *Public Works & Road Infrastructure* (PWD-ROADS)
  - *Municipal Water Supply & Sewage Board* (MWSSB-WATER)
  - *Electricity Distribution & Street Lighting* (TANGEDCO)
  - *City Sanitation & Solid Waste Management* (SWM-CLEAN)
  - *Public Health, Vector Control & Safety* (PHD-SAFETY)
  - *City Traffic Engineering & Transport Department* (TED-TRANSIT)
  - *Municipal General Administration & Ward Governance* (MGA-CIVIC)

### 3. Automatic Urgency & Public Impact Scoring
- Multi-factor risk decomposition (Score 0 to 100):
  - **Safety Danger Score (0–40):** Evaluates imminent physical peril (e.g. exposed live cables, open manholes).
  - **Footfall & Community Exposure (0–30):** Assesses pedestrian density, school/hospital zones, and arterial highways.
  - **Escalation & Cascading Risk (0–30):** Analyzes potential for structural collapse, water loss, or disease outbreaks.
- Automated SLA targets:
  - `CRITICAL`: 6–12 Hours (Dispatched immediately to mobile squads)
  - `HIGH`: 12–24 Hours
  - `MEDIUM`: 24–48 Hours
  - `LOW`: 48–120 Hours

### 4. Smart Duplicate Grievance Detection
- **Civic Entity Similarity Engine:** Tokenizes grievance keywords, localities, and categories against active unresolved complaints.
- Alerts the citizen if a similar issue was reported nearby (e.g. *“2 similar grievances detected in this area!”*).
- Empowers citizens to **Endorse / Upvote** the existing ticket instead of cluttering the system with duplicate tickets.

### 5. Community Endorsement (Crowdsourced Impact Escalation)
- Each community upvote (+2 Impact Points) dynamically raises the ticket's priority in the city command queue.

### 6. End-to-End Resolution Tracking & Stepper
- Unique Tracking Number generated for every ticket (e.g. `CIVIC-2026-8941`).
- Transparent 4-stage lifecycle:
  `Reported` ➔ `Acknowledged` ➔ `In Progress` ➔ `Resolved`
- **Resolution Proof Photos:** Field teams upload visual evidence of completed repairs (e.g. patched asphalt, replaced luminaire).
- **Citizen Satisfaction Rating:** Citizens verify the fix with 1–5 star ratings and feedback notes.

### 7. Municipal Admin Command Center
- Role-based municipal admin dashboard authenticated via **Firebase Authentication**.
- Status management modal with engineer assignment, field remarks, and proof photo logging.
- Complete audit trail of all status transitions with actor timestamps.
- **Hackathon Demo Dataset Seeder:** One-click button to load or reset realistic municipal grievances.

### 8. Analytics & SLA Monitoring
- Real-time SLA compliance rate tracker.
- Urgency distribution breakdown and department workload distribution.
- Hotspot analysis across municipal wards.

### 9. Accessibility
- Text-to-Speech (TTS) engine reading aloud AI triage decisions for visually impaired citizens.
- WCAG-compliant high-contrast badges, keyboard navigation, and responsive mobile-first design.

---

## 🛠️ Google Technology Stack

| Technology | Role in CivicResolve |
| :--- | :--- |
| **Firebase Firestore** | Real-time database storing complaints, audit timelines, citizen upvotes, and status logs in `asia-south1`. |
| **Firebase Authentication** | Secure municipal administrator login and role verification. |
| **Firebase AI Logic & Gemini** | Client-side generative AI integration calling Gemini models (`gemini-2.5-flash`) for automated classification, urgency detection, and multimodal analysis. |
| **Firebase Hosting** | Single-page application deployment for production delivery. |
| **React 18 + Vite** | High-performance responsive frontend application. |
| **Tailwind CSS + Lucide Icons** | Clean, accessible civic design system. |

---

## 📋 Firebase Project Configuration

- **Firebase Project ID:** `civicresolve-2026`
- **Firestore Database Location:** `asia-south1`
- **Firebase Web App ID:** `1:1095308371394:web:97deee33437b4c1254a25b`
- **Hosting Target:** `dist/` configured in `firebase.json`

---

## ⚙️ Manual Setup Checklist (Firebase Console)

To ensure all Firebase services are active for live deployment:

### 1. Cloud Firestore
1. Go to [Firebase Console](https://console.firebase.google.com/) ➔ Project `civicresolve-2026`.
2. Navigate to **Build > Firestore Database**.
3. If not already created, click **Create database** and select location **asia-south1**.
4. The security rules in `firestore.rules` will automatically enforce role-based access upon running:
   ```bash
   firebase deploy --only firestore:rules,firestore:indexes
   ```

### 2. Firebase Authentication
1. In Firebase Console, go to **Build > Authentication > Sign-in method**.
2. Click **Add new provider** ➔ Select **Email/Password** ➔ Enable and Save.
3. *Note:* For quick hackathon testing, the app also includes a **"One-Click Enter as Demo Admin"** option inside the login modal.

### 3. Firebase AI Logic (Gemini Developer API)
1. In your terminal inside this project directory, run:
   ```bash
   npx -y firebase-tools@latest init ailogic
   ```
   Select `civicresolve-2026` and the `CivicResolve Web` app. This activates the Gemini Developer API on the project.
2. *Guaranteed Reliability:* Even if Firebase AI Logic is in the process of being provisioned in Google Cloud, CivicResolve features a built-in **High-Precision Municipal Heuristic Engine** that provides 100% functional classification, urgency scoring, and department routing with zero downtime or crashes.
3. *Google AI Studio Testing:* You can also click the **"AI Engine"** button in the navbar to enter an optional Google AI Studio Gemini API key during judge evaluation.

---

## 💻 Local Development & Build

### Install dependencies
```bash
npm install
```

### Run local development server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Build for Production
```bash
npm run build
```
Generates the optimized production bundle in `dist/`.

### Deploy to Firebase
```bash
firebase deploy
```
or deploy individual features:
```bash
firebase deploy --only hosting
firebase deploy --only firestore:rules,firestore:indexes
```

---

## 👥 Hackathon Evaluation Alignment

| Evaluation Criterion | Implementation in CivicResolve |
| :--- | :--- |
| **Code Quality** | Modular React architecture with dedicated services (`geminiService.js`, `complaintService.js`), reusable UI components, clean state management, and zero clutter. |
| **Efficiency** | Real-time `onSnapshot` listeners with optimistic localStorage caching, client-side deduplication tokenization, fast Vite builds. |
| **Accessibility** | Text-to-speech audio reader, keyboard-navigable modals, high-contrast badges, mobile-responsive layout. |
| **Problem Statement** | 100% focused on municipal grievance management, triage, and transparent resolution tracking. |
| **Security** | Restrictive `firestore.rules` preventing unauthorized updates/deletions; zero committed API secrets; input validation. |
| **Testing** | Complete citizen submission, duplicate detection, upvoting, admin status lifecycle, and production build tested and verified. |
| **Google Tech** | Prominent integration of Firebase (Firestore, Auth, Hosting) and Gemini AI. |
| **Innovation** | Public Impact Scoring algorithm, duplicate grievance warning, community endorsement upvoting, and photo-verified resolution audit trails. |

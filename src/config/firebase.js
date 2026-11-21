import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAI, GoogleAIBackend } from 'firebase/ai';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';

// Firebase configuration for CivicResolve 2026
// Uses official project credentials from Firebase CLI
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAH0l9QOEYfuimWfpW-W__lykZ6BhOzKeE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "civicresolve-2026.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "civicresolve-2026",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "civicresolve-2026.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1095308371394",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1095308371394:web:97deee33437b4c1254a25b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-DK40VQ1ZDG"
};

// Initialize or reuse Firebase App instance
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 1. Configure official Firebase App Check Debug Provider for localhost development
// Only enabled in development mode (import.meta.env.DEV) to prevent exposing debug tokens in production
if (typeof self !== 'undefined' && import.meta.env?.DEV) {
  // Use VITE_APPCHECK_DEBUG_TOKEN if provided, otherwise set to true to auto-generate official debug token in console
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.VITE_APPCHECK_DEBUG_TOKEN || true;
}

// 2. Initialize App Check BEFORE any Firebase AI Logic requests
let appCheckInstance = null;
if (typeof window !== 'undefined') {
  try {
    // Official production attestation provider (reCAPTCHA Enterprise)
    // A real Enterprise site key must come from the environment.
    // The public reCAPTCHA test key is not an Enterprise key and makes Gemini return a model/App Check error.
    const recaptchaSiteKey =
      import.meta.env.VITE_RECAPTCHA_ENTERPRISE_KEY ||
      import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
      '';

    if (recaptchaSiteKey || import.meta.env.DEV) {
      appCheckInstance = initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider(recaptchaSiteKey || 'dev-debug-app-check'),
        isTokenAutoRefreshEnabled: true
      });
    }
  } catch (err) {
    console.warn('Firebase App Check initialization note:', err?.message || err);
  }
}

export const appCheck = appCheckInstance;

// Initialize Cloud Firestore with asia-south1 database
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firebase AI Logic (Gemini Developer API backend)
// Pass useLimitedUseAppCheckTokens: true to enable replay protection with fresh App Check tokens
let aiInstance = null;
try {
  aiInstance = getAI(app, {
    backend: new GoogleAIBackend(),
    useLimitedUseAppCheckTokens: Boolean(appCheckInstance)
  });
} catch (err) {
  console.warn("Firebase AI Logic client initialization note:", err?.message || err);
}

export const ai = aiInstance;
export { app };
export default app;

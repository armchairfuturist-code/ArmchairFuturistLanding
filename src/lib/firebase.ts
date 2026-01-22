// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
// Use getApps() to check if Firebase is already initialized to avoid multiple instances
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics and export
// Note: Analytics only works in the browser, not during server-side rendering
let analytics: Analytics | null = null;

// Function to get analytics instance (only in browser)
export const getAnalyticsInstance = () => {
    if (typeof window !== 'undefined' && !analytics) {
        analytics = getAnalytics(app);
    }
    return analytics;
};

export { app };

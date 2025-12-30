// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBug7-9Btt0pQZ7XsJGLe5w3W4jrrQRYuc",
    authDomain: "armchair-futurist.firebaseapp.com",
    projectId: "armchair-futurist",
    storageBucket: "armchair-futurist.firebasestorage.app",
    messagingSenderId: "1083895638095",
    appId: "1:1083895638095:web:e39db31bff1d819c5d623a",
    measurementId: "G-18FCVPH408"
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

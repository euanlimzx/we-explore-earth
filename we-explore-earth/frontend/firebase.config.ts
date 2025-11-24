import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Firebase configuration object from environment variables
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID!,
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
// Note: getReactNativePersistence may not be available in all Firebase versions
// Using getAuth for now - AsyncStorage warning will appear but auth will still work
// TODO: Update to use initializeAuth with persistence once Firebase types are updated
export const auth: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);
export const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();

// Export the app instance if needed
export default app;

// Type definitions for your user schema
export interface UserData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  notificationToken?: string;
  onboardingComplete: boolean;
  isAdmin: boolean;
  createdAt: any; // Firestore Timestamp
}

export interface AuthResult {
  firebaseUser: any; // Firebase User type
  isNewUser: boolean;
  userData?: UserData;
}
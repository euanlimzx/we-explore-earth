import { signInWithPopup, signOut as firebaseSignOut, User } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase.config';

// Sign in with Google - returns Firebase user
export async function signInWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user: User = result.user;
      
      console.log('Firebase User signed in:', {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      });
  
      return user;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  }
  
  // Sign out
  export async function signOutUser(): Promise<void> {
    try {
      await firebaseSignOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }
  
  // Get current user
  export function getCurrentUser(): User | null {
    return auth.currentUser;
  }
  
  // Listen to auth state changes
  export function onAuthStateChanged(callback: (user: User | null) => void) {
    return auth.onAuthStateChanged(callback);
  }
  
  // Get Firebase token (to send to your backend)
  export async function getIdToken(): Promise<string | null> {
    const user = getCurrentUser();
    if (user) {
      return await user.getIdToken();
    }
    return null;
  }
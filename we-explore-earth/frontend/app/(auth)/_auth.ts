import { signInWithCredential, signOut as firebaseSignOut, User, GoogleAuthProvider } from 'firebase/auth';
import * as AuthSession from 'expo-auth-session';
import { auth } from '../../firebase.config';

// Sign in with Google using Expo Auth Session
export async function signInWithGoogle(): Promise<User> {
  try {
    const request = new AuthSession.AuthRequest({
      clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID!,
      scopes: ['openid', 'profile', 'email'],
      redirectUri: AuthSession.makeRedirectUri(),
      responseType: AuthSession.ResponseType.IdToken,
    });

    const result = await request.promptAsync({
      authorizationEndpoint: 'https://accounts.google.com/oauth/v2/auth',
    });

    if (result.type === 'success' && result.params.id_token) {
      const idToken = result.params.id_token;
      
      // Create Firebase credential
      const googleCredential = GoogleAuthProvider.credential(idToken);
      
      // Sign in to Firebase
      const firebaseResult = await signInWithCredential(auth, googleCredential);
      const user: User = firebaseResult.user;
      
      console.log('✅ Firebase User signed in:', {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      });

      return user;
    } else {
      throw new Error('Google sign-in was cancelled or failed');
    }
  } catch (error) {
    console.error('❌ Google sign-in error:', error);
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


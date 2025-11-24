import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { signInWithGoogle } from '../auth';
import { styles } from './styles';

export default function LoginScreen() {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleGoogleSignIn(): Promise<void> {
    setLoading(true);
    try {
      const user = await signInWithGoogle();
      
      console.log('User signed in successfully:', user.uid);
      
      // Navigate to onboarding - relative path since we're in (auth)
      router.push('./onboarding');
      
    } catch (error: any) {
      Alert.alert('Sign In Error', error.message);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to We Explore Earth</Text>
      
      <TouchableOpacity 
        style={styles.googleButton}
        onPress={handleGoogleSignIn}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Continue with Google</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
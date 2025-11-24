import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { getCurrentUser, getIdToken } from '../auth';
import { styles } from './styles';

export default function OnboardingScreen() {
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function handleCompleteOnboarding(): Promise<void> {
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }

    setLoading(true);
    try {
      const user = getCurrentUser();
      const token = await getIdToken();
      
      if (!user || !token) {
        Alert.alert('Error', 'Please sign in again');
        return;
      }

      // TODO: Call your backend API to create user
      console.log('Would call backend with:', {
        firebaseUid: user.uid,
        email: user.email,
        displayName: user.displayName,
        username: username.toLowerCase().trim(),
        token: token
      });

      // For now, just navigate to main app
      Alert.alert('Success', 'Welcome to We Explore Earth!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') }
      ]);
      
    } catch (error: any) {
      Alert.alert('Error', 'Failed to complete onboarding: ' + error.message);
      console.error('Onboarding error:', error);
    } finally {
      setLoading(false);
    }
  }

  const currentUser = getCurrentUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{currentUser?.email}</Text>
        
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{currentUser?.displayName}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Choose a Username:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <TouchableOpacity 
        style={styles.completeButton}
        onPress={handleCompleteOnboarding}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Complete Setup</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
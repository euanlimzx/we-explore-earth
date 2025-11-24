import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Prevents swiping back
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{
          title: 'Sign In'
        }}
      />
      <Stack.Screen 
        name="onboarding" 
        options={{
          title: 'Complete Profile'
        }}
      />
    </Stack>
  );
}
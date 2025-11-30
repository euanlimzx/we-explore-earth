//STANDARD LIBRARY
//THIRD-PARTY LIBRARIES
import { Stack } from 'expo-router';
//LOCAL FILES

export default function AuthLayout() {
  //REACT HOOKS
    
  //STATE VARIABLES
    
  //HANDLERS
    
  //EFFECTS
    
  //RENDER
  return (
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName="launch"
    >
      <Stack.Screen name="launch" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
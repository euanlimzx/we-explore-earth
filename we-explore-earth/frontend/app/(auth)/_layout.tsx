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
      initialRouteName="launch/index"
    >
      <Stack.Screen name="launch/index" />
      <Stack.Screen name="login/index" />
      <Stack.Screen name="signup/index" />
      <Stack.Screen name="reset/index" />
    </Stack>
  );
}
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
    >
      <Stack.Screen name="login" />
    </Stack>
  );
}
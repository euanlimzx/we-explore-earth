//STANDARD LIBRARY
//THIRD-PARTY LIBRARIES
import { Redirect } from 'expo-router';
//LOCAL FILES

export default function Index() {
  // TEMP: Skip auth screen - redirect directly to users home
  return <Redirect href="/(users)/home" />;
  // return <Redirect href="/(auth)/launch" />;
}
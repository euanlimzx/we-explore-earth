import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text } from 'react-native';

export default function CreateEventWrapper() {
  useEffect(() => {
    // Redirect to create event page - use replace to leave tab context
    router.replace('/(admin)/events/new' as any);
  }, []);

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <Text>Redirecting to create event...</Text>
    </View>
  );
}

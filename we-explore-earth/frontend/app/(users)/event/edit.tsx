import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text } from 'react-native';

export default function EditEventWrapper() {
  useEffect(() => {
    // Redirect to edit event page with hardcoded test ID - use replace to leave tab context
    router.replace('/(admin)/events/test123/edit' as any);
  }, []);

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <Text>Redirecting to edit event...</Text>
    </View>
  );
}

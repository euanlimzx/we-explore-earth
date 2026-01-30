import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function EditEventPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <Text>Edit Event</Text>
      <Text style={{ marginTop: 10, color: 'gray' }}>
        Event ID: {id}
      </Text>
      <Text style={{ marginTop: 10, color: 'gray' }}>
        This is a placeholder for editing event {id}
      </Text>
    </View>
  );
}

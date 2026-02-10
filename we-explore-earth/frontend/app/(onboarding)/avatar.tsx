import { View, Text } from 'react-native';
import { router } from 'expo-router';

export default function avatar() {
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <Text>Avatar Page</Text>
      
    </View>
  );
}

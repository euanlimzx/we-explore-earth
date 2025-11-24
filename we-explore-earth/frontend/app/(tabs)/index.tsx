import { View, Text } from 'react-native';
import ExampleComponent from '../../components/ExampleComponent';

export default function HomeScreen() {
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <Text>Home Page</Text>
      <ExampleComponent/>
    </View>
  );
}
import { View, Text } from 'react-native';
import { useAppSelector } from '../../redux/hooks';

export default function HomeScreen() {
  const userData = useAppSelector((state) => state.user);

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <Text>Home Page HERE</Text>
      <Text>{JSON.stringify(userData, null, 2)}</Text>
    </View>
  );
}
import { View, Text } from 'react-native';
import { useAppSelector } from '@/app/redux/hooks';

export default function HomeScreen() {
  const userData = useAppSelector((state) => state.user);

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <Text>Home Page HERE</Text>
      <Text>{userData?.id}</Text>
      <Text>{userData?.username}</Text>
      <Text>{userData?.email}</Text>
      <Text>{userData?.firstName}</Text>
      <Text>{userData?.lastName}</Text>
      <Text>{userData?.notificationToken}</Text>
      <Text>{userData?.isAdmin ? 'true' : 'false'}</Text>
    </View>
  );
}
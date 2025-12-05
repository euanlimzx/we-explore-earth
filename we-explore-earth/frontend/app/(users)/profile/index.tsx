//STANDARD LIBRARY
import React from 'react';
import { View, Text } from 'react-native';
import { useState, useEffect} from 'react';

//LOCAL FILES
import { styles } from './styles';
import { User } from "../../../types/user";


export default function ProfileScreen() {
  //REACT HOOKS
  // const { userId } = useUser();
  //STATE VARIABLES
  const [user, setUser] = useState<User | null>(null);
  //HANDLERS
  const fetchUser = async (userId: string) => {
    try {

      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/${userId}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const userData: User = await response.json();
      setUser(userData);
    } catch(error: any) {
      console.error('Error while fetching user:', error);
    }
  }
  //EFFECTS
  // useEffect(() => {
  //   if (userId) {
  //     fetchUser(userId);
  //   }
  // }, [userId]);
  //temp fetch for testing
  useEffect(() => {
    fetchUser("2tl9WMoEwLR8utcWggyiKNnFM572");
  }, []);


  //RENDER
  return (
    <View style = {styles.container}>
      <Text> Hi @{user?.username}!</Text>
      <Text> Email: {user?.email}</Text>
      <Text> First Name: {user?.firstName}</Text>
      <Text> Last Name: {user?.lastName}</Text>
    </View>
  );
}

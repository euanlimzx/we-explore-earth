//STANDARD LIBRARY
import { useState } from 'react';
//THIRD-PARTY LIBRARIES
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
//LOCAL FILES
import { styles } from './styles/login';

export default function LoginPage() {
    //REACT HOOKS
    
    //STATE VARIABLES
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    //HANDLERS
    async function handleLogin() {
      if (!email || !password) {
        Alert.alert("Please fill in all the fields");
        return;
      }

      try {
        console.log('Login successful');
        router.replace('/(users)');
      } catch (error) {
        console.error('Login error:', error);
        Alert.alert('Login Failed', error.message);
      }
    }
    
    //EFFECTS
    
    //RENDER
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to We Explore Earth</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
}
//STANDARD LIBRARY
//THIRD-PARTY LIBRARIES
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
//LOCAL FILES
import { styles } from './styles';

export default function LoginPage() {
    //REACT HOOKS
    
    //STATE VARIABLES
    
    //HANDLERS
    const handleLogin = () => {
        console.log('Login pressed');
        router.replace('/(tabs)');
    };
    
    //EFFECTS
    
    //RENDER
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to We Explore Earth</Text>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
}
//STANDARD LIBRARY
//THIRD-PARTY LIBRARIES
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
//LOCAL FILES
import { styles } from './styles/launch';

export default function LaunchPage() {
    //REACT HOOKS
    
    //STATE VARIABLES
    
    //HANDLERS
    function handleLogin() {
        router.push('/login');
    }

    function handleSignup() {
        router.push('/signup');
    }
    
    //EFFECTS
    
    //RENDER
    return (
        <View style={styles.container}>
            <View style={styles.welcomeSection}>
                <Text style={styles.title}>Welcome to</Text>
                <Text style={styles.appName}>We Explore Earth</Text>
            </View>

            <View style={styles.buttonSection}>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>I have an account</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                    <Text style={styles.signupButtonText}>Create new account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
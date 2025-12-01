//STANDARD LIBRARY
//THIRD-PARTY LIBRARIES
import { TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
//LOCAL FILES
import { styles } from './styles';

export default function BackButton({ route }: { route: string }) {
    //REACT HOOKS

    //STATE VARIABLES

    //HANDLERS
    function handlePress() {
        router.push(route);
    }
    
    //EFFECTS

    //RENDER
    return (
        <TouchableOpacity style={styles.backButton} onPress={handlePress}>
            <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
    );
}
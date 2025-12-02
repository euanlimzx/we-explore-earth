import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 30,           // Increase this value
        left: 10,
        padding: 10,
        zIndex: 999,       // Add high z-index to ensure it's on top
        backgroundColor: 'rgba(255,255,255,0.8)', // Optional: add background for visibility
        borderRadius: 8,   // Optional: make it look like a button
    },
    backText: {
        fontSize: 16,
        color: '#007AFF',
    },
});
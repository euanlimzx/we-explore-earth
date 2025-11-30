//STANDARD LIBRARY
import { useEffect, useState } from 'react';
//THIRD-PARTY LIBRARIES
import { Stack } from 'expo-router';
//LOCAL FILES

export default function RootLayout() {
    //REACT HOOKS
    
    //STATE VARIABLES
    
    //HANDLERS
    
    //EFFECTS
    
    //RENDER
    return (
        <Stack 
            screenOptions={{ headerShown: false }}
            initialRouteName="(auth)"
        >
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
    );
}
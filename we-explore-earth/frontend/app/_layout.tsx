// //STANDARD LIBRARY
// import { useEffect, useState } from 'react';
// //THIRD-PARTY LIBRARIES
// import { Stack } from 'expo-router';
// //LOCAL FILES

// export default function RootLayout() {
//     //REACT HOOKS
    
//     //STATE VARIABLES
    
//     //HANDLERS
    
//     //EFFECTS
    
//     //RENDER
//     return (
//         <Stack 
//             screenOptions={{ headerShown: false }}
//             initialRouteName="(users)"
//         >
//             <Stack.Screen name="(auth)" />
//             <Stack.Screen name="(users)" />
//             <Stack.Screen name="(admin)" />
//             <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
//         </Stack>
//     );
// }

//STANDARD LIBRARY
import { useEffect, useState } from 'react';
//THIRD-PARTY LIBRARIES
import { Stack } from 'expo-router';
//LOCAL FILES

// export const unstable_settings = {
//   initialRouteName: '(auth)',  // This sets the initial route
// };

export default function RootLayout() {
 return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(users)" />
        <Stack.Screen name="(admin)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </>
  );
}

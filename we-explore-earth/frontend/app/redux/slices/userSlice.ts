import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    notificationToken: string | null;
    isAdmin: boolean;
}

type UserState = User | null;

const userSlice = createSlice({
    name: 'user',           // Just a name for this slice
    initialState: null as UserState,
    reducers: {
        setUserState: (state, action: PayloadAction<User>) => {
            return action.payload;  
        },
      
        clearUserState: () => {
            return null;  
        },
    },
});

export const { setUserState, clearUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;


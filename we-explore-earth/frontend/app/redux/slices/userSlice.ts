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

        updateUserState: (state, action: PayloadAction<User>) => {
            if (state) {
                return {
                    ...state,
                    ...action.payload
                };
            }
            return state;
        }
    },
});

export const { setUserState, clearUserState, updateUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;



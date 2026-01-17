import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';

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



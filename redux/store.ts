import { configureStore } from '@reduxjs/toolkit';
import passwordReducer from './passwordSlice/passwordSlice';
import userReducer from './userSlice/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        passwords: passwordReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

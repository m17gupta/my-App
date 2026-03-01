import { UserType } from "@/models/User";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for user registration
export const registerUser = createAsyncThunk(
    'user/register',
    async (userData: UserType, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to register');
            }

            return data.user;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials: any, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST', // Assuming same endpoint for login/register as per your users+api.ts
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            console.log("Login Response", data);
            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to login');
            }

            return data.user;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Something went wrong');
        }
    }
);
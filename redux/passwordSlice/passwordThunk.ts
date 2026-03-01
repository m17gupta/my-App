import { createAsyncThunk } from '@reduxjs/toolkit';
import { PasswordType } from '../../components/listPassword/PassWordType';

// Fetch all passwords (Read)
export const fetchPasswords = createAsyncThunk(
    'passwords/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/passwords');
            const data = await response.json();
            if (!response.ok) return rejectWithValue(data.error || 'Failed to fetch passwords');
            return data.passwords;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Add new password (Create)
export const addPassword = createAsyncThunk(
    'passwords/add',
    async (newPassword: PasswordType, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/passwords', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPassword),
            });
            const data = await response.json();
            if (!response.ok) return rejectWithValue(data.error || 'Failed to add password');
            return data.password;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Update existing password (Update)
export const updatePassword = createAsyncThunk(
    'passwords/update',
    async (updatedPassword: PasswordType, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/passwords/${updatedPassword.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPassword),
            });
            const data = await response.json();
            if (!response.ok) return rejectWithValue(data.error || 'Failed to update password');
            return data.password;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Delete password (Delete)
export const deletePassword = createAsyncThunk(
    'passwords/delete',
    async (passwordId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/passwords/${passwordId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (!response.ok) return rejectWithValue(data.error || 'Failed to delete password');
            return passwordId; // Return the ID so we can remove it from state
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

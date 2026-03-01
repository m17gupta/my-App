import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PasswordType } from '../../components/listPassword/PassWordType';
import { addPassword, deletePassword, fetchPasswords, updatePassword } from './passwordThunk';

interface PasswordState {
    allPasswords: PasswordType[];
    currentPassword: PasswordType | null;
    isFetched: boolean;
    loading: boolean;
    isError: boolean;
    error: string | null;
}

const initialState: PasswordState = {
    allPasswords: [],
    currentPassword: null,
    isFetched: false,
    loading: false,
    isError: false,
    error: null,
};

const passwordSlice = createSlice({
    name: 'passwords',
    initialState,
    reducers: {
        setCurrentPassword: (state, action: PayloadAction<PasswordType>) => {
            state.currentPassword = action.payload;
        },
        clearPasswordError: (state) => {
            state.isError = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch All Passwords
            .addCase(fetchPasswords.pending, (state) => {
                state.loading = true;
                state.isError = false;
            })
            .addCase(fetchPasswords.fulfilled, (state, action) => {
                state.loading = false;
                state.allPasswords = action.payload || [];
                state.isFetched = true;
            })
            .addCase(fetchPasswords.rejected, (state, action) => {
                state.loading = false;
                state.isError = true;
                state.error = action.payload as string;
            })
            // Add Password
            .addCase(addPassword.pending, (state) => {
                state.loading = true;
                state.isError = false;
            })
            .addCase(addPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.allPasswords.unshift(action.payload);
            })
            .addCase(addPassword.rejected, (state, action) => {
                state.loading = false;
                state.isError = true;
                state.error = action.payload as string;
            })
            // Update Password
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.isError = false;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.allPasswords.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.allPasswords[index] = action.payload;
                }
                if (state.currentPassword?.id === action.payload.id) {
                    state.currentPassword = action.payload;
                }
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.isError = true;
                state.error = action.payload as string;
            })
            // Delete Password
            .addCase(deletePassword.pending, (state) => {
                state.loading = true;
                state.isError = false;
            })
            .addCase(deletePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.allPasswords = state.allPasswords.filter(p => p.id !== action.payload);
                if (state.currentPassword?.id === action.payload) {
                    state.currentPassword = null;
                }
            })
            .addCase(deletePassword.rejected, (state, action) => {
                state.loading = false;
                state.isError = true;
                state.error = action.payload as string;
            });
    },
});

export const { setCurrentPassword, clearPasswordError } = passwordSlice.actions;
export default passwordSlice.reducer;

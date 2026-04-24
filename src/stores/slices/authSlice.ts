import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthenticationResponse, AuthState } from '@/types';


const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<AuthenticationResponse>
    ) => {
      if ((action.payload as any).authenticated === false) {
        state.user = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
        return;
      }
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.role?.includes('admin') || false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

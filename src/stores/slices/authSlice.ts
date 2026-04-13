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
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.role === 'admin';
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

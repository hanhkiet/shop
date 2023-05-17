import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState, User } from './types';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const persistedState: AuthState = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth')!)
  : initialState;

const authSlice = createSlice({
  name: 'auth',
  initialState: persistedState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutSuccess: state => {
      state.isAuthenticated = false;
      state.user = null;
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, loginFailed, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;

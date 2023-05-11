import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface User {
  uuid: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },

    loginFailed: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },

    logoutSuccess: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailed, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;

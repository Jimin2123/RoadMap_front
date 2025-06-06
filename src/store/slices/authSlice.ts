import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../../types/interfaces/AuthState';
import { clearAccessToken } from '../../utils/tokenManager';
import { initializeAuth, login, refreshAccessToken } from '../../hooks/useAuth';

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  status: { login: 'idle', refresh: 'idle', initialize: 'idle' },
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      clearAccessToken(); // 메모리에서 Access Token 제거
    },
  },
  extraReducers: (builder) => {
    // 로그인 처리
    builder
      .addCase(login.pending, (state) => {
        state.status.login = 'pending';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status.login = 'fulfilled';
        state.isAuthenticated = true;
        state.accessToken = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status.login = 'rejected';
        state.error = action.payload as string;
      });

    // AccessToken 갱신
    builder
      .addCase(refreshAccessToken.pending, (state) => {
        state.status.refresh = 'pending';
        state.error = null;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.status.refresh = 'fulfilled';
        state.isAuthenticated = true;
        state.accessToken = action.payload;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.status.refresh = 'rejected';
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // 초기화 처리
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.status.initialize = 'pending';
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.status.initialize = 'fulfilled';
        state.isAuthenticated = true;
        state.accessToken = action.payload;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.status.initialize = 'rejected';
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../../types/interfaces/AuthState';
import { LoginRequestDTO } from '../../types/interfaces/request/LoginRequest';

import { AxiosError } from 'axios';
import { clearAccessToken } from '../../utils/tokenManager';
import { loginService } from '../../services/authService';

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  status: { login: 'idle', refresh: 'idle', initialize: 'idle' },
  error: null,
};

export const login = createAsyncThunk('auth/login', async (credentials: LoginRequestDTO, thunkAPI) => {
  try {
    return await loginService(credentials);
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    if (error.response && error.response.data) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue('Login failed');
  }
});

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
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

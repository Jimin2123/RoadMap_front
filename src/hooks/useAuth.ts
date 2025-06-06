import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequestDTO } from '../types/interfaces/request/LoginRequest';
import { initializeAuthService, loginService, refreshTokenService } from '../services/authService';
import { AxiosError } from 'axios';
import { logout } from '../store/slices/authSlice';

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

export const refreshAccessToken = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    return await refreshTokenService();
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    thunkAPI.dispatch(logout());

    if (error.response && error.response.data) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue('Token refresh failed');
  }
});

export const initializeAuth = createAsyncThunk('auth/initialize', async (_, thunkAPI) => {
  try {
    return await initializeAuthService();
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    thunkAPI.dispatch(logout());

    if (error.response && error.response.data) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue('Initialization failed');
  }
});

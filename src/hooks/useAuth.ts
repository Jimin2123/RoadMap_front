import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequestDTO } from '../types/interfaces/request/LoginRequest';
import { initializeAuthService, loginService, logoutService, refreshTokenService } from '../services/authService';
import { AxiosError } from 'axios';

export const login = createAsyncThunk('auth/login', async (credentials: LoginRequestDTO, thunkAPI) => {
  try {
    const accessToken = await loginService(credentials);
    return accessToken;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    if (error.response && error.response.data) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue('로그인에 실패했습니다. 다시 시도해주세요.');
  }
});

export const refreshAccessToken = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    return await refreshTokenService();
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    await thunkAPI.dispatch(logoutThunk());

    if (error.response && error.response.data) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue('Access Token 갱신에 실패했습니다.');
  }
});

export const initializeAuth = createAsyncThunk('auth/initialize', async (_, thunkAPI) => {
  try {
    return await initializeAuthService();
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    await thunkAPI.dispatch(logoutThunk());

    if (error.response && error.response.data) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue('인증 초기화에 실패했습니다.');
  }
});

export const logoutThunk = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await logoutService();
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    if (error.response && error.response.data) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getMemberService, signUpService } from '../services/userService';
import { MemberRequest } from '../types/interfaces/request/MemberRequest';

export const getMember = createAsyncThunk('user/getMember', async (_, thunkAPI) => {
  try {
    return await getMemberService();
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    if (error.response && error.response.data) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue('Failed to fetch member information');
  }
});

export const signUp = createAsyncThunk('user/signUp', async (credentials: MemberRequest, thunkAPI) => {
  try {
    return await signUpService(credentials);
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    if (error.response && error.response.data) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue('Failed to fetch member information');
  }
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getMemberService, signUpService, updateProfileService } from '../services/userService';
import { MemberRequest } from '../types/interfaces/member/request/MemberRequest';
import { ProfileUpdateRequest } from '../types/interfaces/member/request/ProfileUpdateRequest';

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

export const updateProfile = createAsyncThunk('user/updateProfile', async (profileRequest: ProfileUpdateRequest, thunkAPI) => {
  try {
    return await updateProfileService(profileRequest);
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    if (error.response && error.response.data) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue('Failed to update profile information');
  }
});

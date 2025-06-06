import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getMemberService } from '../services/userService';

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

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProfileRequest } from '../types/interfaces/request/ProfileRequest';
import { createResumeService } from '../services/resumeService';
import { AxiosError } from 'axios';

export const createResumeThunk = createAsyncThunk('resume/create', async (profileRequest: ProfileRequest, thunkAPI) => {
  try {
    return await createResumeService(profileRequest);
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    if (error.response && error.response.data) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue('이력서 제출에 실패했습니다. 나중에 다시 시도해주세요.');
  }
});

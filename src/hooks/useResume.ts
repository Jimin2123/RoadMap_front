import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProfileRequest } from '../types/interfaces/member/request/ProfileRequest';
import { createResumeService, updateResumeService, getResumeService } from '../services/resumeService';
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

export const updateResumeThunk = createAsyncThunk('resume/update', async (profileRequest: ProfileRequest, thunkAPI) => {
  try {
    return await updateResumeService(profileRequest);
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    if (error.response && error.response.data) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue('이력서 수정에 실패했습니다. 나중에 다시 시도해주세요.');
  }
});

export const getResumeThunk = createAsyncThunk('resume/get', async (_, thunkAPI) => {
  try {
    return await getResumeService();
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    if (error.response && error.response.data) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
    return thunkAPI.rejectWithValue('이력서를 불러오는데 실패했습니다. 나중에 다시 시도해주세요.');
  }
});

import { createSlice } from '@reduxjs/toolkit';
import { createResumeThunk } from '../../hooks/useResume';
import { ResumeState } from '../../types/interfaces/ResumeState';

const initialState: ResumeState = {
  status: {
    create: 'idle',
  },
  error: null,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createResumeThunk.pending, (state) => {
        state.status.create = 'pending';
        state.error = null;
      })
      .addCase(createResumeThunk.fulfilled, (state) => {
        state.status.create = 'fulfilled';
        state.error = null;
      })
      .addCase(createResumeThunk.rejected, (state, action) => {
        state.status.create = 'rejected';
        state.error = action.payload as string;
      });
  },
});

export default resumeSlice.reducer;

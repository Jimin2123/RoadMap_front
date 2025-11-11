import { createSlice } from '@reduxjs/toolkit';
import { createResumeThunk, updateResumeThunk, getResumeThunk } from '../../hooks/useResume';
import { ResumeState } from '../../state/ResumeState';

const initialState: ResumeState = {
  resume: null,
  status: {
    create: 'idle',
    update: 'idle',
    get: 'idle',
  },
  error: null,
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    resetCreateStatus: (state) => {
      state.status.create = 'idle';
      state.error = null;
    },
    resetUpdateStatus: (state) => {
      state.status.update = 'idle';
      state.error = null;
    },
    resetGetStatus: (state) => {
      state.status.get = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create resume
      .addCase(createResumeThunk.pending, (state) => {
        state.status.create = 'pending';
        state.error = null;
      })
      .addCase(createResumeThunk.fulfilled, (state, action) => {
        state.status.create = 'fulfilled';
        state.resume = action.payload;
        state.error = null;
      })
      .addCase(createResumeThunk.rejected, (state, action) => {
        state.status.create = 'rejected';
        state.error = action.payload as string;
      })
      // Update resume
      .addCase(updateResumeThunk.pending, (state) => {
        state.status.update = 'pending';
        state.error = null;
      })
      .addCase(updateResumeThunk.fulfilled, (state, action) => {
        state.status.update = 'fulfilled';
        state.resume = action.payload;
        state.error = null;
      })
      .addCase(updateResumeThunk.rejected, (state, action) => {
        state.status.update = 'rejected';
        state.error = action.payload as string;
      })
      // Get resume
      .addCase(getResumeThunk.pending, (state) => {
        state.status.get = 'pending';
        state.error = null;
      })
      .addCase(getResumeThunk.fulfilled, (state, action) => {
        state.status.get = 'fulfilled';
        state.resume = action.payload;
        state.error = null;
      })
      .addCase(getResumeThunk.rejected, (state, action) => {
        state.status.get = 'rejected';
        state.error = action.payload as string;
      });
  },
});

export const { resetCreateStatus, resetUpdateStatus, resetGetStatus } = resumeSlice.actions;

export default resumeSlice.reducer;

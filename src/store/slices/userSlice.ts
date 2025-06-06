import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../types/interfaces/UserState';
import { getMember } from '../../hooks/userUser';

const initialState: UserState = {
  user: null,
  status: {
    getMember: 'idle',
  },
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 사용자 정보 조회 처리
    builder
      .addCase(getMember.pending, (state) => {
        state.status.getMember = 'pending';
        state.error = null;
      })
      .addCase(getMember.fulfilled, (state, action) => {
        state.status.getMember = 'fulfilled';
        state.user = action.payload; // 사용자 정보 저장
      })
      .addCase(getMember.rejected, (state, action) => {
        state.status.getMember = 'rejected';
        state.error = action.payload as string; // 오류 메시지 저장
      });
  },
});

export default userSlice.reducer;

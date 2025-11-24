import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../state/UserState';
import { getMember, signUp, updateProfile } from '../../hooks/userUser';

const initialState: UserState = {
  member: null,
  status: {
    signUp: 'idle',
    getMember: 'idle',
  },
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 회원가입 처리
    builder
      .addCase(signUp.pending, (state) => {
        state.status.signUp = 'pending';
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status.signUp = 'fulfilled';
        state.member = action.payload; // 회원가입 후 사용자 정보 저장
        state.error = null; // 오류 초기화
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status.signUp = 'rejected';
        state.error = action.payload as string; // 오류 메시지 저장
      });

    // 사용자 정보 조회 처리
    builder
      .addCase(getMember.pending, (state) => {
        state.status.getMember = 'pending';
        state.error = null;
      })
      .addCase(getMember.fulfilled, (state, action) => {
        state.status.getMember = 'fulfilled';
        state.member = action.payload; // 사용자 정보 저장
      })
      .addCase(getMember.rejected, (state, action) => {
        state.status.getMember = 'rejected';
        state.member = null; // 사용자 정보 초기화
        state.error = action.payload as string;
      })

      // 사용자 정보 수정 처리
      .addCase(updateProfile.pending, (state) => {
        state.status.getMember = 'pending';
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status.getMember = 'fulfilled';
        // 프로필 업데이트 성공 후 member.profile 부분만 업데이트
        if (state.member) {
          state.member.profile = action.payload;
        }
        alert('프로필이 저장되었습니다.');
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status.getMember = 'rejected';
        state.error = action.payload as string;
        alert('저장에 실패했습니다.');
      });
  },
});

export default userSlice.reducer;

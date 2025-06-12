import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import resumeReducer from './slices/resumeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // 인증 관련 리듀서
    user: userReducer, // 사용자 정보 관련 리듀서
    resume: resumeReducer, // 이력서 관련 리듀서
  },
});

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import resumeReducer from './slices/resumeSlice';
import diagnosisReducer from './slices/diagnosisSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // 인증 관련 리듀서
    user: userReducer, // 사용자 정보 관련 리듀서
    resume: resumeReducer, // 이력서 관련 리듀서
    diagnosis: diagnosisReducer, // 진단 관련 리듀서
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

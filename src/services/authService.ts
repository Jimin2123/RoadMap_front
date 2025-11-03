import { LoginRequest } from '../types/interfaces/auth/request/LoginRequest';
import { LoginResponse } from '../types/interfaces/auth/response/LoginResponse';
import axiosInstance from '../utils/axiosInstance';

export const loginService = async (credentials: LoginRequest): Promise<string | null> => {
  const response = await axiosInstance.post<LoginResponse>('/api/v1/auth/login', credentials);
  const { accessToken } = response.data;
  return accessToken;
};

export const refreshTokenService = async (): Promise<string | null> => {
  const response = await axiosInstance.post<LoginResponse>('/api/v1/auth/refreshToken');
  const { accessToken } = response.data;
  return accessToken;
};

export const initializeAuthService = async (): Promise<string | null> => {
  const response = await refreshTokenService();
  return response;
};

export const logoutService = async (): Promise<void> => {
  await axiosInstance.post('/api/v1/auth/logout');
};

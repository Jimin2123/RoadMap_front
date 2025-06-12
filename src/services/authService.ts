import { LoginRequestDTO } from '../types/interfaces/request/LoginRequest';
import { LoginResponseDTO } from '../types/interfaces/response/LoginResponse';
import axiosInstance from '../utils/axiosInstance';

export const loginService = async (credentials: LoginRequestDTO): Promise<string | null> => {
  const response = await axiosInstance.post<LoginResponseDTO>('/api/v1/auth/login', credentials);
  const { accessToken } = response.data;
  return accessToken;
};

export const refreshTokenService = async (): Promise<string | null> => {
  const response = await axiosInstance.post<LoginResponseDTO>('/api/v1/auth/refreshToken');
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

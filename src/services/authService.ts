import { LoginRequestDTO } from '../types/interfaces/request/LoginRequest';
import { LoginResponseDTO } from '../types/interfaces/response/LoginResponse';
import axiosInstance from '../utils/axiosInstance';

export const loginService = async (credentials: LoginRequestDTO): Promise<string | null> => {
  const response = await axiosInstance.post<LoginResponseDTO>('/api/v1/auth/login', credentials);
  const { accessToken } = response.data;
  return accessToken;
};

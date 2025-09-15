import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { clearAccessToken, getAccessToken, setAccessToken } from './tokenManager';
import { refreshTokenService } from '../services/authService';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL ?? '/api',
  timeout: 60_000, // 1분
  withCredentials: true,
});

// AxiosResponse 타입을 사용하여 응답의 타입을 지정합니다.
type Resolve = (value: AxiosResponse) => void;
// Reject 타입을 정의하여 에러 처리를 명확히 합니다.
type Reject = (reason: unknown) => void;

// Refresh Queue 타입 정의
let refreshQueue: { resolve: Resolve; reject: Reject }[] = [];
let isRefreshing = false;

// Refresh Queue 처리 함수
const runQueue = (error: unknown, response: AxiosResponse | null = null): void => {
  refreshQueue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve(response!)));
  refreshQueue = [];
};

// Request Interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response Interceptor
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const { response, config } = error;
    const original = config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 로그인 엔드포인트에 대한 401 응답은 토큰 재발급 로직을 건너뜁니다.
    // 로그인 실패는 토큰 만료가 아닌 자격 증명 오류이므로 즉시 오류를 반환합니다.
    if (response?.status === 401 && config?.url === '/api/v1/auth/login') {
      return Promise.reject(error); // 원래 오류를 그대로 반환하여 프론트엔드로 전파
    }

    if (response?.status === 401 && !original._retry) {
      original._retry = true;

      // 이미 refresh 중이면 대기
      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(original)) // token 이미 헤더에 반영
          .catch(Promise.reject);
      }

      isRefreshing = true;
      try {
        const newToken = await refreshTokenService();
        if (!newToken) throw new Error('Refresh returned empty token');

        setAccessToken(newToken);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;

        runQueue(null, await axiosInstance(original));
        return axiosInstance(original); // 본인도 재시도
      } catch (err) {
        clearAccessToken();
        runQueue(err);
        // TODO: logoutRedirect(); // UX 흐름 연결
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // 기타 에러 처리
    if (response?.status === 403) {
      console.error('403 Forbidden', response.data);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

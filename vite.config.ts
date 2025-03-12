import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // 현재 실행 모드의 환경 변수 로드

  return {
    plugins: [react(), tsconfigPaths()], // React 및 TypeScript 경로 별칭 사용
    server: {
      port: Number(env.VITE_APP_SERVER_PORT), // 환경 변수에서 포트 설정
      open: env.VITE_APP_SERVER_OPEN === 'true', // 환경 변수에서 브라우저 자동 열기 설정
      proxy:
        mode === 'development' // 개발 모드에서만 프록시 적용
          ? {
              '/api': {
                target: env.VITE_APP_API_URL, // 환경 변수에서 API URL 설정
                changeOrigin: true, // 도메인이 다른 서버로 프록시 설정
                rewrite: (path) => path.replace(/^\/api/, ''), // API 경로에서 '/api' 제거
              },
            }
          : undefined, // 배포 모드에서는 프록시 미사용
    },
    resolve: {
      alias: {
        '@': '/src', // '@'을 'src' 폴더로 매핑 (경로 단축)
      },
    },
    build: {
      outDir: 'dist', // 빌드 결과물 경로
      sourcemap: mode === 'development', // 개발 모드에서는 소스맵 활성화 (디버깅 용이)
      minify: 'esbuild', // 코드 압축 방식
      target: 'es2020', // 빌드된 코드의 호환성 대상
      cssCodeSplit: true, // CSS 파일을 분리해서 최적화
      chunkSizeWarningLimit: 1000, // 빌드된 파일의 크기 경고 임계값
      // 코드 스플리팅 및 캐싱 최적화 설정
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'], // React 관련 라이브러리를 별도 청크로 분리 (코드 스플리팅)
            vendor: [], // 자주 사용되는 외부 라이브러리를 분리하여 캐싱 최적화
          },
        },
      },
    },
  };
});

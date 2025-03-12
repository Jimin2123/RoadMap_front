import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] }, // dist, node_modules는 검사 대상에서 제외
  {
    extends: [
      js.configs.recommended, // JavaScript 기본 권장 규칙
      ...tseslint.configs.recommended, // TypeScript 권장 규칙
      prettierConfig, // prettier 설정 추가
    ],
    files: ['**/*.{ts,tsx}'], // TypeScript 파일에만 적용
    languageOptions: {
      ecmaVersion: 2020, // 2020 ECMAScript 문법 지원
      globals: globals.browser, // 브라우저 환경에서 사용 가능한 전역 변수 추가 (window, document 등)
    },
    plugins: {
      react, /// React 관련 ESLint 규칙 적용
      'react-hooks': reactHooks, // React Hooks 관련 규칙 적용
      'react-refresh': reactRefresh, // React Refresh 관련 규칙 적용
      prettier, // prettier 플러그인 추가
    },
    rules: {
      'prettier/prettier': 'error', // Prettier와 일치하지 않는 스타일이 있으면 ESLint 오류로 표시
      // React Hooks 관련 규칙
      ...reactHooks.configs.recommended.rules, // React Hooks 권장 규칙 적용
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], // React Refresh 권장 규칙 적용
    },
  }
);

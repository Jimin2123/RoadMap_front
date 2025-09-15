# RoadMap_front 로직 흐름 분석

이 문서는 "RoadMap_front" 프로젝트의 주요 로직 흐름을 설명합니다. 코드 베이스를 이해하고 새로운 기능을 개발하거나 유지보수할 때 참고 자료로 활용할 수 있습니다.

## 1. 프로젝트 아키텍처 개요

- **Framework/Language**: React, TypeScript
- **Routing**: `react-router-dom`
- **State Management**: `Redux Toolkit`
- **API Communication**: `axios`
- **Build Tool**: `Vite`

프로젝트는 기능별로 코드를 분리하는 구조를 따릅니다. (`pages`, `components`, `services`, `store`, `hooks` 등)

## 2. 애플리케이션 초기화

애플리케이션이 처음 로드될 때의 실행 순서는 다음과 같습니다.

1.  **`src/main.tsx`**
    - `ReactDOM.createRoot`를 사용하여 React 애플리케이션을 `#root` DOM 요소에 렌더링합니다.
    - Redux의 `<Provider store={store}>`를 통해 모든 컴포넌트가 Redux 스토어에 접근할 수 있도록 합니다.

2.  **`src/App.tsx`**
    - `<BrowserRouter>`로 전체 애플리케이션을 감싸 라우팅 기능을 활성화합니다.
    - `useInitializeSession` 커스텀 훅을 호출하여 세션 초기화를 시도합니다.

3.  **`src/hooks/useInitializeSession.ts`**
    - 이 훅은 애플리케이션이 시작될 때 한 번 실행됩니다.
    - `tokenManager.ts`를 통해 저장된 Access Token이 있는지 확인합니다.
    - 토큰이 존재하면 `userService.fetchMemberInfo()`를 호출하여 사용자 정보를 서버로부터 가져옵니다.
    - 성공적으로 사용자 정보를 가져오면 `userSlice`를 통해 Redux 스토어의 사용자 상태를 업데이트합니다.
    - 이 과정을 통해 사용자가 페이지를 새로고침해도 로그인 상태가 유지됩니다.

## 3. 라우팅 (Routing)

- **`src/routes/index.tsx`**
    - `react-router-dom`의 `<Routes>`와 `<Route>` 컴포넌트를 사용하여 각 URL 경로에 해당하는 페이지 컴포넌트를 매핑합니다.
    - 예: `/login` 경로는 `LoginPage` 컴포넌트를 렌더링합니다.
    - 주석 처리된 `<ProtectedRoute>`는 향후 특정 경로에 대한 접근 제어(예: 로그인한 사용자만 접근 가능)를 구현하는 데 사용될 수 있습니다.

## 4. API 통신 (axios)

- **`src/utils/axiosInstance.ts`**
    - 모든 API 요청은 이 `axios` 인스턴스를 통해 이루어집니다.
    - **Request Interceptor**: API를 요청하기 직전에 실행됩니다. `tokenManager.getAccessToken()`으로 가져온 토큰이 있다면, 요청 헤더의 `Authorization` 필드에 `Bearer` 토큰을 추가합니다.
    - **Response Interceptor**: API 응답을 받은 후 실행됩니다.
        - **성공 응답**: 응답을 그대로 반환합니다.
        - **에러 응답**:
            - **`401 Unauthorized` 에러**: Access Token이 만료되었을 가능성이 높습니다.
                1.  `isRefreshing` 플래그를 확인하여 중복 재발급 요청을 방지합니다.
                2.  `refreshTokenService()`를 호출하여 새로운 Access Token 재발급을 시도합니다.
                3.  재발급에 성공하면, 새로운 토큰을 `tokenManager`에 저장하고, 실패했던 원래 요청을 다시 보냅니다.
                4.  재발급에 실패하면, 모든 토큰 정보를 삭제하고 로그인 페이지로 리디렉션할 수 있습니다. (현재는 `logoutRedirect()`가 주석 처리됨)
            - **기타 에러**: 에러를 그대로 반환하여 각 API 호출부에서 처리할 수 있도록 합니다.

## 5. 상태 관리 (Redux Toolkit)

- **`src/store/store.ts`**
    - `configureStore`를 사용하여 Redux 스토어를 생성합니다.
    - `reducer` 필드에 각 기능별 Slice( `authSlice`, `userSlice`, `resumeSlice` 등)를 통합합니다.

- **`src/store/slices/*.ts` (예: `authSlice.ts`)**
    - `createSlice`를 사용하여 액션 생성자(action creators)와 리듀서(reducer)를 한 번에 정의합니다.
    - **`createAsyncThunk`**: API 호출과 같은 비동기 작업을 처리하기 위해 사용됩니다.
        - Thunk는 `pending`, `fulfilled`, `rejected` 세 가지 상태의 액션을 자동으로 생성합니다.
    - **`extraReducers`**: `createAsyncThunk`로 생성된 비동기 액션들의 상태에 따라 Redux 스토어의 상태를 업데이트합니다.
        - 예: `login.fulfilled` 상태일 때, `state.isAuthenticated`를 `true`로 변경하고 `state.accessToken`을 저장합니다.

## 6. 주요 기능 흐름 예시

### A. 로그인 (Login Flow)

1.  **`LoginPage` -> `LoginForm`**: 사용자가 이메일과 비밀번호를 입력하고 '로그인' 버튼을 클릭합니다.
2.  **`useAuth` Hook**: `LoginForm` 내부에서 `useAuth` 훅의 `login` 함수를 호출합니다.
3.  **`authService.login()`**: `axiosInstance`를 사용하여 백엔드에 로그인 API (`/api/v1/auth/login`)를 요청합니다.
4.  **`authSlice`**: API 요청이 성공하면 `login.fulfilled` 액션이 디스패치됩니다. `authSlice`의 `extraReducers`는 이 액션을 받아 스토어의 `isAuthenticated` 상태를 `true`로, `accessToken`을 응답으로 받은 토큰으로 업데이트합니다.
5.  **`tokenManager`**: `login.fulfilled` 로직 내에서 `tokenManager.setAccessToken`을 호출하여 받은 토큰을 브라우저의 저장소(예: `localStorage`)에 저장합니다.
6.  **페이지 이동**: 로그인이 성공하면 사용자는 메인 페이지 또는 이전 페이지로 리디렉션됩니다.

### B. 인증된 데이터 요청 (예: 이력서 정보 가져오기)

1.  **`ResumePage`**: 페이지가 렌더링될 때 `useResume` 훅을 호출합니다.
2.  **`useResume` Hook**: Redux 스토어에 이력서 데이터가 있는지 확인합니다. 데이터가 없으면 `resumeService.fetchResume()`를 호출하여 서버에 데이터를 요청합니다.
3.  **`resumeService.fetchResume()`**: `axiosInstance`를 통해 이력서 정보를 요청하는 API를 호출합니다.
4.  **`axiosInstance` Interceptor**: `axiosInstance`는 요청을 보내기 전, 저장된 Access Token을 헤더에 자동으로 추가합니다.
5.  **`resumeSlice`**: API 요청이 성공하면 `fetchResume.fulfilled` 액션이 디스패치됩니다. `resumeSlice`는 이 액션을 받아 API 응답으로 받은 이력서 데이터를 스토어 상태에 저장합니다.
6.  **`ResumePage`**: `useSelector`를 통해 Redux 스토어를 구독하고 있던 `ResumePage` 컴포넌트는 상태 변경을 감지하고, 새로운 데이터로 화면을 다시 렌더링합니다.

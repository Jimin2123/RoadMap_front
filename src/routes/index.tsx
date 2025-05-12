import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} /> {/* 메인 페이지 경로 */}
      <Route path="/login" element={<LoginPage />} /> {/* 로그인 경로 추가 */}
      {/* <Route path="/other" element={<OtherComponent />} /> */}
    </Routes>
  );
};

export default AppRoutes;

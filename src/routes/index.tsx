import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {/* 다른 라우트 추가 가능 */}
      {/* <Route path="/other" element={<OtherComponent />} /> */}
    </Routes>
  );
};

export default AppRoutes;

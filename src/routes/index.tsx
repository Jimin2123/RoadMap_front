import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import SettingsPage from '../pages/SettingsPage';
import SignUpForm from '../components/SignUp/SignUpForm';
import TariningCoursePage from '../pages/TrainingCoursePage';
import ResumePage from '../pages/ResumePage';
import PolicyPage from '../pages/PolicyPage';
import DiagnosisPage from '../pages/DiagnosisPage';
import MatchingPage from '../pages/MatchingPage';
import InterestedCompaniesPage from '../pages/InterestedCompaniesPage';
//import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} /> {/* 메인 페이지 경로 */}
      <Route path="/login" element={<LoginPage />} /> {/* 로그인 경로 추가 */}
      <Route
        path="/settings"
        element={
          // <ProtectedRoute>
          <SettingsPage />
          // </ProtectedRoute>
        }
      />
      {/* 설정 페이지 경로 추가 */}
      <Route path="/signup" element={<SignUpForm />} /> {/* 회원가입페이지 */}
      <Route
        path="/resume"
        element={
          // <ProtectedRoute>
          <ResumePage />
          // </ProtectedRoute>
        }
      />
      {/* 이력서 페이지 경로 */}
      <Route path="/diagnosis" element={<DiagnosisPage />} /> {/* 역량 진단 페이지 */}
      <Route path="/matching" element={<MatchingPage />} />
      <Route path="/interested-companies" element={<InterestedCompaniesPage />} />
      <Route path="/training" element={<TariningCoursePage />} /> {/* 직업 훈련 페이지 */}
      <Route path="/policy" element={<PolicyPage />} /> {/* 정책 페이지 */}
      <Route path="*" element={<MainPage />} /> {/* 잘못된 경로는 메인 페이지로 리다이렉트 */}
    </Routes>
  );
};

export default AppRoutes;

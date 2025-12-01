import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import SettingsPage from '../pages/SettingsPage';
import SignUpForm from '../components/SignUp/SignUpForm';
import ResumePage from '../pages/ResumePage';
import PolicyPage from '../pages/PolicyPage';
import DiagnosisPage from '../pages/DiagnosisPage';
import MatchingPage from '../pages/MatchingPage';
import ProtectedRoute from './ProtectedRoute';
import InterestedCompaniesPage from '../pages/InterestedCompaniesPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} /> {/* 메인 페이지 경로 */}
      <Route path="/login" element={<LoginPage />} /> {/* 로그인 경로 추가 */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<SignUpForm />} />
      <Route
        path="/resume"
        element={
          <ProtectedRoute>
            <ResumePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/diagnosis"
        element={
          <ProtectedRoute>
            <DiagnosisPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/matching"
        element={
          <ProtectedRoute>
            <MatchingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interested-companies"
        element={
          <ProtectedRoute>
            <InterestedCompaniesPage />
          </ProtectedRoute>
        }
      />
      <Route path="/policy" element={<PolicyPage />} /> {/* 정책 페이지 */}
      <Route path="*" element={<MainPage />} /> {/* 잘못된 경로는 메인 페이지로 리다이렉트 */}
    </Routes>
  );
};

export default AppRoutes;

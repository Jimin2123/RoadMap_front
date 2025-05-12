// src/pages/LoginPage.tsx
import Header from '../layouts/Header';

import LoginForm from '../components/LoginForm/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="layout">
      <Header />

      <div className="login-page-section">
        <LoginForm className="login-form-login-page" />
      </div>
    </div>
  );
};

export default LoginPage;

// src/pages/LoginPage.tsx
import Header from '../layouts/Header';
import '../styles/LoginPage.css';

import LoginForm from '../components/LoginForm/LoginForm';
import Footer from '../layouts/Footer';

const LoginPage: React.FC = () => {
  return (
    <div className="layout">
      <Header />

      <div className="login-page-section">
        <LoginForm className="login-form-login-page" />
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;

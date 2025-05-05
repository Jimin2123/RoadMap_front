import Header from './layouts/Header';
import Footer from './layouts/Footer';
import EventBanner from './components/EventBanner/EventBanner';
import LoginForm from './components/LoginForm/LoginForm';

function App() {
  return (
    <div className="layout">
      <Header />

      <div className="top-section">
        <div className="event-banner-section">
          <EventBanner />
        </div>
        <div className="login-form-section">
          <LoginForm />
        </div>
      </div>

      <main className="content">
        <h1>정책 목록</h1>
        {/* 콘텐츠 */}
      </main>

      <Footer />
    </div>
  );
}

export default App;

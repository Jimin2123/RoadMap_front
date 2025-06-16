import React from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import EventBanner from '../components/EventBanner/EventBanner';
import LoginForm from '../components/LoginForm/LoginForm';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import LoginSuccess from '../components/LoginSuccess/LoginSuccess';
import JobPostingSection from '../components/JobPostingSection/JobPostingSection';
import '../styles/MainPage.css';
import { useAppSelector } from '../store/hooks';

const MainPage: React.FC = () => {
  const { isAuthenticated, status } = useAppSelector((state) => state.auth);

  // 로그인 성공 시 호출될 콜백 함수
  const handleLoginSuccess = (): boolean => {
    if (status.login === 'fulfilled') {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="layout">
      <Header />

      <div className="top-section">
        <div className="event-banner-section">
          <EventBanner />
        </div>
        <div className="login-form-section">
          {isAuthenticated ? (
            <LoginSuccess />
          ) : (
            <LoginForm className="login-form-main-page" onLoginSuccess={handleLoginSuccess} />
          )}
        </div>
      </div>

      <main>
        <div className="service-card-section">
          <ServiceCard
            imageUrl="/icons/service1.svg"
            serviceName="나의 이력서 관리"
            serviceDescription="자신의 포트폴리오를 작성하거나 수정할 수 있습니다."
            link="/resume"
          />
          <ServiceCard
            imageUrl="/icons/service2.svg"
            serviceName="맞춤 채용 정보"
            serviceDescription="현재 진행중인 채용정보를 확인할 수 있습니다."
            link="#"
          />
          <ServiceCard
            imageUrl="/icons/service3.svg"
            serviceName="나의 역량 진단"
            serviceDescription="사용자의 희망 직무와 비교해 부족한 역량을 보완할 수 있는 방법을 제공합니다."
            link="#"
          />
          <ServiceCard
            imageUrl="/icons/service4.svg"
            serviceName="맞춤 청년 지원정책"
            serviceDescription="현재 진행중인 청년 지원정책 리스트를 볼 수 있습니다."
            link="/policy"
          />
          <ServiceCard
            imageUrl="/icons/service5.svg"
            serviceName="나의 관심기업 리스트"
            serviceDescription="사용자가 등록해둔 관심 기업 리스트를 보여줍니다."
            link="#"
          />
        </div>
        <div className="job-posting-section">
          <JobPostingSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;

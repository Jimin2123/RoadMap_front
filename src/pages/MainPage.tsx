import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import EventBanner from '../components/EventBanner/EventBanner';
import LoginForm from '../components/LoginForm/LoginForm';
import ServiceCard from '../components/ServiceCard/ServiceCard';

const MainPage: React.FC = () => {
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

      <main className="service-card-section">
        <ServiceCard
          imageUrl="/img1.jpg"
          serviceName="나의 이력서 관리"
          serviceDescription="자신의 포트폴리오를 작성하거나 수정할 수 있습니다."
        />
        <ServiceCard
          imageUrl="/img2.jpg"
          serviceName="나의 취직 정보"
          serviceDescription="현재 진행중인 채용정보를 확인할 수 있습니다."
        />
        <ServiceCard
          imageUrl="/img3.jpg"
          serviceName="나의 역량 진단"
          serviceDescription="사용자가 원하는 분야의 직무 역량과 비교하여 사용자의 부족한 역량을 채울 수 있는 방법을 제공합니다."
        />
        <ServiceCard
          imageUrl="/img4.jpg"
          serviceName="나의 청년 지원정책"
          serviceDescription="현재 진행중인 청년 지원정책 리스트를 볼 수 있습니다."
        />
        <ServiceCard
          imageUrl="/img5.jpg"
          serviceName="나의 관심기업 리스트"
          serviceDescription="사용자가 등록해둔 관심 기업 리스트를 보여줍니다."
        />
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;

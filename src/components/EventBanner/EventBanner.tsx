// components/EventBanner.tsx
import React from 'react';
import './EventBanner.css';

const EventBanner: React.FC = () => {
  return (
    <div className="event-banner">
      <img src="/images/event-banner.jpg" alt="이벤트 배너" className="event-banner-image" />
      {/* 텍스트 오버레이가 필요하다면 여기에 추가 */}
      <div className="event-banner-text">
        <h2>2025 봄맞이 취업 이벤트</h2>
        <p>지금 참여하고 다양한 혜택을 받아보세요!</p>
      </div>
    </div>
  );
};

export default EventBanner;
